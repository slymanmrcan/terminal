// ==========================================================================
// Terminal Resume - Main Logic
// ==========================================================================

// Terminal Data - Kolayca güncellenebilir yapı
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
            description: "Öğrenci Takip Otomasyonu - Kurum içi öğrenci, ders, ödeme ve sınav yönetimi",
            features: [
                "Çok katmanlı mimari ve servis yapıları",
                "EF Core ile ilişkisel veri modeli",
                "Rol-yetki tabanlı erişim kontrol sistemi"
            ]
        },
        {
            name: "BaseLibrary",
            tech: ".NET Core",
            description: "Çekirdek Geliştirme Paketi - Ortak altyapı standartlaştırma kütüphanesi",
            features: [
                "Generic repository + unit of work pattern",
                "Exception middleware ve response modelleri",
                "Ortak DTO ve helper bileşenleri"
            ]
        },
        {
            name: "TaskScheduler.API",
            tech: ".NET Core + PostgreSQL",
            description: "Görev Planlama Servisi - Zamanlanmış görevler için hafif API servisi",
            features: [
                "Minimal API + servis tabanlı yapı",
                "PostgreSQL task-state yönetimi",
                "Background job scheduling"
            ]
        }
    ],
    otherProjects: ["DeviceInfo", "KasaTakip", "github-infra", "PrivFlow"]
};

// Terminal State
let commandHistory = [];
let historyIndex = -1;
const output = document.getElementById('output');
const input = document.getElementById('input');

// Commands Definition
const commands = {
    help: () => {
        return `
<span class="section-title">📋 Kullanılabilir Komutlar</span>

<span class="item">about       Hakkımda bilgi</span>
<span class="item">experience  İş deneyimlerim</span>
<span class="item">education   Eğitim geçmişim</span>
<span class="item">skills      Teknik becerilerim</span>
<span class="item">projects    Projelerim ve detayları</span>
<span class="item">contact     İletişim bilgilerim</span>
<span class="item">all         Tüm bilgileri göster</span>
<span class="item">clear       Ekranı temizle</span>
<span class="item">github      GitHub profilime git</span>
<span class="item">linkedin    LinkedIn profilime git</span>
<span class="item">resume      CV'yi indir (yapım aşamasında)</span>

<span class="muted">💡 İpuçları:</span>
<span class="muted">  • Tab tuşu ile otomatik tamamlama</span>
<span class="muted">  • ↑/↓ ok tuşları ile komut geçmişi</span>
<span class="muted">  • Ctrl+L ile ekranı temizle</span>
        `;
    },

    about: () => {
        return `
<span class="section-title">👨‍💻 ${terminalData.name}</span>
<span class="subsection-title">${terminalData.title}</span>

<span class="info">${terminalData.about}</span>

<span class="muted">📍 ${terminalData.contact.location}</span>
        `;
    },

    experience: () => {
        let result = '<span class="section-title">💼 İş Deneyimi</span>\n';
        
        terminalData.experience.forEach((exp, index) => {
            result += `
<span class="subsection-title">${exp.title} @ ${exp.company}</span>
<span class="muted">${exp.location} | ${exp.period}</span>
<span class="info">${exp.description}</span>
`;
            if (index < terminalData.experience.length - 1) {
                result += '\n';
            }
        });
        
        return result;
    },

    education: () => {
        let result = '<span class="section-title">🎓 Eğitim</span>\n';
        
        terminalData.education.forEach((edu, index) => {
            result += `
<span class="subsection-title">${edu.degree}</span>
<span class="item">${edu.school}</span>
<span class="muted">${edu.period}</span>
`;
            if (index < terminalData.education.length - 1) {
                result += '\n';
            }
        });
        
        return result;
    },

    skills: () => {
        let result = '<span class="section-title">🚀 Teknik Beceriler</span>\n';
        
        for (const [category, items] of Object.entries(terminalData.skills)) {
            result += `\n<span class="subsection-title">${category}:</span>\n`;
            items.forEach(skill => {
                result += `<span class="item">${skill}</span>\n`;
            });
        }
        
        return result;
    },

    projects: () => {
        let result = '<span class="section-title">💻 Projeler</span>\n';
        
        terminalData.projects.forEach((project, index) => {
            result += `
<span class="subsection-title">${project.name}</span>
<span class="muted">[${project.tech}]</span>
<span class="info">${project.description}</span>
`;
            project.features.forEach(feature => {
                result += `<span class="item">${feature}</span>\n`;
            });
            
            if (index < terminalData.projects.length - 1) {
                result += '\n';
            }
        });
        
        result += '\n<span class="subsection-title">Diğer Projeler:</span>\n';
        result += `<span class="muted">${terminalData.otherProjects.join(' • ')}</span>\n`;
        result += '<span class="muted">GitHub: <a href="https://github.com/slymanmrcan" target="_blank">github.com/slymanmrcan</a></span>';
        
        return result;
    },

    contact: () => {
        return `
<span class="section-title">📫 İletişim Bilgileri</span>

<span class="item">Email:    <a href="mailto:${terminalData.contact.email}">${terminalData.contact.email}</a></span>
<span class="item">Telefon:  ${terminalData.contact.phone}</span>
<span class="item">GitHub:   <a href="https://${terminalData.contact.github}" target="_blank">${terminalData.contact.github}</a></span>
<span class="item">LinkedIn: <a href="https://${terminalData.contact.linkedin}" target="_blank">${terminalData.contact.linkedin}</a></span>
<span class="item">Konum:    ${terminalData.contact.location}</span>

<span class="muted">💬 İletişime geçmekten çekinmeyin!</span>
        `;
    },

    all: () => {
        return commands.about() + '\n\n' + 
               commands.experience() + '\n\n' + 
               commands.education() + '\n\n' + 
               commands.skills() + '\n\n' + 
               commands.projects() + '\n\n' + 
               commands.contact();
    },

    clear: () => {
        output.innerHTML = '';
        return '';
    },

    cls: () => commands.clear(),

    github: () => {
        window.open(`https://${terminalData.contact.github}`, '_blank');
        return '<span class="success">✓ GitHub profiline yönlendiriliyorsunuz...</span>';
    },

    linkedin: () => {
        window.open(`https://${terminalData.contact.linkedin}`, '_blank');
        return '<span class="success">✓ LinkedIn profiline yönlendiriliyorsunuz...</span>';
    },

    resume: () => {
        return '<span class="error">⚠️ Bu özellik henüz aktif değil.</span>\n<span class="muted">CV indirme özelliği yakında eklenecek!</span>';
    },

    sudo: (args) => {
        const cmd = args.join(' ');
        return `<span class="error">[sudo] password for suleyman: </span>\n<span class="muted">Nice try! 😄 But this is a resume, not a real terminal.</span>`;
    },

    whoami: () => {
        return `<span class="info">suleyman</span>`;
    },

    date: () => {
        return `<span class="info">${new Date().toString()}</span>`;
    },

    echo: (args) => {
        return `<span class="info">${args.join(' ')}</span>`;
    },

    pwd: () => {
        return `<span class="info">/home/suleyman/resume</span>`;
    },

    ls: () => {
        return `<span class="info">about.txt  experience.txt  education.txt  skills.txt  projects.txt  contact.txt</span>`;
    }
};

