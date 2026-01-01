const terminalData = {
  name: "Süleyman MERCAN",
  title: "Cloud & DevOps Engineer",
  contact: {
    phone: "+90 551 952 45 00",
    email: "slymanmrcan@gmail.com",
    github: "github.com/slymanmrcan",
    linkedin: "linkedin.com/in/slymanmrcan",
    website: "slymnmrcn.github.io",
    location: "Turkey (Remote-friendly)",
  },
  about:
    "Cloud and DevOps engineer with practical experience in Linux server administration, containerization, and cloud infrastructure management. Hands-on expertise with Oracle Cloud VPS environments, Docker containerization, networking fundamentals, and CI/CD workflows. Focus on infrastructure automation, deployment pipelines, and production system reliability.\n\nWork Approach:\n• Infrastructure-first mindset with focus on reliability and scalability\n• Automation-driven workflows to reduce manual intervention\n• Strong problem-solving skills for system troubleshooting\n• Continuous learning in cloud technologies and DevOps practices",
  experience: [
    {
      title: "Cloud & DevOps Projects (Independent)",
      company: "Self-Employed",
      location: "Remote",
      period: "05/2022 - Present",
      description:
        "Managed Oracle Cloud VPS instances, configured Linux servers, implemented Docker-based deployments, set up CI/CD pipelines, and monitored system performance.",
    },
    {
      title: "Developer",
      company: "Logiting Teknoloji",
      location: "Konya",
      period: "09/2021 - 05/2022",
      description:
        "Developed web applications using .NET Core, collaborated on API integration, and gained foundational understanding of server-side operations.",
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
    Cloud: ["Oracle Cloud (OCI)", "Linux Server", "VPS Management", "Security"],
    DevOps: ["Docker", "GitHub Actions", "Terraform", "Nginx"],
    Backend: ["PostgreSQL", "REST API", ".NET Core"],
    Network: ["TCP/IP", "DNS", "Firewall", "Routing"],
  },
  projects: [
    {
      name: "Infrastructure (OCI)",
      tech: "OCI, Docker, Nginx, PG",
      description: "Production Environment Setup",
      features: [
        "Provisioned OCI VPS",
        "Docker deployment strategy",
        "Nginx reverse proxy + SSL",
        "Auto DB backups",
      ],
    },
    {
      name: "CI/CD Infrastructure",
      tech: "GitHub Actions",
      description: "Automated Deployment Pipelines",
      features: [
        "Multi-env deployment",
        "Auto testing & scanning",
        "Reduced deployment time",
      ],
    },
    {
      name: "Terraform Infra",
      tech: "Terraform",
      description: "IaC for GitHub Repos",
      features: [
        "Repository standardization",
        "In collab with Scrum team",
        "Open Source",
      ],
    },
  ],
  otherProjects: ["github-infra", "Containerized Apps", "Log Management"],
  certifications: [
    { title: "Docker Temelleri", issuer: "BTK Akademi", id: "wmlFJO1z69" },
    { title: "DevOps Sertifikası", issuer: "Optivisdom", id: "#5088da8e..." },
    {
      title: "İleri Ağ Teknolojileri",
      issuer: "BTK Akademi",
      id: "oJpS7GOPxO",
    },
  ],
  languages: [
    { lang: "Turkish", level: "Native" },
    { lang: "English", level: "Intermediate" },
  ],
};

// Yeni: ls çıktısı için dosya boyutları (ls -l benzeri çıktı için)
const fileSizes = {
  "about.txt": "1.4K",
  "experience.txt": "1.8K",
  "education.txt": "800B",
  "skills.txt": "1.2K",
  "projects.txt": "2.5K",
  "certifications.txt": "1.1K",
  "languages.txt": "400B",
  "contact.txt": "500B",
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

// --------------------------------------------------------------------------
// CORE OUTPUT HELPERS
// --------------------------------------------------------------------------

function printOutput(html, cls = "") {
  const line = document.createElement("div");
  line.className = `output-line ${cls}`;
  line.innerHTML = html;
  output.appendChild(line);
  // Kaydırma (scrolling) iyileştirmesi
  terminal.scrollTop = terminal.scrollHeight;
}

function printCommand(cmd) {
  printOutput(`<span class="command-line">${PROMPT} ${cmd}</span>`);
}

// --------------------------------------------------------------------------
// COMMAND DEFINITIONS
// --------------------------------------------------------------------------

const commands = {
  help: () => `
<span class="section-title">Available commands</span>
about       experience    education
skills      projects      certifications
languages   contact       all
clear       github        linkedin
<span class="info">cat [file]</span>  <span class="info">ls</span>            whoami
neofetch    pwd
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

  projects: () => {
    let out = `<span class="section-title">Projects</span>\n`;
    terminalData.projects.forEach((p) => {
      out += `
<span class="success">${p.name}</span> (<span class="dim">${p.tech}</span>)
${p.description}
- ${p.features.join("\n- ")}
`;
    });
    out += `\nOther: <span class="dim">${terminalData.otherProjects.join(
      ", "
    )}</span>`;
    return out;
  },

  contact: () => {
    // Çıktıyı hizalamak için boşlukları kullanarak formatlama
    const email = `Email    : <span class="info">${terminalData.contact.email}</span>`;
    const phone = `Phone    : <span class="info">${terminalData.contact.phone}</span>`;
    const web = `Web      : <span class="info">https://${terminalData.contact.website}</span>`;
    const github = `GitHub   : <span class="info">https://${terminalData.contact.github}</span>`;
    const linkedin = `LinkedIn : <span class="info">https://${terminalData.contact.linkedin}</span>`;

    return `<span class="section-title">Contact</span>\n${email}\n${phone}\n${web}\n${github}\n${linkedin}`;
  },

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
    commands.about() +
    commands.experience() +
    commands.education() +
    commands.skills() +
    commands.projects() +
    commands.contact(),

  clear: () => {
    output.innerHTML = "";
    return "";
  },

  github: () => {
    window.open(`https://${terminalData.contact.github}`, "_blank");
    return "Opening GitHub profile...";
  },

  linkedin: () => {
    window.open(`https://${terminalData.contact.linkedin}`, "_blank");
    return "Opening LinkedIn profile...";
  },

  whoami: () => terminalData.name.toLowerCase().replace(" ", "_"),

  pwd: () => `<span class="info">/home/${commands.whoami()}/resume</span>`,

  ls: () => {
    let out = "";
    const files = Object.keys(fileSizes);

    // Output format: [Size] [File Name]
    files.forEach((file) => {
      // padEnd ile boyut bilgisini hizalıyoruz (mono-boşluklu fontlarda işe yarar)
      out += `<span class="dim">${fileSizes[file].padEnd(
        6,
        " "
      )}</span> <span class="success">${file}</span>\n`;
    });
    return out;
  },

  cat: (args) => {
    if (!args[0]) return "<span class='error'>cat: missing file operand</span>";

    const file = args[0].toLowerCase();

    // Dosya mevcut mu kontrol et
    if (!fileSizes.hasOwnProperty(args[0])) {
      return `<span class='error'>cat: ${args[0]}: No such file or directory</span>`;
    }

    // İstenen dosya adını komut adına çevir
    const cmdName = file.replace(".txt", "").replace(".md", "");

    if (cmdName === "readme") {
      return `
${terminalData.name} - ${terminalData.title}

Type 'help' to explore this terminal resume.
`;
    }

    // İlgili komutun çıktısını al (örn: cat about.txt -> commands.about())
    if (
      commands[cmdName] &&
      [
        "about",
        "experience",
        "education",
        "skills",
        "projects",
        "certifications",
        "languages",
        "contact",
      ].includes(cmdName)
    ) {
      return commands[cmdName]();
    }

    return `<span class='error'>cat: ${args[0]}: Error reading file content</span>`;
  },

  neofetch: () => `
<pre class="ascii-art">
             .ooooo.   <span class="info">OS: Ubuntu (Terminal Resume)</span>
            d88'   '88b  <span class="info">Kernel: .NET Core</span>
            888     888  <span class="info">Shell: bash</span>
            888     888  <span class="info">User: ${terminalData.name}</span>
.o.         888     888  <span class="warn">Focus: Cloud & DevOps</span>
'888b       '8b   d88'   <span class="warn">Lang: Docker, Terraform</span>
 '888b       '8ooooo'    <span class="warn">DB: PostgreSQL, OCI</span>
  '888b                  <span class="warn">Framework: .NET Core</span>
   '888b
    '888b
</pre>
`,
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

  const [cmd, ...args] = cmdLine.split(" ");
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
  // Up Arrow (Tarihçede yukarı)
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
      // İmleci sona taşı
      setTimeout(
        () => (input.selectionStart = input.selectionEnd = input.value.length),
        0
      );
    }
  }
  // Down Arrow (Tarihçede aşağı)
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
      // İmleci sona taşı
      setTimeout(
        () => (input.selectionStart = input.selectionEnd = input.value.length),
        0
      );
    } else if (historyIndex === 0) {
      historyIndex = -1;
      input.value = "";
    }
  }
  // Ctrl + L (Temizleme)
  if (e.ctrlKey && e.key === "l") {
    e.preventDefault();
    commands.clear();
  }
});

// --------------------------------------------------------------------------
// BOOT / WELCOME
// --------------------------------------------------------------------------

window.addEventListener("load", () => {
  printOutput("Last login: tty1");
  printOutput(`Welcome, <span class="info">${terminalData.name}</span>`);
  printOutput("Type '<span class='success'>help</span>' to get started.");
  input.focus();
});

// Keep focus
document.addEventListener("click", () => input.focus());

// Mobil klavye uyumluluğu için
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
        // Klavye açıldığında/kapandığında en alta kaydır
        setTimeout(() => {
            terminal.scrollTop = terminal.scrollHeight;
        }, 100);
    });
}
