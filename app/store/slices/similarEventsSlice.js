// Manages cached similar events per event ID to keep UI responsive and consistent.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSimilarEvents } from "../../services/events.api";

const initialState = {};
const DEFAULT_LIMIT = 6;

export const fetchSimilarEvents = createAsyncThunk(
  "similarEvents/fetchSimilarEvents",
  async (eventId, { rejectWithValue }) => {
    try {
      const items = await getSimilarEvents(eventId, { limit: DEFAULT_LIMIT });
      return { eventId, items };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Impossible de charger les événements similaires.";
      return rejectWithValue({ eventId, message });
    }
  },
);

const similarEventsSlice = createSlice({
  name: "similarEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarEvents.pending, (state, action) => {
        const eventId = action.meta.arg;
        state[eventId] = {
          status: "loading",
          items: [],
          error: null,
        };
      })
      .addCase(fetchSimilarEvents.fulfilled, (state, action) => {
        const { eventId, items } = action.payload;
        state[eventId] = {
          status: "succeeded",
          items: Array.isArray(items) ? items.slice(0, DEFAULT_LIMIT) : [],
          error: null,
        };
      })
      .addCase(fetchSimilarEvents.rejected, (state, action) => {
        const eventId = action.payload?.eventId || action.meta.arg;
        state[eventId] = {
          status: "failed",
          items: [],
          error: action.payload?.message || action.error?.message || "Erreur réseau",
        };
      });
  },
});

export const selectSimilarEvents = (state, eventId) =>
  state.similarEvents?.[eventId] ?? { status: "idle", items: [], error: null };

export default similarEventsSlice.reducer;
