import { HELP_CATEGORIES } from "./help-config.js";
import { resolveLocale, STRINGS } from "../i18n.js";
import { resolveTheme } from "../theme.js";
import { escapeHtml, normalizeKey, padRight } from "../utils.js";

function toManualKey(value) {
  return normalizeKey(value).replace(/\s+/g, "-");
}

function formatCommands(commands, columns = 3, width = 16) {
  let out = "";
  for (let i = 0; i < commands.length; i += columns) {
    const chunk = commands.slice(i, i + columns);
    out += `${chunk.map((cmd) => padRight(cmd, width)).join("")}\n`;
  }
  return out;
}

export function createMetaCommands(ctx) {
  const { state, getStrings, setLocale, setTheme, toggleTheme } = ctx;

  return {
    help: () => {
      const strings = getStrings();
      const categories = HELP_CATEGORIES[state.locale] || HELP_CATEGORIES.en;

      let out = `<span class=\"section-title\">${strings.ui.availableCommands}</span>\n`;
      categories.forEach((category) => {
        out += `\n<span class=\"warn\">${category.title}</span>\n`;
        out += `${formatCommands(category.commands)}`;
      });

      out += `\n<span class=\"info\">man [command]</span>`;
      return out;
    },

    guide: () => {
      const strings = getStrings();
      const lines =
        state.locale === "tr"
          ? [
              `1. <span class=\"success\">about</span> ile ozeti gor.`,
              `2. <span class=\"success\">skills</span> ve <span class=\"success\">projects</span> ile teknik tarama yap.`,
              `3. <span class=\"success\">search docker</span> ile icerikte anahtar kelime ara.`,
              `4. <span class=\"success\">cv --pdf</span> ile PDF ac, <span class=\"success\">cv --download</span> ile indir.`,
              `5. <span class=\"success\">copy email</span> veya <span class=\"success\">copy phone</span> kullan.`,
              `6. <span class=\"success\">theme</span> ile dark/light degistir, <span class=\"success\">lang en</span> ile dili degistir.`,
            ]
          : [
              `1. Run <span class=\"success\">about</span> for a quick summary.`,
              `2. Use <span class=\"success\">skills</span> and <span class=\"success\">projects</span> for a technical scan.`,
              `3. Run <span class=\"success\">search docker</span> to find keywords in content.`,
              `4. Use <span class=\"success\">cv --pdf</span> to open and <span class=\"success\">cv --download</span> to download PDF.`,
              `5. Try <span class=\"success\">copy email</span> or <span class=\"success\">copy phone</span>.`,
              `6. Toggle theme with <span class=\"success\">theme</span>, switch language with <span class=\"success\">lang tr</span>.`,
            ];

      return `<span class=\"section-title\">${strings.labels.guide}</span>\n${strings.ui.guideTip}\n\n${lines.join(
        "\n"
      )}\n\n<span class=\"dim\">help</span>`;
    },

    man: (args) => {
      const strings = getStrings();
      const rawKey = args.join(" ").trim();
      if (!rawKey) return strings.ui.manMissingCommand;

      const key = toManualKey(rawKey);
      const firstArg = normalizeKey(args[0]);
      const manual = strings.man[key] || strings.man[normalizeKey(rawKey)] || strings.man[firstArg] || null;

      if (!manual) {
        return strings.ui.manNotFound(escapeHtml(rawKey));
      }

      return `<span class=\"section-title\">MAN ${escapeHtml(rawKey)}</span>\n${manual}`;
    },

    theme: (args) => {
      const strings = getStrings();
      const requested = normalizeKey(args[0]);

      if (!requested) {
        const nextTheme = toggleTheme();
        return strings.messages.themeChanged(nextTheme);
      }

      const resolved = resolveTheme(requested);
      if (!resolved) return strings.usage.theme;

      const nextTheme = setTheme(resolved);
      return strings.messages.themeChanged(nextTheme);
    },

    lang: (args) => {
      const strings = getStrings();
      const requested = normalizeKey(args[0]);

      if (!requested) {
        return `${strings.ui.currentLang(state.locale.toUpperCase())}\n<span class=\"dim\">lang tr | lang en</span>`;
      }

      const resolved = resolveLocale(requested);
      if (!resolved) return strings.usage.lang;

      const nextLocale = setLocale(resolved);
      const nextStrings = STRINGS[nextLocale] || STRINGS.en;
      return nextStrings.messages.langChanged(nextLocale);
    },
  };
}
