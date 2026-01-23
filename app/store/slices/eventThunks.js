import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

function normalizeEventPayload(payload) {
  const nextPayload = { ...payload };
  if (nextPayload.coverImageUrl) {
    nextPayload.imageUrl = nextPayload.coverImageUrl;
    delete nextPayload.coverImageUrl;
  }
  if (nextPayload.cover_image_url) {
    nextPayload.imageUrl = nextPayload.cover_image_url;
    delete nextPayload.cover_image_url;
  }
  return nextPayload;
}

export const createEventDraft = createAsyncThunk(
  "event/createEventDraft",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/events", normalizeEventPayload(payload));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/events/${id}`, normalizeEventPayload(payload));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const uploadCoverImage = createAsyncThunk(
  "event/uploadCoverImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await apiClient.post("/upload/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const addManualProvider = createAsyncThunk(
  "event/addManualProvider",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(`/events/${id}/manual-providers`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const removeManualProvider = createAsyncThunk(
  "event/removeManualProvider",
  async ({ id, providerId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/events/${id}/manual-providers/${providerId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
