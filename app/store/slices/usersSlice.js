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

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch("/users/me/profile", payload);
      return res.data?.user || res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateUserPreferences = createAsyncThunk(
  "users/updateUserPreferences",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch("/users/me/preferences", payload);
      return res.data?.user || res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchUserRoles = createAsyncThunk(
  "users/fetchUserRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users/me/roles");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchUserPermissions = createAsyncThunk(
  "users/fetchUserPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users/me/permissions");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  "users/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/users/me/deactivate");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "users/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete("/users/me");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const exportUserData = createAsyncThunk(
  "users/exportUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users/me/export");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
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
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.current = action.payload || state.current;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.current = action.payload || state.current;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        if (action.payload?.roles) {
          state.current = {
            ...(state.current || {}),
            roles: action.payload.roles,
          };
        }
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        if (action.payload?.permissions) {
          state.current = {
            ...(state.current || {}),
            permissions: action.payload.permissions,
          };
        }
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        state.current = action.payload?.user || action.payload || state.current;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.current = action.payload?.user || null;
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
