import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../apiClient";
import { clearStoredAuth, setStoredAuth } from "../../components/lib/auth";

export const loginProfile = createAsyncThunk(
  "auth/loginProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/firebase-login");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const registerProfile = createAsyncThunk(
  "auth/registerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/auth/firebase-login");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    return rejectWithValue({
      message: "Route /users/me (PUT) non disponible dans l'API actuelle.",
      payload,
    });
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (payload, { rejectWithValue }) => {
    return rejectWithValue({
      message: "Route /auth/recover non disponible dans l'API actuelle.",
      payload,
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
    recovery: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      state.error = null;
      if (token) {
        setStoredAuth(user, token);
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      clearStoredAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.user) {
          state.user = {
            ...action.payload.user,
            roles: action.payload.roles,
            permissions: action.payload.permissions,
          };
        } else {
          state.user = action.payload || null;
        }
        state.token = action.payload?.token || state.token;
        if (action.payload?.token) {
          setStoredAuth(state.user, action.payload.token);
        }
      })
      .addCase(loginProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Erreur login";
      })
      .addCase(registerProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.user) {
          state.user = {
            ...action.payload.user,
            roles: action.payload.roles,
            permissions: action.payload.permissions,
          };
        } else {
          state.user = action.payload || null;
        }
        state.token = action.payload?.token || state.token;
        if (action.payload?.token) {
          setStoredAuth(state.user, action.payload.token);
        }
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Erreur register";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = {
            ...action.payload.user,
            roles: action.payload.roles,
            permissions: action.payload.permissions,
          };
        } else {
          state.user = action.payload || null;
        }
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.recovery = action.payload || null;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
