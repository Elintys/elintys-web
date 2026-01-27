import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchVenues = createAsyncThunk(
  "venues/fetchVenues",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/bff/venues", { params });
      console.log("API Venues Response:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchMyVenues = createAsyncThunk(
  "venues/fetchMyVenues",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/venues/me");
      log("API My Venues Response:", res.data);
      return res.data;
    } catch (error) {
      console.log('====================================');
      console.log("erreur lors de la recuperation des lieux utilisateur: ",error);
      console.log('====================================');
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  "venues/fetchVenueById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/bff/venues/${id}`);
      console.log("API Venue Detail Response:", res.data);
      return res.data;
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
    meta: {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 1,
    },
    current: null,
    listStatus: "idle",
    detailStatus: "idle",
    listError: null,
    detailError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const items = Array.isArray(payload.items) ? payload.items : [];
        const total = Number(payload.total ?? items.length);
        const page = Number(payload.page ?? 1);
        const limit = Number(payload.limit ?? state.meta.limit ?? 12);
        const totalPages = Number(
          payload.totalPages ?? Math.max(1, Math.ceil(total / limit))
        );
        state.list = items;
        state.meta = { total, page, limit, totalPages };
        state.listStatus = "succeeded";
        state.listError = null;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || action.error?.message || "Erreur inconnue";
      })
      .addCase(fetchMyVenues.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(fetchMyVenues.fulfilled, (state, action) => {
        state.list = action.payload || [];
        state.listStatus = "succeeded";
        state.listError = null;
      })
      .addCase(fetchMyVenues.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || action.error?.message || "Erreur inconnue";
      })
      .addCase(fetchVenueById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.current = null;
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.current = action.payload || null;
        state.detailStatus = "succeeded";
        state.detailError = null;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || action.error?.message || "Erreur inconnue";
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      });
  },
});

export default venuesSlice.reducer;
