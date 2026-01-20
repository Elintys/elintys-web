import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const normalizeProvidersResponse = (payload, fallbackPage, fallbackLimit) => {
  const data = payload?.data ?? payload ?? {};
  const items =
    data?.items ||
    data?.providers ||
    data?.results ||
    data?.data ||
    data?.list ||
    [];
  const total =
    data?.total ||
    data?.count ||
    data?.totalCount ||
    data?.pagination?.total ||
    items.length;
  const page =
    data?.page || data?.pagination?.page || data?.currentPage || fallbackPage;
  const limit =
    data?.limit || data?.pagination?.limit || data?.pageSize || fallbackLimit;

  return {
    items: Array.isArray(items) ? items : [],
    meta: {
      total: Number.isFinite(Number(total)) ? Number(total) : items.length,
      page: Number.isFinite(Number(page)) ? Number(page) : fallbackPage,
      limit: Number.isFinite(Number(limit)) ? Number(limit) : fallbackLimit,
    },
  };
};

export const fetchProviders = createAsyncThunk(
  "providers/fetchProviders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/providers", { params });
      return normalizeProvidersResponse(res.data, params?.page || 1, params?.limit || 12);
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const providersSlice = createSlice({
  name: "providers",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    meta: {
      total: 0,
      page: 1,
      limit: 12,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload?.items || [];
        state.meta = action.payload?.meta || state.meta;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default providersSlice.reducer;
