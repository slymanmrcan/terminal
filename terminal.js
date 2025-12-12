
const terminalData = {
    name: "Süleyman MERCAN",
    title: "Backend Developer",
    contact: {
        phone: "+90 551 952 45 00",
        email: "slymanmrcan@gmail.com",
        github: "github.com/slymanmrcan",
        linkedin: "linkedin.com/in/slymanmrcan",
        location: "Konya, Türkiye"
    },
    about: "REST API, veri erişimi ve kurumsal backend mimarileri üzerinde çalışan bir geliştiriciyim. .NET Core ekosistemine odaklanıyor; temiz kod, katmanlı yapı ve performans odaklı API geliştirme alanlarında kendimi geliştirmeye devam ediyorum.",
    experience: [
        {
            title: "Yazılım Geliştirici",
            company: "Logiting Teknoloji",
            location: "Konya",
            period: "09/2021 - 05/2022",
            description: "Backend geliştirme, API tasarımı, veri modeli oluşturma ve yazılım süreçlerinin iyileştirilmesi."
        },
        {
            title: "Stajyer",
            company: "Karayolları Genel Müdürlüğü",
            location: "Konya",
            period: "01/2019 - 02/2019",
            description: "Network altyapısı ve donanım destek süreçlerinde görev aldım."
        }
    ],
    education: [
        {
            degree: "Matematik Bilgisayar Bilimleri",
            school: "Necmettin Erbakan Üniversitesi",
            period: "2018 - 2021"
        },
        {
            degree: "Bilgisayar Programcılığı",
            school: "Karatay Üniversitesi",
            period: "2015 - 2018"
        }
    ],
    skills: {
        "Backend": [".NET Core", "ASP.NET", "REST API", "Katmanlı Mimari"],
        "ORM": ["EF Core", "LINQ", "Dapper"],
        "Database": ["SQL Server", "PostgreSQL"],
        "DevOps": ["Git", "GitHub Actions", "CI/CD", "Docker"],
        "UI": ["HTML", "CSS", "JavaScript", "Responsive Design"],
        "Prensipler": ["SOLID", "Clean Architecture", "Design Patterns"]
    },
    projects: [
        {
            name: "eduCenter",
            tech: ".NET Core",
            description: "Öğrenci Takip Otomasyonu",
            features: [
                "Çok katmanlı mimari",
                "EF Core veri modeli",
                "Rol-yetki bazlı erişim"
            ]
        },
        {
            name: "BaseLibrary",
            tech: ".NET Core",
            description: "Ortak altyapı kütüphanesi",
            features: [
                "Generic repository",
                "Exception middleware",
                "DTO standartları"
            ]
        },
        {
            name: "TaskScheduler.API",
            tech: ".NET Core + PostgreSQL",
            description: "Görev planlama servisi",
            features: [
                "Minimal API",
                "Background jobs",
                "Task-state yönetimi"
            ]
        }
    ],
    otherProjects: ["DeviceInfo", "KasaTakip", "github-infra", "PrivFlow"]
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
    terminal.scrollTop = terminal.scrollHeight;
}

function printCommand(cmd) {
    printOutput(`<span class="command-line">${PROMPT} ${cmd}</span>`);
}

// --------------------------------------------------------------------------
// COMMAND DEFINITIONS (AYNI İÇERİK)
// --------------------------------------------------------------------------

const commands = {

    help: () => `
<span class="section-title">Available commands</span>
about       experience   education
skills      projects     contact
all         clear
github      linkedin
whoami     neofetch
pwd         ls            cat
`,

    about: () => `
<span class="section-title">${terminalData.name}</span>
<span class="info">${terminalData.title}</span>
<span class="info-label">${terminalData.contact.location}</span>

${terminalData.about}
`,

    experience: () => {
        let out = `<span class="section-title">Experience</span>\n`;
        terminalData.experience.forEach(e => {
            out += `
<span class="success">${e.title}</span> @ <span class="info">${e.company}</span>
<span class="info-label">${e.location} | ${e.period}</span>
${e.description}
`;
        });
        return out;
    },

    education: () => {
        let out = `<span class="section-title">Education</span>\n`;
        terminalData.education.forEach(e => {
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
        terminalData.projects.forEach(p => {
            out += `
<span class="success">${p.name}</span> (${p.tech})
${p.description}
- ${p.features.join("\n- ")}
`;
        });
        out += `\nOther: ${terminalData.otherProjects.join(", ")}`;
        return out;
    },

    contact: () => `
<span class="section-title">Contact</span>
Email    : ${terminalData.contact.email}
Phone    : ${terminalData.contact.phone}
GitHub   : https://${terminalData.contact.github}
LinkedIn : https://${terminalData.contact.linkedin}
`,

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

    whoami: () =>
        terminalData.name.toLowerCase().replace(" ", "_"),

    pwd: () =>
        `/home/suleyman/resume`,

    ls: () =>
        `about.txt  experience.txt  education.txt  skills.txt  projects.txt  contact.txt  README.md`,

    cat: (args) => {
        if (!args[0]) return "cat: missing file operand";
        if (args[0] === "README.md") {
            return `
${terminalData.name} - ${terminalData.title}

Type 'help' to explore this terminal resume.
`;
        }
        return `cat: ${args[0]}: No such file`;
    },

    neofetch: () => `
<pre class="ascii-art">
OS: Ubuntu (terminal CV)
Kernel: .NET Core
Shell: bash
User: ${terminalData.name}
</pre>
`
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
        printOutput(`bash: ${cmd}: command not found`, "error");
        return;
    }

    const result = fn(args);
    if (result) printOutput(result);
}

// --------------------------------------------------------------------------
// INPUT EVENTS
// --------------------------------------------------------------------------

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        handleCommand(input.value);
        input.value = "";
    }
    if (e.key === "ArrowUp") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        }
    }
    if (e.key === "ArrowDown") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            input.value = "";
        }
    }
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
    printOutput(`Welcome, ${terminalData.name}`);
    printOutput("Type 'help' to get started.");
    input.focus();
});

// Keep focus
document.addEventListener("click", () => input.focus());
