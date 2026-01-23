import axios from "axios";
import { showToast } from "../components/ui/Toast";

const rawBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api")
  .replace(/\/$/, ""); // Remove trailing slash if present
const baseUrl = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;

const apiClient = axios.create({
  baseURL: baseUrl,
});

let isHandlingSessionExpiry = false;

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("elyntisToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      typeof window !== "undefined" &&
      error?.response?.status === 401 &&
      !isHandlingSessionExpiry
    ) {
      isHandlingSessionExpiry = true;
      try {
        const [{ clearStoredAuth }, { store }, { clearCredentials }] = await Promise.all([
          import("../lib/auth"),
          import("./store"),
          import("./slices/authSlice"),
        ]);
        clearStoredAuth();
        store.dispatch(clearCredentials());
        isHandlingSessionExpiry = false;
        
      } catch (logoutError) {
        console.error("Erreur lors de la deconnexion automatique:", logoutError);
      }
      showToast("Session expiree. Deconnexion dans: ", 5);
      window.setTimeout(() => {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }, 5000);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
