import { FILE_ENTRIES, PROFILE } from "../data.js";
import { escapeHtml, padRight, toSafeUsername } from "../utils.js";

const ALL_SECTION_ORDER = [
  "banner",
  "about",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "contact",
];

export function createSystemCommands(ctx) {
  const { state, getStrings, getProfile, clearOutput } = ctx;

  return {
    all: () => {
      const sections = ALL_SECTION_ORDER.map((command) => ctx.invoke(command, [])).filter(Boolean);
      return sections.join("\n");
    },

    clear: () => {
      clearOutput();
      return "";
    },

    whoami: () => toSafeUsername(PROFILE.name),

    pwd: () => `<span class=\"info\">/home/${toSafeUsername(PROFILE.name)}/resume</span>`,

    ls: () => {
      let out = "";
      FILE_ENTRIES.forEach((entry) => {
        out += `<span class=\"dim\">${padRight(entry.size, 6)}</span> <span class=\"success\">${entry.name}</span>\n`;
      });
      return out;
    },

    cat: (args) => {
      const strings = getStrings();
      const requested = args[0];
      if (!requested) return strings.ui.catMissing;

      const entry = FILE_ENTRIES.find((file) => file.name.toLowerCase() === requested.toLowerCase());
      if (!entry) return strings.ui.catNotFound(escapeHtml(requested));

      if (entry.command === "readme") {
        const profile = getProfile();
        return `${PROFILE.name} - ${profile.title}\n\n${strings.ui.readme}`;
      }

      if (entry.command === "cv-en") {
        return ctx.invoke("cv", ["en", "--pdf"]);
      }

      if (entry.command === "cv-tr") {
        return ctx.invoke("cv", ["tr", "--pdf"]);
      }

      const result = ctx.invoke(entry.command, []);
      if (!result) return strings.ui.catReadError(escapeHtml(requested));
      return result;
    },

    uname: () => `<span class=\"info\">Linux resume 6.8.0 #1 SMP PREEMPT</span>`,

    uptime: () => {
      const seconds = Math.floor((Date.now() - state.bootTime) / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `<span class=\"info\">up ${hours}h ${minutes}m ${secs}s</span>`;
    },

    date: () => `<span class=\"info\">${new Date().toString()}</span>`,

    neofetch: () => {
      const profile = getProfile();
      return `
<pre class="ascii-art">
             .ooooo.   <span class="info">OS: Ubuntu (Terminal Resume)</span>
            d88'   '88b  <span class="info">Shell: bash</span>
            888     888  <span class="info">User: ${PROFILE.name}</span>
.o.         888     888  <span class="warn">${profile.neofetch.focus}: Cloud & DevOps</span>
'888b       '8b   d88'   <span class="warn">${profile.neofetch.stack}: Docker, Terraform, Go</span>
 '888b       '8ooooo'    <span class="warn">${profile.neofetch.cloud}: Oracle Cloud (OCI)</span>
</pre>
`;
    },
  };
}
