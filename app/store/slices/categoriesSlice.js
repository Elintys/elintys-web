import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const res = await apiClient.get("/categories");
  return res.data;
});

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/categories", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      });
  },
});

export default categoriesSlice.reducer;
