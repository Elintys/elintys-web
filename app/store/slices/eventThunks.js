import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addManualProvider as addManualProviderApi,
  createEventDraft as createEventDraftApi,
  removeManualProvider as removeManualProviderApi,
  updateEvent as updateEventApi,
  uploadCoverImage as uploadCoverImageApi,
} from "../../services/event.api";

export const createEventDraft = createAsyncThunk(
  "event/createEventDraft",
  async (payload, { rejectWithValue }) => {
    try {
      return await createEventDraftApi(payload);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateEventApi(id, payload);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const uploadCoverImage = createAsyncThunk(
  "event/uploadCoverImage",
  async (file, { rejectWithValue }) => {
    try {
      return await uploadCoverImageApi(file);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const addManualProvider = createAsyncThunk(
  "event/addManualProvider",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await addManualProviderApi(id, payload);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const removeManualProvider = createAsyncThunk(
  "event/removeManualProvider",
  async ({ id, providerId }, { rejectWithValue }) => {
    try {
      return await removeManualProviderApi(id, providerId);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
