import { createCommandRunner } from "./js/commands.js";
import { PROFILE } from "./js/data.js";
import { mountSnakeGame } from "./js/games/snake.js";
import { getInitialLocale, persistLocale } from "./js/i18n.js";
import { applyTheme, getInitialTheme, toggleTheme as toggleThemeHelper } from "./js/theme.js";

const GUIDE_STORAGE_KEY = "terminal_guide_seen_v1";

const output = document.getElementById("output");
const input = document.getElementById("input");
const promptNode = document.querySelector(".prompt");

const state = {
  locale: getInitialLocale("tr"),
  theme: getInitialTheme("dark"),
  bootTime: Date.now(),
};

let commandHistory = [];
let historyIndex = -1;
let runner = null;
let autocompleteState = null;
let activeSnakeGame = null;

function getPrompt() {
  return runner ? runner.getPrompt() : "suleyman@resume:~$";
}

function syncPrompt() {
  if (promptNode) {
    promptNode.textContent = getPrompt();
  }
}

function clearOutput() {
  if (activeSnakeGame) {
    activeSnakeGame.stop();
    activeSnakeGame = null;
  }
  output.innerHTML = "";
}

function mountInteractiveWidgets(line) {
  const snakeHost = line.querySelector("[data-snake-host]");
  if (!snakeHost) return;

  if (activeSnakeGame) {
    activeSnakeGame.stop();
    activeSnakeGame = null;
  }

  activeSnakeGame = mountSnakeGame(snakeHost, {
    locale: state.locale,
    onExit: () => {
      activeSnakeGame = null;
    },
  });
}

function printOutput(html, cls = "") {
  const line = document.createElement("div");
  line.className = `output-line ${cls}`;
  line.innerHTML = html;
  output.appendChild(line);
  mountInteractiveWidgets(line);
  output.scrollTop = output.scrollHeight;
}

function printCommand(cmd) {
  printOutput(`<span class=\"command-line\">${getPrompt()} ${cmd}</span>`);
}

function setLocale(locale) {
  const nextLocale = persistLocale(locale);
  if (!nextLocale) return state.locale;
  state.locale = nextLocale;
  syncPrompt();
  return state.locale;
}

function setTheme(theme) {
  const nextTheme = applyTheme(theme);
  state.theme = nextTheme;
  return state.theme;
}

function toggleTheme() {
  const nextTheme = toggleThemeHelper(state.theme);
  state.theme = nextTheme;
  return state.theme;
}

function hasSeenGuide() {
  try {
    return localStorage.getItem(GUIDE_STORAGE_KEY) === "1";
  } catch (error) {
    return true;
  }
}

function markGuideSeen() {
  try {
    localStorage.setItem(GUIDE_STORAGE_KEY, "1");
  } catch (error) {
    // ignore storage errors
  }
}

function resetAutocomplete() {
  autocompleteState = null;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getTokenEnd(value, cursor) {
  let end = cursor;
  while (end < value.length && !/\s/.test(value[end])) {
    end += 1;
  }
  return end;
}

function getAutocompleteContext(value, cursor) {
  const beforeCursor = value.slice(0, cursor);

  let replaceStart = beforeCursor.length;
  while (replaceStart > 0 && !/\s/.test(beforeCursor[replaceStart - 1])) {
    replaceStart -= 1;
  }

  const replaceEnd = getTokenEnd(value, cursor);
  const prefix = value.slice(replaceStart, cursor);
  const preceding = value.slice(0, replaceStart);
  const parts = preceding.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return {
      type: "command",
      command: "",
      args: [],
      argIndex: -1,
      prefix,
      replaceStart,
      replaceEnd,
      signature: `cmd|${prefix}`,
    };
  }

  const command = parts[0];
  const args = parts.slice(1);
  const argIndex = args.length;

  return {
    type: "argument",
    command,
    args,
    argIndex,
    prefix,
    replaceStart,
    replaceEnd,
    signature: `arg|${command}|${argIndex}|${args.join(" ")}|${prefix}`,
  };
}

