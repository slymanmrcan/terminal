export const PROFILE = {
  name: "Suleyman MERCAN",
  contact: {
    phone: "+90 551 952 45 00",
    email: "slymanmrcan@gmail.com",
    github: "github.com/slymanmrcan",
    linkedin: "linkedin.com/in/slymanmrcan",
    website: "slymanmrcan.github.io/terminal",
    location: {
      en: "Turkey",
      tr: "Turkiye",
    },
  },
  assets: {
    pdf: {
      en: "suleymanmercan-en.pdf",
      tr: "suleymanmercan-tr.pdf",
    },
  },
  locales: {
    en: {
      title: " Cloud & DevOps Developer",
      about:
        "Mathematics and Computer Science graduate with hands-on experience in Linux-based server administration, Docker containerization, Oracle Cloud (OCI) VPS infrastructure, and CI/CD pipelines. Experienced in configuring Nginx reverse proxy, domain management, security hardening, secret management, and automation-focused deployment workflows with GitHub Actions. Familiar with backend API development and service deployment using Go. Focused on building reliable, scalable, and maintainable infrastructure to improve system stability.",
      experience: [
        {
          title: "Cloud & DevOps Learning Projects (Independent)",
          company: "Self-Employed",
          location: "Remote",
          period: "05/2022 - Present",
          description:
            "Provisioned and hardened OCI VPS environments (SSH, firewall, Fail2ban), deployed containerized applications using Docker Compose, configured automated build/deployment pipelines with GitHub Actions, routed multiple applications through a single Nginx reverse proxy with SSL, and performed performance analysis/troubleshooting in production environments.",
        },
        {
          title: "Developer",
          company: "Logiting Technology",
          location: "Konya",
          period: "09/2021 - 05/2022",
          description:
            "Developed Web API and MVC projects with .NET Core, built responsive frontend applications with React, and gained hands-on server environment experience through API integration and application deployment.",
        },
      ],
      education: [
        {
          degree: "BSc Mathematics & Computer Science",
          school: "Necmettin Erbakan University",
          period: "2018 - 2021",
        },
        {
          degree: "Associate Degree, Computer Programming",
          school: "Konya Technical University",
          period: "2015 - 2018",
        },
      ],
      skills: [
        {
          title: "Cloud & Server Management",
          items: [
            "Oracle Cloud (OCI): VPS provisioning, management, configuration",
            "AWS: EC2 instance management, IAM policies, S3 object storage",
            "Cloudflare: DNS, Serverless, R2 Storage",
            "Linux: Ubuntu/Debian admin, hardening, firewall, SSH, Fail2ban",
            "Networking: TCP/IP, DNS, Subnetting, Routing, troubleshooting",
          ],
        },
        {
          title: "DevOps & Automation",
          items: [
            "Docker: containerized deployments with Docker Compose",
            "CI/CD: GitHub Actions build/deploy automation, PR validation",
            "Web Server: Nginx reverse proxy, SSL/TLS with Certbot",
            "IaC & Monitoring: Terraform, Prometheus, Grafana",
          ],
        },
        {
          title: "Application & Database",
          items: [
            "PostgreSQL: management, backup, restore",
            "Go: REST API development and deployment",
          ],
        },
      ],
      projects: [
        {
          name: "Terraform GitHub Organization Manager (Open Source)",
          slug: "github-infra",
          tech: "Terraform, GitHub Actions, GitHub API",
          description:
            "Manages GitHub organization repositories, teams, permissions, and members through Terraform IaC.",
          link: "https://github.com/Bilgisayar-Kavramlari-Toplulugu/github-infra",
          features: [
            "Project definitions via terraform.tfvars with automated repository provisioning",
            "Standardized documentation and access control templates",
            "CI/CD automation for formatting checks and Terraform plan validation",
          ],
        },
        {
          name: "VPS Hardening & Monitoring Lab (Open Source Docs)",
          slug: "server-guide",
          tech: "Linux, Docker, Nginx, Prometheus, Grafana",
          description:
            "Comprehensive server lifecycle handbook: OS setup, hardening, Docker, Nginx, monitoring, and cloud operations.",
          link: "https://suleymanmrcn.github.io/server-guide/",
          features: [
            "15-layer defense strategy and kernel tuning notes",
            "Nginx hardening and minimal Docker image practices",
            "Emergency runbooks and reusable recipes for Go + PostgreSQL on OCI",
          ],
        },
        {
          name: "RSS Aggregator Service (Go)",
          slug: "techfeed",
          tech: "Go, Docker Compose, Nginx, OCI VPS",
          description:
            "Backend service that fetches, parses, and serves RSS feeds with title-based filtering.",
          link: "https://techfeed.is-app.com",
          features: [
            "Feed ingestion, parsing, and filtering pipeline",
            "Production deployment on OCI VPS with Docker Compose",
            "Nginx reverse proxy and SSL termination via Certbot",
          ],
        },
      ],
      otherProjects: [
        "domain management",
        "secret management",
        "automation-focused deployment workflows",
      ],
      certifications: [
        { title: "Docker Fundamentals", issuer: "BTK Academy", id: "wmlFJO1z69" },
        {
          title: "DevOps Certificate",
          issuer: "Optivisdom",
          id: "#5088da8e41852483",
        },
        { title: "Advanced Network Technologies", issuer: "BTK Academy", id: "oJpS7GOPxO" },
      ],
      languages: [
        { lang: "Turkish", level: "Native" },
        { lang: "English", level: "A2 (Technical documentation and communication)" },
      ],
      resumeHighlights: [
        "Linux-based server administration on OCI VPS (hardening + operations)",
        "Docker Compose deployments with Nginx reverse proxy and SSL",
        "CI/CD automation with GitHub Actions for build/deploy and validation",
        "Terraform-based GitHub organization infrastructure management",
        "Go REST APIs with PostgreSQL backup/restore workflows",
        'Philosophy: "Manual is Error" (automation-first mindset)',
      ],
      stack: [
        {
          title: "Cloud & Server Management",
          items: [
            "OCI VPS provisioning, management, and security hardening",
            "AWS (EC2, IAM, S3) and Cloudflare (DNS, Serverless, R2)",
            "Linux administration on Ubuntu/Debian + networking troubleshooting",
          ],
        },
        {
          title: "DevOps & Automation",
          items: [
            "Docker Compose deployments and image optimization",
            "GitHub Actions pipelines for CI/CD and PR policy checks",
            "Nginx reverse proxy and SSL/TLS operations with Certbot",
            "Terraform IaC with Prometheus and Grafana monitoring",
          ],
        },
        {
          title: "Application & Database",
          items: [
            "Go service development and REST API delivery",
            "PostgreSQL management, backup, and restore procedures",
            "Secret management and maintainable deployment design",
          ],
        },
      ],
      neofetch: {
        focus: "Focus",
        stack: "Stack",
        cloud: "Cloud",
      },
      searchSections: {
        about: "about",
        skills: "skills",
        projects: "projects",
      },
      funFortunes: [
        "Ship small, ship often.",
        "Good infra is invisible until it fails.",
        "Automate the boring path first.",
        "Logs are stories waiting to be read.",
      ],
    },
    tr: {
      title: " Cloud & DevOps Developer",
      about:
        "Matematik ve Bilgisayar Bilimleri mezunu; Linux tabanli sunucu yonetimi, Docker containerization, Oracle Cloud (OCI) VPS altyapisi ve CI/CD pipeline'larinda uygulamali deneyime sahip. Nginx reverse proxy, domain yonetimi, guvenlik sertlestirme, secret management ve GitHub Actions ile otomasyon odakli deployment sureclerinde deneyimli. Go ile backend API gelistirme ve servis yayina alma konularina hakim. Hedefi guvenilir, olceklenebilir ve bakimi kolay altyapilar kurarak sistem kararliligini artirmak.",
      experience: [
        {
          title: "Cloud & DevOps Ogrenme Projeleri (Bagimsiz)",
          company: "Freelance",
          location: "Remote",
          period: "05/2022 - Guncel",
          description:
            "OCI VPS ortamlari kurup sertlestirdim (SSH, firewall, Fail2ban), Docker Compose ile container uygulamalar deploy ettim, GitHub Actions ile build/deploy otomasyonu tasarladim, birden fazla uygulamayi Nginx reverse proxy + SSL ile yonettim ve production performans/troubleshooting calismalari yaptim.",
        },
        {
          title: "Yazilim Gelistirici",
          company: "Logiting Technology",
          location: "Konya",
          period: "09/2021 - 05/2022",
          description:
            ".NET Core ile Web API ve MVC projeleri gelistirdim, React ile responsive arayuzler olusturdum; API entegrasyonu ve deployment sureclerinde server-side deneyim kazandim.",
        },
      ],
      education: [
        {
          degree: "Lisans, Matematik & Bilgisayar Bilimleri",
          school: "Necmettin Erbakan Universitesi",
          period: "2018 - 2021",
        },
        {
          degree: "Onlisans, Bilgisayar Programciligi",
          school: "Konya Teknik Universitesi",
          period: "2015 - 2018",
        },
      ],
      skills: [
        {
          title: "Cloud & Sunucu Yonetimi",
          items: [
            "Oracle Cloud (OCI): VPS provisioning, yonetim, konfig",
            "AWS: EC2, IAM policy, S3 object storage",
            "Cloudflare: DNS, Serverless, R2 Storage",
            "Linux: Ubuntu/Debian admin, hardening, firewall, SSH, Fail2ban",
            "Network: TCP/IP, DNS, Subnetting, Routing, baglanti troubleshooting",
          ],
        },
        {
          title: "DevOps & Otomasyon",
          items: [
            "Docker: Docker Compose ile container deployment",
            "CI/CD: GitHub Actions ile build/deploy otomasyonu, PR validation",
            "Web Server: Nginx reverse proxy, Certbot ile SSL/TLS",
            "IaC & Monitoring: Terraform, Prometheus, Grafana",
          ],
        },
        {
          title: "Uygulama & Veritabani",
          items: [
            "PostgreSQL: yonetim, backup, restore",
            "Go: REST API gelistirme ve deployment",
          ],
        },
      ],
      projects: [
        {
          name: "Terraform GitHub Organization Manager (Open Source)",
          slug: "github-infra",
          tech: "Terraform, GitHub Actions, GitHub API",
          description:
            "GitHub organization repository, team, permission ve uye yonetimini Terraform IaC ile uctan uca yonetir.",
          link: "https://github.com/Bilgisayar-Kavramlari-Toplulugu/github-infra",
          features: [
            "terraform.tfvars ile proje tanimi ve otomatik repository provisioning",
            "Standart dokumantasyon ve erisim kontrol kaliplari",
            "Formatting kontrolleri ve Terraform plan validation icin CI/CD",
          ],
        },
        {
          name: "VPS Hardening & Monitoring Lab (Open Source Docs)",
          slug: "server-guide",
          tech: "Linux, Docker, Nginx, Prometheus, Grafana",
          description:
            "OS kurulumu, guvenlik sertlestirme, Docker, Nginx, monitoring ve cloud operasyonlarini kapsayan yasayan sunucu rehberi.",
          link: "https://suleymanmrcn.github.io/server-guide/",
          features: [
            "15 katmanli savunma yaklasimi ve kernel tuning notlari",
            "Nginx hardening ve minimal Docker image pratikleri",
            "OCI uzerinde Go + PostgreSQL icin acil durum runbook ve tekrar kullanilabilir tarifler",
          ],
        },
        {
          name: "RSS Aggregator Service (Go)",
          slug: "techfeed",
          tech: "Go, Docker Compose, Nginx, OCI VPS",
          description:
            "RSS feed'lerini toplayip parse eden ve baslik bazli filtreleme ile servis eden backend servis.",
          link: "https://techfeed.is-app.com",
          features: [
            "Feed ingestion, parsing ve filtreleme akis yapisi",
            "OCI VPS uzerinde Docker Compose ile production deployment",
            "Nginx reverse proxy ve Certbot ile SSL termination",
          ],
        },
      ],
      otherProjects: [
        "domain yonetimi",
        "secret management",
        "otomasyon odakli deployment surecleri",
      ],
      certifications: [
        { title: "Docker Temelleri", issuer: "BTK Academy", id: "wmlFJO1z69" },
        {
          title: "DevOps Sertifikasi",
          issuer: "Optivisdom",
          id: "#5088da8e41852483",
        },
        { title: "Ileri Ag Teknolojileri", issuer: "BTK Academy", id: "oJpS7GOPxO" },
      ],
      languages: [
        { lang: "Turkce", level: "Ana Dil" },
        { lang: "Ingilizce", level: "A2 (Teknik dokumantasyon ve iletisim)" },
      ],
      resumeHighlights: [
        "OCI VPS uzerinde Linux sunucu yonetimi (hardening + operasyon)",
        "Docker Compose deployment, Nginx reverse proxy ve SSL",
        "GitHub Actions ile CI/CD build/deploy ve dogrulama surecleri",
        "Terraform tabanli GitHub organization altyapi yonetimi",
        "Go REST API servisleri ve PostgreSQL backup/restore operasyonlari",
        'Felsefe: "Manual is Error" (otomasyon-oncelikli yaklasim)',
      ],
      stack: [
        {
          title: "Cloud & Sunucu Yonetimi",
          items: [
            "OCI VPS kurulumu, yonetim ve guvenlik sertlestirme",
            "AWS (EC2, IAM, S3) ve Cloudflare (DNS, Serverless, R2)",
            "Ubuntu/Debian Linux admin ve network troubleshooting",
          ],
        },
        {
          title: "DevOps & Otomasyon",
          items: [
            "Docker Compose deployment ve image optimizasyonu",
            "GitHub Actions ile CI/CD pipeline ve PR policy kontrolleri",
            "Nginx reverse proxy ve Certbot ile SSL/TLS operasyonu",
            "Terraform IaC ile Prometheus/Grafana monitoring",
          ],
        },
        {
          title: "Uygulama & Veritabani",
          items: [
            "Go servis gelistirme ve REST API yayinlama",
            "PostgreSQL yonetimi, backup ve restore surecleri",
            "Secret management ve bakimi kolay deployment tasarimi",
          ],
        },
      ],
      neofetch: {
        focus: "Odak",
        stack: "Yigin",
        cloud: "Cloud",
      },
      searchSections: {
        about: "hakkinda",
        skills: "yetenekler",
        projects: "projeler",
      },
      funFortunes: [
        "Kucuk ama surekli delivery kazanir.",
        "Iyi altyapi, sorun cikana kadar gorunmezdir.",
        "Once tekrarlanan isi otomatiklestir.",
        "Log'lar uretilmis hikayelerdir.",
      ],
    },
  },
};

export const FILE_ENTRIES = [
  { name: "about.txt", size: "1.4K", command: "about" },
  { name: "experience.txt", size: "1.8K", command: "experience" },
  { name: "education.txt", size: "800B", command: "education" },
  { name: "skills.txt", size: "1.2K", command: "skills" },
  { name: "projects.txt", size: "2.5K", command: "projects" },
  { name: "certifications.txt", size: "1.1K", command: "certifications" },
  { name: "languages.txt", size: "400B", command: "languages" },
  { name: "contact.txt", size: "500B", command: "contact" },
  { name: "resume.txt", size: "900B", command: "resume" },
  { name: "stack.txt", size: "700B", command: "stack" },
  { name: "links.txt", size: "450B", command: "links" },
  { name: "README.md", size: "350B", command: "readme" },
  { name: "suleymanmercan-en.pdf", size: "73K", command: "cv-en" },
  { name: "suleymanmercan-tr.pdf", size: "75K", command: "cv-tr" },
];
