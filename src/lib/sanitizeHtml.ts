import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4",
      "p", "ul", "ol", "li",
      "strong", "em", "b", "i",
      "br", "hr"
    ],
    ALLOWED_ATTR: [] // 🔥 STRIPS style, class, inline color, bg
  });
}
