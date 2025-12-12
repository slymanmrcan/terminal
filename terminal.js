// ==========================================================================
// Terminal Resume - Main Logic
// Süleyman MERCAN - Backend Developer
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
<span class="section-title">═══ Available Commands ═══</span>

<span class="badge">about</span>       Hakkımda bilgi
<span class="badge">experience</span>  İş deneyimlerim
<span class="badge">education</span>   Eğitim geçmişim
<span class="badge">skills</span>      Teknik becerilerim
<span class="badge">projects</span>    Projelerim ve detayları
<span class="badge">contact</span>     İletişim bilgilerim
<span class="badge">all</span>         Tüm bilgileri göster
<span class="badge">clear</span>       Ekranı temizle (Ctrl+L)
<span class="badge">github</span>      GitHub profilime git
<span class="badge">linkedin</span>    LinkedIn profilime git

<div class="hint">💡 <strong>İpuçları:</strong>
  • <kbd>Tab</kbd> tuşu ile otomatik tamamlama
  • <kbd>↑</kbd> <kbd>↓</kbd> ok tuşları ile komut geçmişi
  • <kbd>Ctrl+L</kbd> ile ekranı temizle</div>
        `;
    },

    about: () => {
        return `
<span class="section-title">═══ ${terminalData.name} ═══</span>

<div class="info-grid">
  <span class="info-label">Pozisyon:</span>
  <span class="info-value success">${terminalData.title}</span>
  
  <span class="info-label">Lokasyon:</span>
  <span class="info-value">${terminalData.contact.location}</span>
</div>

<div class="separator"></div>

${terminalData.about}
        `;
    },

    experience: () => {
        let result = '<span class="section-title">═══ İş Deneyimi ═══</span>\n\n';
        
        terminalData.experience.forEach((exp, index) => {
            result += `<span class="success">▸ ${exp.title}</span> @ <span class="info">${exp.company}</span>\n`;
            result += `  <span class="info-label">${exp.location} | ${exp.period}</span>\n`;
            result += `  ${exp.description}\n`;
            
            if (index < terminalData.experience.length - 1) {
                result += '\n<div class="separator"></div>\n';
            }
        });
        
        return result;
    },

    education: () => {
        let result = '<span class="section-title">═══ Eğitim ═══</span>\n\n';
        
        terminalData.education.forEach((edu, index) => {
            result += `<span class="success">▸ ${edu.degree}</span>\n`;
            result += `  <span class="info">${edu.school}</span>\n`;
            result += `  <span class="info-label">${edu.period}</span>\n`;
            
            if (index < terminalData.education.length - 1) {
                result += '\n';
            }
        });
        
        return result;
    },

    skills: () => {
        let result = '<span class="section-title">═══ Teknik Beceriler ═══</span>\n\n';
        
        for (const [category, items] of Object.entries(terminalData.skills)) {
            result += `<span class="warning">◆ ${category}:</span>\n`;
            result += '  ';
            items.forEach(skill => {
                result += `<span class="badge">${skill}</span>`;
            });
            result += '\n\n';
        }
        
        return result;
    },

    projects: () => {
        let result = '<span class="section-title">═══ Projeler ═══</span>\n\n';
        
        terminalData.projects.forEach((project, index) => {
            result += `<span class="success">▸ ${project.name}</span> <span class="badge">${project.tech}</span>\n`;
            result += `  <span class="info">${project.description}</span>\n\n`;
            
            project.features.forEach(feature => {
                result += `  <span class="info-label">•</span> ${feature}\n`;
            });
            
            if (index < terminalData.projects.length - 1) {
                result += '\n<div class="separator"></div>\n';
            }
        });
        
        result += '\n<span class="section-title">═══ Diğer Projeler ═══</span>\n';
        terminalData.otherProjects.forEach(proj => {
            result += `<span class="badge">${proj}</span>`;
        });
        result += '\n\n<div class="hint">🔗 Tüm projelere GitHub üzerinden erişebilirsiniz: <a href="https://github.com/slymanmrcan" class="link" target="_blank">github.com/slymanmrcan</a></div>';
        
        return result;
    },

    contact: () => {
        return `
<span class="section-title">═══ İletişim ═══</span>

<div class="info-grid">
  <span class="info-label">Email:</span>
  <span class="info-value"><a href="mailto:${terminalData.contact.email}" class="link">${terminalData.contact.email}</a></span>
  
  <span class="info-label">Telefon:</span>
  <span class="info-value">${terminalData.contact.phone}</span>
  
  <span class="info-label">GitHub:</span>
  <span class="info-value"><a href="https://${terminalData.contact.github}" class="link" target="_blank">${terminalData.contact.github}</a></span>
  
  <span class="info-label">LinkedIn:</span>
  <span class="info-value"><a href="https://${terminalData.contact.linkedin}" class="link" target="_blank">${terminalData.contact.linkedin}</a></span>
  
  <span class="info-label">Konum:</span>
  <span class="info-value">${terminalData.contact.location}</span>
</div>

