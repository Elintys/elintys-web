import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await apiClient.get("/events/public");
  console.log('====================================');
  console.log("Events: ",res);
  console.log('====================================');
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
      const res = await apiClient.get(`/bff/events/${id}`);
      console.log('====================================');
      console.log("Selected event: ", res);
      console.log('====================================');
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

export const createEventDraft = createAsyncThunk(
  "events/createEventDraft",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/events", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const patchEvent = createAsyncThunk(
  "events/patchEvent",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/events/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const addManualProvider = createAsyncThunk(
  "events/addManualProvider",
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
  "events/removeManualProvider",
  async ({ id, providerId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/events/${id}/manual-providers/${providerId}`);
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
      .addCase(createEventDraft.fulfilled, (state, action) => {
        state.current = action.payload || null;
      })
      .addCase(patchEvent.fulfilled, (state, action) => {
        state.current = action.payload || state.current;
        state.list = state.list.map((event) =>
          event._id === action.payload?._id ? action.payload : event
        );
      })
      .addCase(addManualProvider.fulfilled, (state, action) => {
        state.current = action.payload || state.current;
      })
      .addCase(removeManualProvider.fulfilled, (state, action) => {
        state.current = action.payload || state.current;
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
