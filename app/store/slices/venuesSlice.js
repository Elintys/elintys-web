import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchVenues = createAsyncThunk("venues/fetchVenues", async () => {
  const res = await apiClient.get("/venues/search");
  return res.data;
});

export const fetchMyVenues = createAsyncThunk(
  "venues/fetchMyVenues",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/venues/me");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  "venues/fetchVenueById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/venues/search");
      const venues = res.data || [];
      return venues.find((venue) => venue?._id === id || venue?.id === id) || null;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const createVenue = createAsyncThunk(
  "venues/createVenue",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/venues", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const venuesSlice = createSlice({
  name: "venues",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(fetchMyVenues.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.current = action.payload || null;
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      });
  },
});

export default venuesSlice.reducer;
