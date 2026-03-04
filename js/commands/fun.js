import { escapeHtml, normalizeKey } from "../utils.js";

const ASCII_ART = {
  terminal: String.raw`
   ______________________
  |  terminal-cv shell   |
  |----------------------|
  | > ship --safe        |
  | > monitor --live     |
  | > deploy --green     |
  |______________________|
         \   ^__^
          \  (oo)\_______
             (__)\       )\/\
                 ||----w |
                 ||     ||
`,
  cat: String.raw`
 /\_/\
( o.o )
 > ^ <
`,
  rocket: String.raw`
        /\
       /  \
      /++++\
     /  ()  \
     |      |
     |  CV  |
     |      |
    /| |  | |\
   /_|_|__|_|_\
      /_/\_\
`,
  skull: String.raw`
  .-"""-.
 / .===. \
 \/ 6 6 \/
 ( \___/ )
___) (___
/___/   \___\
`,
};

const JOKES = {
  en: [
    "It works on my VPS is not a deployment strategy.",
    "I renamed production to staging. Incident solved.",
    "99% uptime means 3.65 days of character development.",
    "There are two states: green pipeline and panic.",
  ],
  tr: [
    "Bende calisiyor demek deployment plani degildir.",
    "Production adini staging yaptim, olay kapandi.",
    "%99 uptime yilda 3.65 gun macera demek.",
    "Iki durum vardir: yesil pipeline ve panik.",
  ],
};

export function createFunCommands(ctx) {
  const { state, getStrings, getProfile } = ctx;

  function getJokes() {
    return JOKES[state.locale] || JOKES.en;
  }

  return {
    sudo: (args) => {
      const strings = getStrings();
      const first = normalizeKey(args[0]);
      const second = normalizeKey(args[1]);

      if (first === "hire-me" || (first === "hire" && second === "me")) {
        return ctx.invoke("hire-me", []);
      }

      return strings.messages.sudoNotFound(escapeHtml(args.join(" ")));
    },

    "hire-me": () => {
      const strings = getStrings();
      return `
<span class="section-title">${strings.labels.hireMe}</span>
<span class="success">${strings.labels.whyMe}</span>
- OCI VPS + Docker + Nginx + SSL deployment experience
- CI/CD automation with GitHub Actions
- Reliability mindset (hardening + monitoring)
- Strong documentation and operational handbooks

<span class="warn">${strings.labels.fastAccess}</span>
- <span class="dim">resume</span>  (quick scan)
- <span class="dim">projects</span>  (deep dive)
- <span class="dim">open github</span>  (proof)
`;
    },

    "sudo-hire-me": () => ctx.invoke("hire-me", []),

    fortune: () => {
      const profile = getProfile();
      const list = profile.funFortunes;
      const selected = list[Math.floor(Math.random() * list.length)];
      return `<span class=\"info\">${selected}</span>`;
    },

    coffee: () => {
      const strings = getStrings();
      return `
<pre class="ascii-art">
  ( (
   ) )
........
|      |]
\      /
 '----'
</pre>
${strings.messages.coffee}
`;
    },

    roll: () => {
      const strings = getStrings();
      const value = Math.floor(Math.random() * 6) + 1;
      return strings.messages.dice(value);
    },

    matrix: () => {
      const strings = getStrings();
      return `<span class=\"success\">010101 001100 101010 110011</span>\n${strings.messages.matrix}`;
    },

    snake: () => {
      const hint =
        state.locale === "tr"
          ? "Kontrol: ok tuslari veya WASD. Cikmak icin X veya ESC."
          : "Controls: Arrow keys or WASD. Press X or ESC to quit.";

      return `
<span class="section-title">snake</span>
<span class="dim">${hint}</span>
<div class="snake-host" data-snake-host></div>
`;
    },

    ascii: (args) => {
      const strings = getStrings();
      const key = normalizeKey(args[0]);

      if (!key || key === "list") {
        const list = Object.keys(ASCII_ART).join(", ");
        return `<span class=\"section-title\">ASCII</span>\n<span class=\"dim\">${list}</span>\n<pre class=\"ascii-art\">${ASCII_ART.terminal}</pre>`;
      }

      const selected = ASCII_ART[key];
      if (!selected) {
        return `${strings.messages.asciiUnknown(escapeHtml(args[0] || ""))}\n${strings.usage.ascii}`;
      }

      return `<pre class=\"ascii-art\">${selected}</pre>`;
    },

    cowsay: (args) => {
      const fallback = state.locale === "tr" ? "deploy hazir mi?" : "ready to deploy?";
      const raw = args.join(" ").trim() || fallback;
      const plain = raw.length > 52 ? `${raw.slice(0, 49)}...` : raw;
      const safe = escapeHtml(plain);
      const edge = "-".repeat(plain.length + 2);

      return `
<pre class="ascii-art">
 ${edge}
&lt; ${safe} &gt;
 ${edge}
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
</pre>
`;
    },

    joke: () => {
      const jokes = getJokes();
      const selected = jokes[Math.floor(Math.random() * jokes.length)];
      return `<span class=\"info\">${selected}</span>`;
    },

    hack: (args) => {
      const target = escapeHtml(args.join(" ").trim() || (state.locale === "tr" ? "production" : "production"));
      const lines =
        state.locale === "tr"
          ? [
              `[+] hedef secildi: ${target}`,
              "[+] ssh tanel tespit edildi",
              "[+] .env bulundu (redacted)",
              "[+] deploy lock kaldirildi",
              "[+] saka saka, sadece demo :)",
            ]
          : [
              `[+] target selected: ${target}`,
              "[+] ssh tunnel discovered",
              "[+] .env located (redacted)",
              "[+] deploy lock released",
              "[+] just kidding, demo only :)",
            ];

      return `<span class=\"section-title\">hack</span>\n${lines.join("\n")}`;
    },
  };
}
