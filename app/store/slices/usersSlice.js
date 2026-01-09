import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await apiClient.get("/users/me");
  if (res.data?.user) {
    return [res.data.user];
  }
  return [];
});

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users/me");
      if (res.data?.user) {
        return { ...res.data.user, roles: res.data.roles, permissions: res.data.permissions };
      }
      return res.data;
    } catch (error) {
      console.log('====================================');
      console.log('Erreur fetch currentUser: ', error);
      console.log('====================================');
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "users/updateCurrentUser",
  async (payload, { rejectWithValue }) => {
    return rejectWithValue({
      message: "Route /users/me (PUT) non disponible dans l'API actuelle.",
      payload,
    });
  }
);

export const addUserRole = createAsyncThunk(
  "users/addUserRole",
  async ({ userId, roleCode }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(`/users/${userId}/roles`, { roleCode });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.current = action.payload || null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.current = action.payload || null;
      })
      .addCase(addUserRole.fulfilled, (state, action) => {
        if (action.payload?.roles) {
          state.current = {
            ...(state.current || {}),
            roles: action.payload.roles,
            permissions: action.payload.permissions,
          };
        } else {
          state.current = action.payload || null;
        }
      });
  },
});

export default usersSlice.reducer;
