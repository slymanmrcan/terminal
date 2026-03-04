import { FILE_ENTRIES, PROFILE } from "../data.js";
import { STRINGS } from "../i18n.js";
import { escapeHtml, normalizeKey } from "../utils.js";
import { createFunCommands } from "./fun.js";
import { createMetaCommands } from "./meta.js";
import { createNavigationCommands } from "./navigation.js";
import { resolveCommandInput } from "./parser.js";
import { createProfileCommands } from "./profile.js";
import { createSystemCommands } from "./system.js";

const HIDDEN_COMMANDS = new Set(["sudo-hire-me"]);

function unique(values) {
  return [...new Set(values)];
}

function levenshteinDistance(a, b) {
  const source = String(a || "");
  const target = String(b || "");

  const rows = source.length + 1;
  const cols = target.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[source.length][target.length];
}

function findClosestCommand(input, candidates) {
  const normalizedInput = normalizeKey(input);
  if (!normalizedInput) return null;

  const prefixMatches = candidates.filter((candidate) => candidate.startsWith(normalizedInput));
  if (prefixMatches.length === 1) return prefixMatches[0];

  let bestCandidate = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  candidates.forEach((candidate) => {
    const distance = levenshteinDistance(normalizedInput, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestCandidate = candidate;
    }
  });

  const threshold = normalizedInput.length <= 4 ? 1 : normalizedInput.length <= 8 ? 2 : 3;
  if (bestDistance <= threshold) {
    return bestCandidate;
  }

  return null;
}

export function createCommandRunner(context) {
  const { state, clearOutput, setLocale, setTheme, toggleTheme } = context;

  const getStrings = () => STRINGS[state.locale] || STRINGS.en;
  const getProfile = () => PROFILE.locales[state.locale] || PROFILE.locales.en;

  const commandMap = {};

  const getCommandNames = () =>
    Object.keys(commandMap)
      .filter((name) => !HIDDEN_COMMANDS.has(name))
      .sort();

  function getArgumentCandidates(commandName, args = [], argIndex = 0) {
    const profile = getProfile();
    const key = normalizeKey(commandName);

    switch (key) {
      case "open":
        return ["github", "linkedin", "web", "website", "mail", "email"];
      case "repo":
        return profile.projects.map((project) => project.slug);
      case "project": {
        return profile.projects.map((_, index) => String(index + 1));
      }
      case "cat":
        return FILE_ENTRIES.map((entry) => entry.name);
      case "man":
        return getCommandNames();
      case "lang":
        return ["tr", "en"];
      case "theme":
        return ["dark", "light"];
      case "copy":
        return ["email", "phone"];
      case "cv":
      case "download":
        return ["tr", "en", "--pdf", "--download", "-d"];
      case "ascii":
        return ["terminal", "cat", "rocket", "skull", "list"];
      case "sudo":
        if (argIndex === 0) return ["hire-me", "hire"];
        if (argIndex === 1 && normalizeKey(args[0]) === "hire") return ["me"];
        return [];
      default:
        return [];
    }
  }

  function getCommandCompletions(prefix = "") {
    const normalizedPrefix = normalizeKey(prefix);
    return getCommandNames().filter((name) => name.startsWith(normalizedPrefix));
  }

  function getArgumentCompletions(commandName, args = [], argIndex = 0, prefix = "") {
    const parsed = resolveCommandInput(commandName, args);
    const resolvedCommand = parsed.cmd || normalizeKey(commandName);
    const normalizedPrefix = normalizeKey(prefix);

    const candidates = unique(getArgumentCandidates(resolvedCommand, args, argIndex));
    return candidates
      .filter((candidate) => normalizeKey(candidate).startsWith(normalizedPrefix))
      .sort();
  }

  function getCommandSuggestion(commandName) {
    return findClosestCommand(commandName, getCommandNames());
  }

  const ctx = {
    state,
    getStrings,
    getProfile,
    clearOutput,
    setLocale,
    setTheme,
    toggleTheme,
    invoke: (commandName, args = []) => {
      const key = normalizeKey(commandName);
      const handler = commandMap[key];
      if (!handler) return null;
      return handler(args);
    },
  };

  Object.assign(commandMap, createMetaCommands(ctx));
  Object.assign(commandMap, createProfileCommands(ctx));
  Object.assign(commandMap, createNavigationCommands(ctx));
  Object.assign(commandMap, createSystemCommands(ctx));
  Object.assign(commandMap, createFunCommands(ctx));

  async function runCommand(commandName, args = []) {
    const strings = getStrings();
    const parsed = resolveCommandInput(commandName, args);

    if (!parsed.cmd) return "";

    const commandFn = commandMap[parsed.cmd];
    if (!commandFn) {
      const notFound = strings.ui.commandNotFound(escapeHtml(parsed.cmd));
      const suggestion = getCommandSuggestion(parsed.cmd);
      if (!suggestion) return notFound;
      return `${notFound}\n${strings.ui.didYouMean(escapeHtml(suggestion))}`;
    }

    const result = commandFn(parsed.args);
    if (result && typeof result.then === "function") {
      return result;
    }

    return result;
  }

  return {
    runCommand,
    getPrompt: () => getStrings().ui.prompt,
    getLastLogin: () => getStrings().ui.lastLogin,
    getWelcomeLine: () => getStrings().ui.welcome,
    getHelpHint: () => getStrings().ui.typeHelp,
    getAutoGuideMessage: () => getStrings().ui.guideAutoStart,
    getCommandNames,
    getCommandCompletions,
    getArgumentCompletions,
    getCommandSuggestion,
    commands: commandMap,
  };
}
