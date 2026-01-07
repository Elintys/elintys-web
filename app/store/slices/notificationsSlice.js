import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const res = await apiClient.get("/notifications");
    return res.data;
  }
);

export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/notifications", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(`/notifications/${id}/read`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      });
  },
});

export default notificationsSlice.reducer;
