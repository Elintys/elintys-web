export const formatDateRange = (startDate, endDate, locale) => {
  if (!startDate) return "—";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  const day = start.toLocaleDateString(locale, { dateStyle: "full" });
  const startTime = start.toLocaleTimeString(locale, { timeStyle: "short" });
  if (!end) return `${day} · ${startTime}`;
  const endTime = end.toLocaleTimeString(locale, { timeStyle: "short" });
  return `${day} · ${startTime} - ${endTime}`;
};

export const formatDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  const diff = Math.max(0, new Date(endDate) - new Date(startDate));
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h${rest}` : `${hours}h`;
};

export const ensureMeta = ({ name, property, content }) => {
  if (typeof document === "undefined") return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content || "");
};
