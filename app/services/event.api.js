import axios from "axios";

const rawBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api").replace(
  /\/$/,
  ""
);
const baseUrl = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;

const eventApi = axios.create({
  baseURL: baseUrl,
});

eventApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("elyntisToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const createEventDraft = async (payload) => {
  const nextPayload = { ...payload };
  if (nextPayload.coverImageUrl) {
    nextPayload.imageUrl = nextPayload.coverImageUrl;
    delete nextPayload.coverImageUrl;
  }
  if (nextPayload.cover_image_url) {
    nextPayload.imageUrl = nextPayload.cover_image_url;
    delete nextPayload.cover_image_url;
  }
  const res = await eventApi.post("/events", nextPayload);
  return res.data;
};

export const updateEvent = async (id, payload) => {
  const nextPayload = { ...payload };
  if (nextPayload.coverImageUrl) {
    nextPayload.imageUrl = nextPayload.coverImageUrl;
    delete nextPayload.coverImageUrl;
  }
  if (nextPayload.cover_image_url) {
    nextPayload.imageUrl = nextPayload.cover_image_url;
    delete nextPayload.cover_image_url;
  }
  const res = await eventApi.patch(`/events/${id}`, nextPayload);
  return res.data;
};

export const uploadCoverImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await eventApi.post("/upload/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const addManualProvider = async (id, payload) => {
  const res = await eventApi.post(`/events/${id}/manual-providers`, payload);
  return res.data;
};

export const removeManualProvider = async (id, providerId) => {
  const res = await eventApi.delete(`/events/${id}/manual-providers/${providerId}`);
  return res.data;
};
