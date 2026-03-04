const terminalData = {
  name: "Süleyman MERCAN",
  title: "Cloud & DevOps Practitioner",
  contact: {
    phone: "+90 551 952 45 00",
    email: "slymanmrcan@gmail.com",
    github: "github.com/slymanmrcan",
    linkedin: "linkedin.com/in/slymanmrcan",
    website: "slymanmrcan.github.io/terminal",
    location: "Turkey (Remote-friendly)",
  },

  about:
    "Cloud and DevOps practitioner with practical experience in Linux server administration, containerized deployments, and cloud infrastructure management. Hands-on work with Oracle Cloud VPS environments, Docker containerization, networking fundamentals, and CI/CD automation.\n\nWork Approach:\n• Infrastructure-first mindset focused on reliability\n• Automation-driven deployment workflows\n• Strong troubleshooting for production systems\n• Continuous learning in cloud and DevOps tooling",

  experience: [
    {
      title: "Cloud & DevOps Projects (Independent)",
      company: "Self-Employed",
      location: "Remote",
      period: "05/2022 - Present",
      description:
        "Provisioned Oracle Cloud VPS servers, configured hardened Linux environments, deployed containerized applications with Docker Compose, built CI/CD pipelines with GitHub Actions and managed Nginx reverse proxy setups for production workloads.",
    },
    {
      title: "Developer",
      company: "Logiting Teknoloji",
      location: "Konya",
      period: "09/2021 - 05/2022",
      description:
        "Developed web applications with .NET Core and collaborated on API integrations while gaining practical experience with server-side environments and deployment workflows.",
    },
  ],

  education: [
    {
      degree: "Mathematics & Computer Science",
      school: "Necmettin Erbakan University",
      period: "2018 - 2021",
    },
    {
      degree: "Computer Programming",
      school: "Konya Technical University",
      period: "2015 - 2018",
    },
  ],

  skills: {
    Cloud: [
      "Oracle Cloud (OCI)",
      "Linux Server Administration",
      "VPS Management",
      "Security Hardening",
    ],
    DevOps: [
      "Docker",
      "GitHub Actions",
      "Terraform",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
    Backend: ["Go", "PostgreSQL", "REST API"],
    Network: ["TCP/IP", "DNS", "Firewall", "Routing"],
  },

  projects: [
    {
      name: "GitHub Organization Infrastructure",
      slug: "github-infra",
      tech: "Terraform, GitHub API, GitHub Actions",
      description: "Infrastructure as Code for managing GitHub organizations",
      link: "https://github.com/Bilgisayar-Kavramlari-Toplulugu/github-infra",
      features: [
        "Repository provisioning via Terraform",
        "Team and permission automation",
        "PR validation with GitHub Actions",
        "Open source infrastructure management",
      ],
    },
    {
      name: "VPS Hardening & Monitoring Guide",
      slug: "server-guide",
      tech: "Linux, Docker, Nginx, Prometheus, Grafana",
      description: "Production server setup documentation (living handbook)",
      link: "https://suleymanmrcn.github.io/server-guide/",
      features: [
        "Linux security hardening recipes",
        "Docker deployment patterns",
        "Nginx reverse proxy + SSL guidance",
        "Monitoring and runbooks",
      ],
    },
    {
      name: "RSS Aggregator Service",
      slug: "techfeed",
      tech: "Go, Docker, Nginx",
      description: "Backend service that aggregates RSS feeds",
      link: "https://techfeed.is-app.com",
      features: [
        "RSS parsing and aggregation",
        "Title-based filtering",
        "Docker container deployment",
        "Production deployment on OCI VPS",
      ],
    },
  ],

  otherProjects: ["containerized apps", "log monitoring", "deployment automation"],

  certifications: [
    { title: "Docker Temelleri", issuer: "BTK Akademi", id: "wmlFJO1z69" },
    { title: "DevOps Sertifikası", issuer: "Optivisdom", id: "#5088da8e..." },
    { title: "İleri Ağ Teknolojileri", issuer: "BTK Akademi", id: "oJpS7GOPxO" },
  ],

  languages: [
    { lang: "Turkish", level: "Native" },
    { lang: "English", level: "A2 (Technical Documentation)" },
  ],

  // İstersen buraya gerçek PDF linkini koy
  assets: {
    pdf: "", // örn: "https://.../Suleyman_Mercan_CV.pdf"
  },
};

// --------------------------------------------------------------------------
// FILE SIZES (ls)
// --------------------------------------------------------------------------

const fileSizes = {
  "about.txt": "1.4K",
  "experience.txt": "1.8K",
  "education.txt": "800B",
  "skills.txt": "1.2K",
  "projects.txt": "2.5K",
  "certifications.txt": "1.1K",
  "languages.txt": "400B",
  "contact.txt": "500B",
  "resume.txt": "900B",
  "stack.txt": "700B",
  "links.txt": "450B",
  "README.md": "350B",
};

// --------------------------------------------------------------------------
// STATE
// --------------------------------------------------------------------------

const output = document.getElementById("output");
const input = document.getElementById("input");
const terminal = document.getElementById("terminal");

let commandHistory = [];
let historyIndex = -1;

const PROMPT = "suleyman@resume:~$";
const bootTime = Date.now();

// --------------------------------------------------------------------------
// OUTPUT HELPERS
// --------------------------------------------------------------------------

function printOutput(html, cls = "") {
  const line = document.createElement("div");
  line.className = `output-line ${cls}`;
  line.innerHTML = html;
  output.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function printCommand(cmd) {
  printOutput(`<span class="command-line">${PROMPT} ${cmd}</span>`);
}

function openUrl(url) {
  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (e) {
    // bazı ortamlarda popup bloklanabilir
  }
}

function padRight(str, n) {
  return (str + " ".repeat(n)).slice(0, n);
}

function normalizeKey(s) {
  return (s || "").toLowerCase().trim();
}

// --------------------------------------------------------------------------
// MINI MAN PAGES
// --------------------------------------------------------------------------

const manPages = {
  help: "List available commands.",
  about: "Show profile summary.",
  experience: "Show work experience.",
  education: "Show education history.",
  skills: "Show technical skills.",
  projects: "Show projects list.",
  project: "Open a project by index: project 1 | project 2 | project 3",
  repo: "Open a project/repo by slug: repo github-infra | repo server-guide | repo techfeed",
  links: "Show all links (GitHub, LinkedIn, Website, Email).",
  contact: "Show contact info.",
  resume: "One-screen resume summary for quick scan.",
  stack: "Detailed stack overview (Cloud/DevOps/Backend/Network).",
  open: "Open link: open github | open linkedin | open web | open mail",
  download: "Open CV PDF if available.",
  clear: "Clear terminal output.",
  ls: "List files (fake directory view).",
  cat: "Read file: cat about.txt | cat resume.txt | cat stack.txt | cat links.txt",
  whoami: "Print username.",
  pwd: "Print working directory.",
  neofetch: "Show system-style summary.",
  uname: "Show kernel info (fun).",
  uptime: "Show uptime since page load.",
  date: "Print current date/time.",
  banner: "Print welcome banner again.",
  "sudo hire-me": "Fun command that prints a hire pitch.",
};

// --------------------------------------------------------------------------
// COMMANDS
// --------------------------------------------------------------------------

const commands = {
  help: () => `
<span class="section-title">Available commands</span>
about       experience    education
skills      projects      project
stack       resume        links
certifications  languages  contact
open        repo          download
clear       github        linkedin
<span class="info">cat [file]</span>  <span class="info">ls</span>            whoami
neofetch    pwd           uname
uptime      date          banner
<span class="info">man [command]</span>  <span class="info">sudo hire-me</span>
`,

  man: (args) => {
    const key = normalizeKey(args[0]);
    if (!key) return "<span class='error'>man: missing command</span>";
    const page = manPages[key] || manPages[args.join(" ")] || null;
    if (!page) return `<span class='error'>man: no manual entry for ${args[0]}</span>`;
    return `<span class="section-title">MAN ${args.join(" ")}</span>\n${page}`;
  },

  banner: () => `
<pre class="ascii-art">
   ________              __      __  ____  _  __
  / ____/ /___  __  ____/ /___  / / / __ \\/ |/ /
 / /   / / __ \\/ / / / __  / / / / / /_/ /    /
/ /___/ / /_/ / /_/ / /_/ / /_/ / / _, _/ /|  /
\\____/_/\\____/\\__,_/\\__,_/\\__, / /_/ |_/_/ |_/
                         /____/

<span class="info">${terminalData.name}</span>  —  <span class="warn">${terminalData.title}</span>
<span class="dim">Type</span> <span class="success">help</span> <span class="dim">to explore.</span>
</pre>
`,

  about: () => `
<span class="section-title">${terminalData.name}</span>
<span class="info">${terminalData.title}</span>
<span class="info-label">${terminalData.contact.location}</span>

${terminalData.about}
`,

  experience: () => {
    let out = `<span class="section-title">Experience</span>\n`;
    terminalData.experience.forEach((e) => {
      out += `
<span class="success">${e.title}</span> @ <span class="info">${e.company}</span>
<span class="info-label">${e.location} - ${e.period}</span>
${e.description}
`;
    });
    return out;
  },

  education: () => {
    let out = `<span class="section-title">Education</span>\n`;
    terminalData.education.forEach((e) => {
      out += `
<span class="success">${e.degree}</span>
<span class="info">${e.school}</span>
<span class="info-label">${e.period}</span>
`;
    });
    return out;
  },

  skills: () => {
    let out = `<span class="section-title">Skills</span>\n`;
    for (const [k, v] of Object.entries(terminalData.skills)) {
      out += `<span class="warn">${k}</span>: ${v.join(", ")}\n`;
    }
    return out;
  },

  stack: () => `
<span class="section-title">Stack</span>

<span class="warn">Cloud</span>
- Oracle Cloud (OCI): VPS provisioning, networking basics, security hardening

<span class="warn">Linux & Security</span>
- Ubuntu/Debian admin, SSH hardening, firewall, Fail2ban
- Nginx reverse proxy, SSL/TLS with Certbot

<span class="warn">Containers & Delivery</span>
- Docker, Docker Compose, image optimization, env-based configs
- GitHub Actions: build/deploy automation, PR validation patterns

<span class="warn">Observability</span>
- Prometheus + Grafana fundamentals

<span class="warn">Backend</span>
- Go services, REST API basics, PostgreSQL ops (backup/restore)
`,

  projects: () => {
    let out = `<span class="section-title">Projects</span>\n`;
    terminalData.projects.forEach((p, i) => {
      out += `
<span class="success">${i + 1}. ${p.name}</span> (<span class="dim">${p.tech}</span>)
${p.description}
- ${p.features.join("\n- ")}
<span class="info">open:</span> <span class="dim">project ${i + 1}</span>  |  <span class="info">repo:</span> <span class="dim">repo ${p.slug}</span>
`;
    });
    out += `\nOther: <span class="dim">${terminalData.otherProjects.join(", ")}</span>`;
    return out;
  },

  project: (args) => {
    const idx = parseInt(args[0], 10);
    if (!idx || idx < 1 || idx > terminalData.projects.length) {
      return "<span class='error'>usage: project 1 | project 2 | project 3</span>";
    }
    const p = terminalData.projects[idx - 1];
    openUrl(p.link);
    return `Opening <span class="success">${p.name}</span>...`;
  },

  repo: (args) => {
    const slug = normalizeKey(args[0]);
    if (!slug) return "<span class='error'>usage: repo github-infra|server-guide|techfeed</span>";
    const p = terminalData.projects.find((x) => normalizeKey(x.slug) === slug);
    if (!p) return `<span class='error'>repo: ${args[0]}: not found</span>`;
    openUrl(p.link);
    return `Opening <span class="success">${p.slug}</span>...`;
  },

  links: () => `
<span class="section-title">Links</span>
Web      : <span class="info">https://${terminalData.contact.website}</span>
GitHub   : <span class="info">https://${terminalData.contact.github}</span>
LinkedIn : <span class="info">https://${terminalData.contact.linkedin}</span>
Email    : <span class="info">mailto:${terminalData.contact.email}</span>
`,

  resume: () => `
<span class="section-title">Resume (Quick)</span>
<span class="success">${terminalData.name}</span> — <span class="info">${terminalData.title}</span>
<span class="info-label">${terminalData.contact.location}</span>

<span class="warn">Highlights</span>
- OCI VPS provisioning + Linux hardening (SSH, firewall, Fail2ban)
- Docker Compose deployments, Nginx reverse proxy + SSL (Certbot)
- CI/CD automation with GitHub Actions
- Observability fundamentals (Prometheus, Grafana)
- Go services + PostgreSQL ops

<span class="warn">Top Projects</span>
- GitHub org infra via Terraform: <span class="dim">repo github-infra</span>
- Server hardening guide: <span class="dim">repo server-guide</span>
- RSS Aggregator (Go): <span class="dim">repo techfeed</span>

<span class="warn">Links</span>
- <span class="dim">open web</span> | <span class="dim">open github</span> | <span class="dim">open linkedin</span> | <span class="dim">open mail</span>
`,

  contact: () => `
<span class="section-title">Contact</span>
Email    : <span class="info">${terminalData.contact.email}</span>
Phone    : <span class="info">${terminalData.contact.phone}</span>
Web      : <span class="info">https://${terminalData.contact.website}</span>
GitHub   : <span class="info">https://${terminalData.contact.github}</span>
LinkedIn : <span class="info">https://${terminalData.contact.linkedin}</span>
`,

  certifications: () => {
    let out = `<span class="section-title">Certifications</span>\n`;
    terminalData.certifications.forEach((c) => {
      out += `
<span class="success">${c.title}</span> - <span class="info">${c.issuer}</span>
<span class="dim">ID: ${c.id}</span>
`;
    });
    return out;
  },

  languages: () => {
    let out = `<span class="section-title">Languages</span>\n`;
    terminalData.languages.forEach((l) => {
      out += `<span class="info">${l.lang}</span>: ${l.level}\n`;
    });
    return out;
  },

  all: () =>
    commands.banner() +
    commands.about() +
    commands.experience() +
    commands.education() +
    commands.skills() +
    commands.projects() +
    commands.certifications() +
    commands.languages() +
    commands.contact(),

  clear: () => {
    output.innerHTML = "";
    return "";
  },

  open: (args) => {
    const target = normalizeKey(args[0]);
    if (!target) return "<span class='error'>usage: open github|linkedin|web|mail</span>";

    if (target === "github") {
      openUrl(`https://${terminalData.contact.github}`);
      return "Opening GitHub...";
    }
    if (target === "linkedin") {
      openUrl(`https://${terminalData.contact.linkedin}`);
      return "Opening LinkedIn...";
    }
    if (target === "web" || target === "website") {
      openUrl(`https://${terminalData.contact.website}`);
      return "Opening website...";
    }
    if (target === "mail" || target === "email") {
      openUrl(`mailto:${terminalData.contact.email}`);
      return "Opening mail client...";
    }
    return `<span class='error'>open: unknown target '${args[0]}'</span>`;
  },

  download: () => {
    if (terminalData.assets.pdf) {
      openUrl(terminalData.assets.pdf);
      return "Opening CV PDF...";
    }
    return `<span class="warn">No PDF linked yet.</span>\nSet <span class="dim">terminalData.assets.pdf</span> to your CV PDF URL.`;
  },

  github: () => {
    openUrl(`https://${terminalData.contact.github}`);
    return "Opening GitHub profile...";
  },

  linkedin: () => {
    openUrl(`https://${terminalData.contact.linkedin}`);
    return "Opening LinkedIn profile...";
  },

  whoami: () =>
    terminalData.name
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, ""),

  pwd: () => `<span class="info">/home/${commands.whoami()}/resume</span>`,

  ls: () => {
    let out = "";
    Object.keys(fileSizes).forEach((file) => {
      out += `<span class="dim">${padRight(fileSizes[file], 6)}</span> <span class="success">${file}</span>\n`;
    });
    return out;
  },

  cat: (args) => {
    if (!args[0]) return "<span class='error'>cat: missing file operand</span>";

    const requested = args[0];
    const keyMatch = Object.keys(fileSizes).find(
      (f) => f.toLowerCase() === requested.toLowerCase()
    );
    if (!keyMatch) {
      return `<span class='error'>cat: ${requested}: No such file or directory</span>`;
    }

    const cmdName = keyMatch.toLowerCase().replace(".txt", "").replace(".md", "");

    if (cmdName === "readme") {
      return `
${terminalData.name} - ${terminalData.title}

Type 'help' to explore this terminal resume.
Try: resume, projects, repo github-infra, stack
`;
    }

    if (commands[cmdName]) return commands[cmdName]();
    return `<span class='error'>cat: ${requested}: Error reading file content</span>`;
  },

  uname: () => `<span class="info">Linux resume 6.8.0 #1 SMP PREEMPT</span>`,

  uptime: () => {
    const sec = Math.floor((Date.now() - bootTime) / 1000);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `<span class="info">up ${h}h ${m}m ${s}s</span>`;
  },

  date: () => `<span class="info">${new Date().toString()}</span>`,

  neofetch: () => `
<pre class="ascii-art">
             .ooooo.   <span class="info">OS: Ubuntu (Terminal Resume)</span>
            d88'   '88b  <span class="info">Shell: bash</span>
            888     888  <span class="info">User: ${terminalData.name}</span>
.o.         888     888  <span class="warn">Focus: Cloud & DevOps</span>
'888b       '8b   d88'   <span class="warn">Stack: Docker, Terraform, Go</span>
 '888b       '8ooooo'    <span class="warn">Cloud: Oracle Cloud (OCI)</span>
</pre>
`,

  // fun: sudo hire-me
  sudo: (args) => {
    const sub = normalizeKey(args[0]);
    if (sub === "hire-me" || (sub === "hire" && normalizeKey(args[1]) === "me")) {
      return commands["hire-me"]();
    }
    return `<span class='error'>sudo: ${args.join(" ")}: command not found</span>`;
  },

  "hire-me": () => `
<span class="section-title">Hire Me</span>
<span class="success">Why me?</span>
- I deploy real workloads (OCI VPS + Docker + Nginx + SSL)
- I automate delivery (GitHub Actions)
- I care about reliability (hardening + monitoring basics)
- I document everything (server-guide)

<span class="warn">Fast access</span>
- <span class="dim">resume</span>  (quick scan)
- <span class="dim">projects</span>  (deep dive)
- <span class="dim">open github</span>  (proof)
`,

  // alias convenience
  "sudo-hire-me": () => commands["hire-me"](),
};

// --------------------------------------------------------------------------
// COMMAND HANDLER
// --------------------------------------------------------------------------

function handleCommand(raw) {
  const cmdLine = raw.trim();
  if (!cmdLine) return;

  printCommand(cmdLine);

  if (commandHistory[0] !== cmdLine) {
    commandHistory.unshift(cmdLine);
    if (commandHistory.length > 50) commandHistory.pop();
  }
  historyIndex = -1;

  const [cmdRaw, ...args] = cmdLine.split(" ");
  const cmd = cmdRaw.toLowerCase();

  // Special case: "sudo hire-me" with dash/space variations
  if (cmd === "sudo" && args.length) {
    const result = commands.sudo(args);
    if (result) printOutput(result);
    return;
  }

  // alias: "sudo hire me" like
  if (cmd === "sudo" && args[0] === "hire" && args[1] === "me") {
    const result = commands["hire-me"]();
    if (result) printOutput(result);
    return;
  }

  // allow "hire-me" directly
  if (cmd === "hire-me") {
    const result = commands["hire-me"]();
    if (result) printOutput(result);
    return;
  }

  const fn = commands[cmd];
  if (!fn) {
    printOutput(
      `bash: <span class='error'>${cmd}</span>: command not found`,
      "error"
    );
    return;
  }

  const result = fn(args);
  if (result) printOutput(result);
}

// --------------------------------------------------------------------------
// INPUT EVENTS
// --------------------------------------------------------------------------

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCommand(input.value);
    input.value = "";
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }, 0);
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }, 0);
    } else if (historyIndex === 0) {
      historyIndex = -1;
      input.value = "";
    }
  }

  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    commands.clear();
  }
});

// --------------------------------------------------------------------------
// BOOT / WELCOME
// --------------------------------------------------------------------------

window.addEventListener("load", () => {
  printOutput("Last login: tty1");
  printOutput(commands.banner());
  printOutput(`Welcome, <span class="info">${terminalData.name}</span>`);
  printOutput("Type '<span class='success'>help</span>' to get started.");
  input.focus();
});

// Keep focus
document.addEventListener("click", () => input.focus());

// Mobil klavye uyumluluğu için
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 100);
  });
}
