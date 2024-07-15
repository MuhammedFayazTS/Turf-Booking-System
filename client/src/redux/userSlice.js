import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const signIn = createAsyncThunk('user/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/sign-in', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { signUp, signIn };
export default userSlice.reducer;
