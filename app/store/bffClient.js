import axios from "axios";

const rawBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api")
  .replace(/\/$/, "");
const bffBaseUrl = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl.slice(0, -4)
  : rawBaseUrl;

const bffClient = axios.create({
  baseURL: bffBaseUrl || "/",
});

bffClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("elyntisToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default bffClient;