// Utility Functions
function printOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = `output-line ${className}`;
    line.innerHTML = text;
    output.appendChild(line);
    scrollToBottom();
}

function printCommand(cmd) {
    const commandLine = `<span class="prompt-symbol">➜</span> <span class="command-line">${cmd}</span>`;
    printOutput(commandLine);
}

function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

function handleCommand(cmdString) {
    cmdString = cmdString.trim();
    
    if (!cmdString) return;

    // Add to history
    if (commandHistory[0] !== cmdString) {
        commandHistory.unshift(cmdString);
    }
    historyIndex = -1;

    // Print command
    printCommand(cmdString);

    // Parse command and arguments
    const parts = cmdString.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    // Execute command
    if (commands[cmd]) {
        const result = commands[cmd](args);
        if (result) {
            printOutput(result);
        }
    } else {
        printOutput(
            `<span class="error">Command not found: "${cmd}"</span>\n<span class="muted">Type 'help' to see available commands.</span>`,
            'error'
        );
    }
}

// Autocomplete Function
function autocomplete(partial) {
    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial.toLowerCase()));
    
    if (matches.length === 1) {
        return matches[0];
    } else if (matches.length > 1) {
        printOutput(`<span class="muted">Possible commands: ${matches.join(', ')}</span>`);
    }
    
    return partial;
}

// Event Listeners
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(input.value);
        input.value = '';
    } 
    else if (e.key === 'Tab') {
        e.preventDefault();
        input.value = autocomplete(input.value);
    } 
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        }
    } 
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            input.value = '';
        }
    }
    else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        commands.clear();
    }
});

// Keep input focused
document.addEventListener('click', () => {
    input.focus();
});

// Welcome Message
function showWelcome() {
    const ascii = `
    ███████╗██╗   ██╗██╗     ███████╗██╗   ██╗███╗   ███╗ █████╗ ███╗   ██╗
    ██╔════╝██║   ██║██║     ██╔════╝╚██╗ ██╔╝████╗ ████║██╔══██╗████╗  ██║
    ███████╗██║   ██║██║     █████╗   ╚████╔╝ ██╔████╔██║███████║██╔██╗ ██║
    ╚════██║██║   ██║██║     ██╔══╝    ╚██╔╝  ██║╚██╔╝██║██╔══██║██║╚██╗██║
    ███████║╚██████╔╝███████╗███████╗   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║
    ╚══════╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
    `;
    
    printOutput(`<pre class="ascii-art">${ascii}</pre>`);
    printOutput(`<span class="section-title">Hoş geldiniz! 👋</span>`);
    printOutput(`<span class="info">${terminalData.name} - ${terminalData.title}</span>`);
    printOutput(`<span class="muted">Terminal tarzı interaktif CV'me hoş geldiniz.</span>`);
    printOutput(`<span class="muted">Başlamak için <span class="success">'help'</span> yazın.</span>\n`);
}

// Initialize
window.addEventListener('load', () => {
    showWel
