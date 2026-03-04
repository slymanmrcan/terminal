import { PROFILE } from "../data.js";

export function createProfileCommands(ctx) {
  const { state, getStrings, getProfile } = ctx;

  return {
    banner: () => {
      const profile = getProfile();
      const location = PROFILE.contact.location[state.locale] || PROFILE.contact.location.en;
      return `
<pre class="ascii-art">
   ________              __      __  ____  _  __
  / ____/ /___  __  ____/ /___  / / / __ \\/ |/ /
 / /   / / __ \\/ / / / __  / / / / / /_/ /    /
/ /___/ / /_/ / /_/ / /_/ / /_/ / / _, _/ /|  /
\\____/_/\\____/\\__,_/\\__,_/\\__, / /_/ |_/_/ |_/
                         /____/

<span class="info">${PROFILE.name}</span>  -  <span class="warn">${profile.title}</span>
<span class="dim">${location}</span>
</pre>
`;
    },

    about: () => {
      const profile = getProfile();
      const location = PROFILE.contact.location[state.locale] || PROFILE.contact.location.en;
      return `
<span class="section-title">${PROFILE.name}</span>
<span class="info">${profile.title}</span>
<span class="info-label">${location}</span>

${profile.about}
`;
    },

    experience: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.experience}</span>\n`;

      profile.experience.forEach((item) => {
        out += `
<span class="success">${item.title}</span> @ <span class="info">${item.company}</span>
<span class="info-label">${item.location} - ${item.period}</span>
${item.description}
`;
      });

      return out;
    },

    education: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.education}</span>\n`;

      profile.education.forEach((item) => {
        out += `
<span class="success">${item.degree}</span>
<span class="info">${item.school}</span>
<span class="info-label">${item.period}</span>
`;
      });

      return out;
    },

    skills: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.skills}</span>\n`;

      profile.skills.forEach((group) => {
        out += `<span class="warn">${group.title}</span>: ${group.items.join(", ")}\n`;
      });

      return out;
    },

    stack: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.stack}</span>\n\n`;

      profile.stack.forEach((section) => {
        out += `<span class=\"warn\">${section.title}</span>\n`;
        section.items.forEach((item) => {
          out += `- ${item}\n`;
        });
        out += "\n";
      });

      return out.trimEnd();
    },

    projects: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.projects}</span>\n`;

      profile.projects.forEach((project, index) => {
        out += `
<span class="success">${index + 1}. ${project.name}</span> (<span class="dim">${project.tech}</span>)
${project.description}
- ${project.features.join("\n- ")}
<span class="info">open:</span> <span class="dim">project ${index + 1}</span>  |  <span class="info">repo:</span> <span class="dim">repo ${project.slug}</span>
`;
      });

      out += `\nOther: <span class=\"dim\">${profile.otherProjects.join(", ")}</span>`;
      return out;
    },

    links: () => {
      const strings = getStrings();
      return `
<span class="section-title">${strings.labels.links}</span>
Web      : <span class="info">https://${PROFILE.contact.website}</span>
GitHub   : <span class="info">https://${PROFILE.contact.github}</span>
LinkedIn : <span class="info">https://${PROFILE.contact.linkedin}</span>
Email    : <span class="info">mailto:${PROFILE.contact.email}</span>
`;
    },

    resume: () => {
      const strings = getStrings();
      const profile = getProfile();
      const location = PROFILE.contact.location[state.locale] || PROFILE.contact.location.en;
      const topProjects = profile.projects.slice(0, 3);

      let topOut = "";
      topProjects.forEach((project) => {
        topOut += `- ${project.name}: <span class=\"dim\">repo ${project.slug}</span>\n`;
      });

      return `
<span class="section-title">${strings.labels.resume}</span>
<span class="success">${PROFILE.name}</span> - <span class="info">${profile.title}</span>
<span class="info-label">${location}</span>

<span class="warn">${strings.labels.highlights}</span>
- ${profile.resumeHighlights.join("\n- ")}

<span class="warn">${strings.labels.topProjects}</span>
${topOut.trimEnd()}

<span class="warn">${strings.labels.links}</span>
- <span class="dim">open web</span> | <span class="dim">open github</span> | <span class="dim">open linkedin</span> | <span class="dim">open mail</span>
`;
    },

    contact: () => {
      const strings = getStrings();
      return `
<span class="section-title">${strings.labels.contact}</span>
Email    : <span class="info">${PROFILE.contact.email}</span>
Phone    : <span class="info">${PROFILE.contact.phone}</span>
Web      : <span class="info">https://${PROFILE.contact.website}</span>
GitHub   : <span class="info">https://${PROFILE.contact.github}</span>
LinkedIn : <span class="info">https://${PROFILE.contact.linkedin}</span>
`;
    },

    certifications: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.certifications}</span>\n`;

      profile.certifications.forEach((item) => {
        out += `
<span class="success">${item.title}</span> - <span class="info">${item.issuer}</span>
<span class="dim">ID: ${item.id}</span>
`;
      });

      return out;
    },

    languages: () => {
      const strings = getStrings();
      const profile = getProfile();
      let out = `<span class=\"section-title\">${strings.labels.languages}</span>\n`;

      profile.languages.forEach((item) => {
        out += `<span class=\"info\">${item.lang}</span>: ${item.level}\n`;
      });

      return out;
    },
  };
}