function applyAutocomplete(direction = 1) {
  if (!runner) return;

  const cursor = input.selectionStart ?? input.value.length;
  const context = getAutocompleteContext(input.value, cursor);

  const candidates =
    context.type === "command"
      ? runner.getCommandCompletions(context.prefix)
      : runner.getArgumentCompletions(context.command, context.args, context.argIndex, context.prefix);

  if (!candidates.length) return;

  let index = direction < 0 ? candidates.length - 1 : 0;
  if (
    autocompleteState &&
    autocompleteState.signature === context.signature &&
    arraysEqual(autocompleteState.candidates, candidates)
  ) {
    const step = direction < 0 ? -1 : 1;
    index = (autocompleteState.index + step + candidates.length) % candidates.length;
  } else if (candidates.length > 1) {
    printOutput(`<span class=\"dim\">${candidates.join("  ")}</span>`);
  }

  const selected = candidates[index];
  const before = input.value.slice(0, context.replaceStart);
  const after = input.value.slice(context.replaceEnd);
  const addSpace = candidates.length === 1 && after.length === 0;

  input.value = `${before}${selected}${addSpace ? " " : ""}${after}`;

  const nextCursor = (before + selected + (addSpace ? " " : "")).length;
  input.selectionStart = input.selectionEnd = nextCursor;

  autocompleteState = {
    signature: context.signature,
    candidates,
    index,
  };
}

runner = createCommandRunner({
  state,
  clearOutput,
  setLocale,
  setTheme,
  toggleTheme,
});

setLocale(state.locale);
setTheme(state.theme);
syncPrompt();

async function handleCommand(raw) {
  const cmdLine = raw.trim();
  if (!cmdLine) return;

  printCommand(cmdLine);

  if (commandHistory[0] !== cmdLine) {
    commandHistory.unshift(cmdLine);
    if (commandHistory.length > 50) commandHistory.pop();
  }
  historyIndex = -1;

  const [cmdRaw, ...args] = cmdLine.split(/\s+/);

  try {
    const result = await runner.runCommand(cmdRaw, args);
    if (result) printOutput(result);
  } catch (error) {
    printOutput(`<span class='error'>Unexpected error: ${String(error.message || error)}</span>`, "error");
  }
}

input.addEventListener("input", () => {
  resetAutocomplete();
});

input.addEventListener("keydown", (event) => {
  if (activeSnakeGame && activeSnakeGame.handleKey(event)) {
    event.preventDefault();
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    applyAutocomplete(event.shiftKey ? -1 : 1);
    return;
  }

  if (event.key === "Enter") {
    resetAutocomplete();
    handleCommand(input.value);
    input.value = "";
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    resetAutocomplete();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex += 1;
      input.value = commandHistory[historyIndex];
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }, 0);
    }
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    resetAutocomplete();
    if (historyIndex > 0) {
      historyIndex -= 1;
      input.value = commandHistory[historyIndex];
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }, 0);
    } else if (historyIndex === 0) {
      historyIndex = -1;
      input.value = "";
    }
    return;
  }

  if (event.ctrlKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    resetAutocomplete();
    clearOutput();
  }
});

window.addEventListener("load", () => {
  printOutput(runner.getLastLogin());
  printOutput(runner.commands.banner());
  printOutput(`${runner.getWelcomeLine()}, <span class=\"info\">${PROFILE.name}</span>`);
  printOutput(runner.getHelpHint());

  if (!hasSeenGuide() && runner.commands.guide) {
    printOutput(`<span class=\"info\">${runner.getAutoGuideMessage()}</span>`);
    printOutput(runner.commands.guide([]));
    markGuideSeen();
  }

  input.focus();
});

document.addEventListener("click", () => input.focus());

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    setTimeout(() => {
      output.scrollTop = output.scrollHeight;
    }, 100);
  });
}