<div class="hint">💬 İletişime geçmekten çekinmeyin!</div>
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

    // Easter eggs
    whoami: () => {
        return `<span class="info">${terminalData.name.toLowerCase().replace(' ', '_')}</span>`;
    },

    date: () => {
        const now = new Date();
        return `<span class="info">${now.toLocaleString('tr-TR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}</span>`;
    },

    echo: (args) => {
        return `<span class="info">${args.join(' ')}</span>`;
    },

    pwd: () => {
        return `<span class="info">/home/${terminalData.name.toLowerCase().split(' ')[0]}/resume</span>`;
    },

    ls: () => {
        return `<span class="info">about.txt  experience.txt  education.txt  skills.txt  projects.txt  contact.txt  README.md</span>`;
    },

    cat: (args) => {
        const file = args[0];
        if (!file) {
            return '<span class="error">cat: missing file operand</span>\n<span class="info-label">Try: cat README.md</span>';
        }
        if (file === 'README.md') {
            return `<span class="section-title">═══ README.md ═══</span>

# ${terminalData.name} - ${terminalData.title}

Bu interaktif terminal CV'dir. Keşfetmek için aşağıdaki komutları kullanabilirsiniz:

\`\`\`bash
help        # Tüm komutları göster
about       # Hakkımda
experience  # İş deneyimlerim
skills      # Teknik becerilerim
projects    # Projelerim
contact     # İletişim bilgilerim
\`\`\`

🚀 Yetenekler: .NET Core | REST API | Clean Architecture | Docker
`;
        }
        return `<span class="error">cat: ${file}: No such file or directory</span>`;
    },

    sudo: (args) => {
        return `<span class="error">[sudo] password for ${terminalData.name.toLowerCase().split(' ')[0]}: </span>
<span class="warning">Nice try! 😄 But this is a resume, not a real terminal.</span>
<span class="info-label">However, you can still explore my skills with 'help' command.</span>`;
    },

    neofetch: () => {
        return `<pre class="ascii-art">
       _,met$$$$$gg.          ${terminalData.name}
    ,g$$$$$$$$$$$$$$$P.       ─────────────────────────
  ,g$$P"     """Y$$.".        <span class="info-label">OS:</span> Ubuntu Terminal CV
 ,$$P'              \`$$$.     <span class="info-label">Host:</span> Portfolio v2.0
',$$P       ,ggs.     \`$$b:   <span class="info-label">Kernel:</span> .NET Core 8.0
\`d$$'     ,$P"'   .    $$$    <span class="info-label">Uptime:</span> ${terminalData.experience[0].period}
 $$P      d$'     ,    $$P    <span class="info-label">Shell:</span> bash 5.1.16
 $$:      $$.   -    ,d$$'    <span class="info-label">Skills:</span> Backend, DevOps, UI
 $$;      Y$b._   _,d$P'      <span class="info-label">Languages:</span> C#, JavaScript, SQL
 Y$$.    \`.\`"Y$$$$P"'         <span class="info-label">Contact:</span> ${terminalData.contact.email}
 \`$$b      "-.__              
  \`Y$$                        Type 'help' for available commands
   \`Y$$.                      
     \`$$b.                    
       \`Y$$b.
          \`"Y$b._
              \`"""
</pre>`;
    },

    banner: () => {
        return showWelcome();
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
    const commandLine = `<span class="command-line">$ ${cmd}</span>`;
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
        if (commandHistory.length > 50) {
            commandHistory.pop();
        }
    }
    historyIndex = -1;

    // Print command
    printCommand(cmdString);

    // Parse command and arguments
    const parts = cmdString.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute command
    if (commands[cmd]) {
        const result = commands[cmd](args);
        if (result) {
            printOutput(result);
        }
    } else {
        printOutput(
            `<span class="error">bash: ${cmd}: command not found</span>\n<span class="hint">Type '<span class="success">help</span>' to see available commands.</span>`,
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
        printOutput(`\n<span class="info-label"># Possible commands:</span>`);
        matches.forEach(match => {
            printOutput(`<span class="suggestion">${match}</span>`, 'suggestion');
        });
        printOutput(''); // Empty line
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
        const completed = autocomplete(input.value);
        input.value = completed;
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
    else if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        input.value = '';
        printOutput('<span class="error">^C</span>');
    }
});

// Keep input focused
document.addEventListener('click', () => {
    input.focus();
});

// Welcome Message
function showWelcome() {
    const ascii = `
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║   ███████╗██╗   ██╗██╗     ███████╗██╗   ██╗███╗   ███╗ █████╗ ███╗║
║   ██╔════╝██║   ██║██║     ██╔════╝╚██╗ ██╔╝████╗ ████║██╔══██╗████║
║   ███████╗██║   ██║██║     █████╗   ╚████╔╝ ██╔████╔██║███████║██╔█║
║   ╚════██║██║   ██║██║     ██╔══╝    ╚██╔╝  ██║╚██╔╝██║██╔══██║██║╚║
║   ███████║╚██████╔╝███████╗███████╗   ██║   ██║ ╚═╝ ██║██║  ██║██║ ║
║   ╚══════╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝ ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
`;
    
    const welcome = `
<pre class="ascii-art">${ascii}</pre>

<span class="success">█ Welcome to ${terminalData.name}'s Interactive Terminal Resume</span>
<span class="info">█ ${terminalData.title} | ${terminalData.contact.location}</span>

<div class="separator"></div>

<span class="info-label"># System Information</span>
<span class="info-label">└─ Version:</span> <span class="success">2.0.0</span>
<span class="info-label">└─ Stack:</span> <span class="badge">.NET Core</span> <span class="badge">REST API</span> <span class="badge">Clean Architecture</span>
<span class="info-label">└─ Contact:</span> <a href="mailto:${terminalData.contact.email}" class="link">${terminalData.contact.email}</a>

<div class="hint">💡 Type '<span class="success">help</span>' to see available commands or '<span class="success">all</span>' to display everything.</div>
`;
    
    return welcome;
}

// Initialize
window.addEventListener('load', () => {
    printOutput(showWelcome());
    input.focus();
    
    // Easter egg: Matrix effect on title
    const title = document.querySelector('.terminal-title');
    if (title) {
        setInterval(() => {
            const chars = '01';
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            title.style.opacity = Math.random() > 0.95 ? '0.5' : '1';
        }, 100);
    }
});

// Prevent right-click context menu for immersion
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName !== 'A') {
        e.preventDefault();
    }
});
