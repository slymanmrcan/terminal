import { copyToClipboard } from "../clipboard.js";
import { PROFILE } from "../data.js";
import { SUPPORTED_LOCALES } from "../i18n.js";
import {
  createSnippet,
  escapeHtml,
  highlightKeyword,
  normalizeKey,
  openUrl,
  triggerDownload,
} from "../utils.js";

export function createNavigationCommands(ctx) {
  const { state, getStrings, getProfile } = ctx;

  return {
    project: (args) => {
      const strings = getStrings();
      const profile = getProfile();
      const idx = Number.parseInt(args[0], 10);

      if (!idx || idx < 1 || idx > profile.projects.length) {
        return strings.usage.project;
      }

      const project = profile.projects[idx - 1];
      openUrl(project.link);
      return strings.messages.projectOpening(project.name);
    },

    repo: (args) => {
      const strings = getStrings();
      const profile = getProfile();
      const slug = normalizeKey(args[0]);

      if (!slug) return strings.usage.repo;

      const project = profile.projects.find((item) => normalizeKey(item.slug) === slug);
      if (!project) return strings.messages.repoNotFound(escapeHtml(args[0] || ""));

      openUrl(project.link);
      return strings.messages.repoOpening(project.slug);
    },

    open: (args) => {
      const strings = getStrings();
      const target = normalizeKey(args[0]);

      if (!target) return strings.usage.open;

      if (target === "github") {
        openUrl(`https://${PROFILE.contact.github}`);
        return strings.messages.githubOpening;
      }
      if (target === "linkedin") {
        openUrl(`https://${PROFILE.contact.linkedin}`);
        return strings.messages.linkedinOpening;
      }
      if (target === "web" || target === "website") {
        openUrl(`https://${PROFILE.contact.website}`);
        return strings.messages.websiteOpening;
      }
      if (target === "mail" || target === "email") {
        openUrl(`mailto:${PROFILE.contact.email}`);
        return strings.messages.mailOpening;
      }

      return strings.messages.openUnknown(escapeHtml(args[0] || ""));
    },

    github: () => {
      const strings = getStrings();
      openUrl(`https://${PROFILE.contact.github}`);
      return strings.messages.githubOpening;
    },

    linkedin: () => {
      const strings = getStrings();
      openUrl(`https://${PROFILE.contact.linkedin}`);
      return strings.messages.linkedinOpening;
    },

    cv: (args) => {
      const strings = getStrings();
      const normalizedArgs = args.map((item) => normalizeKey(item)).filter(Boolean);
      const hasPdfFlag = normalizedArgs.includes("--pdf");
      const hasDownloadFlag = normalizedArgs.includes("--download") || normalizedArgs.includes("-d");
      const requestedLang = normalizedArgs.find((item) => SUPPORTED_LOCALES.includes(item));
      const selectedLang = requestedLang || state.locale;

      const invalidFlag = normalizedArgs.find(
        (item) => !SUPPORTED_LOCALES.includes(item) && item !== "--pdf" && item !== "--download" && item !== "-d"
      );
      if (invalidFlag) return strings.usage.cv;

      const pdfFile = PROFILE.assets.pdf[selectedLang];
      if (!pdfFile) return strings.messages.cvMissing;

      if (hasDownloadFlag) {
        triggerDownload(pdfFile, `suleyman-mercan-cv-${selectedLang}.pdf`);
        return strings.messages.cvDownloading(selectedLang);
      }

      if (!normalizedArgs.length || hasPdfFlag || requestedLang) {
        openUrl(pdfFile);
        return `${strings.messages.cvOpening(selectedLang)}\n${strings.ui.pdfHint}`;
      }

      return strings.usage.cv;
    },

    download: (args) => {
      const allArgs = [...args, "--download"];
      return ctx.invoke("cv", allArgs);
    },

    search: (args) => {
      const strings = getStrings();
      const profile = getProfile();
      const query = args.join(" ").trim();
      if (!query) return strings.usage.search;

      const lowerQuery = query.toLowerCase();
      const searchRecords = [];

      searchRecords.push({
        section: profile.searchSections.about,
        text: profile.about,
      });

      profile.skills.forEach((group) => {
        searchRecords.push({
          section: profile.searchSections.skills,
          text: `${group.title}: ${group.items.join(", ")}`,
        });
      });

      profile.projects.forEach((project) => {
        searchRecords.push({
          section: profile.searchSections.projects,
          text: `${project.name} ${project.tech} ${project.description} ${project.features.join(" ")}`,
        });
      });

      const matches = searchRecords
        .filter((record) => record.text.toLowerCase().includes(lowerQuery))
        .slice(0, 8);

      if (!matches.length) {
        return strings.ui.noMatches(escapeHtml(query));
      }

      let out = `<span class=\"section-title\">${strings.ui.searchTitle(escapeHtml(query))}</span>\n`;
      matches.forEach((match, index) => {
        const snippet = createSnippet(match.text, query);
        out += `${index + 1}. <span class=\"info\">${escapeHtml(match.section)}</span> ${strings.labels.searchIn} ${highlightKeyword(snippet, query)}\n`;
      });

      return out;
    },

    copy: async (args) => {
      const strings = getStrings();
      const field = normalizeKey(args[0]);
      if (!field) return strings.usage.copy;

      const contactMap = {
        email: PROFILE.contact.email,
        phone: PROFILE.contact.phone,
      };

      const value = contactMap[field];
      if (!value) return strings.messages.copyUnknown(escapeHtml(args[0] || ""));

      try {
        await copyToClipboard(value);
        return strings.ui.copied(field, escapeHtml(value));
      } catch (error) {
        return `<span class=\"error\">${strings.ui.clipboardError}</span>`;
      }
    },
  };
}
