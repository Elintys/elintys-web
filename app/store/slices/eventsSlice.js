import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await apiClient.get("/events/public");
  const items = res.data?.data || res.data || [];
  return Array.isArray(items)
    ? items.map((event) => ({ ...event, _id: event._id || event.id }))
    : items;
});

export const fetchEventsByUser = createAsyncThunk(
  "events/fetchEventsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/events/user/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/events/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/events", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/events/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/events/${id}`);
      return { id, response: res.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchEventsByUser.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.current = action.payload || null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.current = action.payload || null;
        state.list = state.list.map((event) =>
          event._id === action.payload?._id ? action.payload : event
        );
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.list = state.list.filter((event) => event._id !== action.payload.id);
      });
  },
});

export default eventsSlice.reducer;
