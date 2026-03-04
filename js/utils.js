export function normalizeKey(value) {
  return String(value || "").toLowerCase().trim();
}

export function padRight(str, width) {
  return (String(str) + " ".repeat(width)).slice(0, width);
}

export function openUrl(url) {
  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    // Some environments block popups.
  }
}

export function triggerDownload(url, filename) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener noreferrer";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightKeyword(text, keyword) {
  const query = String(keyword || "").trim();
  if (!query) return escapeHtml(text);

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return String(text)
    .split(regex)
    .map((part) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return `<span class=\"warn\">${escapeHtml(part)}</span>`;
      }
      return escapeHtml(part);
    })
    .join("");
}

export function createSnippet(text, keyword, radius = 60) {
  const source = String(text || "").replace(/\s+/g, " ").trim();
  if (!source) return "";

  const query = String(keyword || "").toLowerCase().trim();
  if (!query) return source.slice(0, radius * 2);

  const index = source.toLowerCase().indexOf(query);
  if (index === -1) return source.slice(0, radius * 2);

  const start = Math.max(0, index - radius);
  const end = Math.min(source.length, index + query.length + radius);
  let snippet = source.slice(start, end).trim();

  if (start > 0) snippet = `...${snippet}`;
  if (end < source.length) snippet = `${snippet}...`;
  return snippet;
}

export function toSafeUsername(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}
