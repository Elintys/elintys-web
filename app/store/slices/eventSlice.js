import { createSlice } from "@reduxjs/toolkit";
import {
  addManualProvider,
  createEventDraft,
  removeManualProvider,
  updateEvent,
  uploadCoverImage,
} from "./eventThunks";

const emptyDraft = {
  id: null,
  title: "",
  description: "",
  organizerId: null,
  categoryId: "",
  externalSourceId: "",
  startDate: "",
  endDate: "",
  isPublic: true,
  status: "DRAFT",
  coverImageUrl: "",
  manualVenue: {
    name: "",
    address: "",
    city: "",
    country: "",
    capacity: { min: "", max: "" },
    notes: "",
  },
  manualProviders: [],
  loading: false,
  error: null,
};

const normalizeEvent = (payload) => {
  if (!payload) return {};
  const data = payload.user ? payload.user : payload;
  return {
    ...data,
    id: data.id || data._id || data.eventId || data.event_id || null,
    coverImageUrl:
      data.coverImageUrl || data.cover_image_url || data.coverImage || data.imageUrl || "",
    manualProviders: data.manualProviders || data.manual_providers || [],
  };
};

const eventSlice = createSlice({
  name: "event",
  initialState: emptyDraft,
  reducers: {
    resetEventDraft: () => ({ ...emptyDraft }),
    setEventDraft: (state, action) => {
      const next = normalizeEvent(action.payload);
      Object.assign(state, { ...state, ...next, loading: false, error: null });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventDraft.fulfilled, (state, action) => {
        const next = normalizeEvent(action.payload);
        Object.assign(state, { ...state, ...next, loading: false, error: null });
      })
      .addCase(createEventDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const next = normalizeEvent(action.payload);
        Object.assign(state, { ...state, ...next, loading: false, error: null });
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(uploadCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCoverImage.fulfilled, (state, action) => {
        const url =
          action.payload?.url ||
          action.payload?.imageUrl ||
          action.payload?.coverImageUrl ||
          "";
        state.coverImageUrl = url;
        state.loading = false;
        state.error = null;
      })
      .addCase(uploadCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addManualProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addManualProvider.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (payload.manualProviders || payload.manual_providers) {
          state.manualProviders = payload.manualProviders || payload.manual_providers || [];
        } else if (payload.provider) {
          state.manualProviders = [...state.manualProviders, payload.provider];
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(addManualProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(removeManualProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeManualProvider.fulfilled, (state, action) => {
        const payload = action.payload || {};
        if (payload.manualProviders || payload.manual_providers) {
          state.manualProviders = payload.manualProviders || payload.manual_providers || [];
        } else if (payload.providerId) {
          state.manualProviders = state.manualProviders.filter(
            (item) => (item._id || item.id) !== payload.providerId
          );
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(removeManualProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetEventDraft, setEventDraft } = eventSlice.actions;

export default eventSlice.reducer;
