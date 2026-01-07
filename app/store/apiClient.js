import axios from "axios";

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api")
  .replace(/\/$/, ""); // Remove trailing slash if present

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("elyntisToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;
