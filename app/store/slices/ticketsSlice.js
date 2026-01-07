import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async () => {
  const res = await apiClient.get("/tickets");
  return res.data;
});

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/tickets", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const useTicket = createAsyncThunk(
  "tickets/useTicket",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(`/tickets/${id}/use`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(useTicket.fulfilled, (state, action) => {
        state.list = state.list.map((ticket) =>
          ticket._id === action.payload?._id ? action.payload : ticket
        );
      });
  },
});

export default ticketsSlice.reducer;
