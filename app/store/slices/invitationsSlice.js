import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchInvitations = createAsyncThunk(
  "invitations/fetchInvitations",
  async () => {
    const res = await apiClient.get("/invitations");
    return res.data;
  }
);

export const createInvitation = createAsyncThunk(
  "invitations/createInvitation",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/invitations", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateInvitation = createAsyncThunk(
  "invitations/updateInvitation",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/invitations/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const invitationsSlice = createSlice({
  name: "invitations",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(updateInvitation.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item._id === action.payload?._id ? action.payload : item
        );
      });
  },
});

export default invitationsSlice.reducer;
