import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_API_URL, CLIENT_API_URL } from "../../configs/environment";

// Helper functions
const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const registerResponse = await axios.post(CLIENT_API_URL, data);
      const loginResponse = await axios.post(`${AUTH_API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      setTokens(loginResponse.data);
      return { ...registerResponse.data.client, role: 'client' };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const responseLogin = await axios.post(`${AUTH_API_URL}/login`, data);
      setTokens(responseLogin.data);

      // In case client logged in, get extra infos
      if (responseLogin.data.user.role == "client") {
        const response = await axios.get(
          `${CLIENT_API_URL}/getByEmail/${data.email}`
        );
        return { ...response.data, role: 'client' };
      }

      return responseLogin.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const validationResponse = await axios.post(`${AUTH_API_URL}/validate`, {
      token: accessToken,
    });

    // Here if token is not valid refresh it
    // But give the refresh token an expiration date too so the user doesn't stay always logged in

    const user = validationResponse.data;

    // In case client logged in, get extra info
    if (user.role == "client") {
      const response = await axios.get(
        `${CLIENT_API_URL}/getByEmail/${user.email}`
      );
      return { ...response.data, role: 'client' };
    }

    return user;
  } catch (error) {
    console.log(error);
  }
});

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${AUTH_API_URL}/refresh`, {
      refreshToken,
    });
    setTokens(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logOut: (state, action) => {
      clearTokens();
      state.user = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logOut, resetError } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export default userSlice.reducer;
