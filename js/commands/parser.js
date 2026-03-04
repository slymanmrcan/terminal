import { normalizeKey } from "../utils.js";

const COMMAND_ALIASES = {
  hireme: "hire-me",
  "sudo-hire-me": "hire-me",
};

export function resolveCommandInput(commandName, args = []) {
  const cmd = normalizeKey(commandName);
  if (!cmd) {
    return { cmd: "", args };
  }

  const normalizedArgs = args.map((arg) => normalizeKey(arg));

  if ((cmd === "tr" || cmd === "en") && args.length === 0) {
    return { cmd: "lang", args: [cmd] };
  }

  if (cmd === "hire" && normalizedArgs[0] === "me") {
    return { cmd: "hire-me", args: [] };
  }

  if (COMMAND_ALIASES[cmd]) {
    return { cmd: COMMAND_ALIASES[cmd], args };
  }

  return { cmd, args };
}
