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

const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
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
    return response.data; // This will be the payload of the fulfilled action
  } catch (error) {
    return rejectWithValue(error.response.data); // This will be handled in the rejected case
  }
});

const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/sign-out');
    localStorage.removeItem('tokenExpiresAt');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const protectedRoute = createAsyncThunk('auth/protected', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/protected');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'Not authorized for this page');
    return rejectWithValue(error.response.data);
  }
});

const updateProfileImage = createAsyncThunk('auth/updateProfileImage', async (image, { rejectWithValue }) => {
  try {
    const response = await axios.put('/user/change-image', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    handleApiResponse(response, 'Profile image updated successfully');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'Profile image updation failed');
    return rejectWithValue(error.response.data);
  }
});

const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (userDetails, { rejectWithValue }) => {
  try {
    const response = await axios.put('/user', userDetails);
    handleApiResponse(response, 'User details updated successfully');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'User details updation failed');
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.signedIn = true;
        state.error = '';
        localStorage.setItem('tokenExpiresAt', action.payload.data.tokenExpiresAt);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
        state.isAuthenticated = true;
        state.error = '';
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = '';
        localStorage.setItem('tokenExpiresAt', action.payload.tokenExpiresAt);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.signedIn = false;
        state.error = '';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(protectedRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(protectedRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.error = '';
      })
      .addCase(protectedRoute.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = '';
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = '';
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export { signUp, signIn, loadUser, refreshToken, signOut, protectedRoute, updateProfileImage, updateUserDetails };
export const { setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
