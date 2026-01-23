const FAVORITES_KEY = "elyntisFavorites";
const PREFERENCES_KEY = "elyntisPreferences";

export function getFavorites() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function isFavorite(eventId) {
  if (!eventId) return false;
  return getFavorites().includes(eventId);
}

export function toggleFavorite(eventId) {
  if (typeof window === "undefined") return [];
  const current = getFavorites();
  const next = current.includes(eventId)
    ? current.filter((id) => id !== eventId)
    : [...current, eventId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function savePreferences(preferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences || {}));
}

export function getPreferences() {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(PREFERENCES_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
