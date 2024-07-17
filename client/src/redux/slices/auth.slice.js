import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiResponse } from '../../Utils/toast.helper';

const initialState = {
  loading: false,
  user: null,
  token: null,
  isAuthenticated: false,
  error: '',
};

const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/sign-up', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    handleApiResponse(response, 'User signed up successfully');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'Sign up failed');
    return rejectWithValue(error.response.data);
  }
});

const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/sign-in', userData);
    handleApiResponse(response, 'User signed in successfully');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'Sign in failed');
    return rejectWithValue(error.response.data);
  }
});

const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const refreshToken = createAsyncThunk('auth/refreshToken', async ({ rejectWithValue, getState }) => {
  try {
    const state = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.auth.token}`,
      },
    };
    const response = await axios.post('/auth/refresh-token', {}, config);
    localStorage.setItem('tokenExpiresAt', response.data.tokenExpiresAt);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = '';
      localStorage.setItem('tokenExpiresAt', action.payload.data.tokenExpiresAt);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload?.data;
      state.isAuthenticated = true;
      state.error = '';
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = '';
      localStorage.setItem('tokenExpiresAt', action.payload.tokenExpiresAt);
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
  },
});

export { signUp, signIn, loadUser, refreshToken };
export default authSlice.reducer;
