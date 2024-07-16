import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiResponse } from '../Utils/toast.helper';

const initialState = {
  loading: false,
  user: null,
  success: false,
  error: '',
};

const signUp = createAsyncThunk('user/signUp', async (userData, { rejectWithValue }) => {
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

const signIn = createAsyncThunk('user/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/sign-in', userData);
    handleApiResponse(response, 'User signed in successfully');
    return response.data;
  } catch (error) {
    handleApiResponse(error.response, '', 'Sign in failed');
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
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
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { signUp, signIn };
export default userSlice.reducer;
