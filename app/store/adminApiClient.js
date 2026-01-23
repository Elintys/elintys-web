import axios from "axios";

const rawBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api")
  .replace(/\/$/, "");
const baseUrl = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;
// Admin routes are scoped under /admin on the API gateway.
const adminBaseUrl = `${baseUrl}/admin`;

const adminApiClient = axios.create({
  baseURL: adminBaseUrl,
});

adminApiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("elyntisToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default adminApiClient;
