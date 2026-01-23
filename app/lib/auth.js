export function getStoredAuth() {
  if (typeof window === "undefined") return null;
  const rawUser = localStorage.getItem("elyntisUser");
  const token = localStorage.getItem("elyntisToken");

  if (!rawUser || !token) return null;

  try {
    const user = JSON.parse(rawUser);
    return { user, token };
  } catch {
    return { user: null, token };
  }
}

export function setStoredAuth(user, token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("elyntisUser", JSON.stringify(user));
  localStorage.setItem("elyntisToken", token);
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("elyntisUser");
  localStorage.removeItem("elyntisToken");
}
