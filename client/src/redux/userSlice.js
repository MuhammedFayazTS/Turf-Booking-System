import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Utils/axiosInstance';

const initialState = {
  loading: false,
  user: null,
  success: false,
  error: '',
};

const signUp = createAsyncThunk('user/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
      state.user = null;
      state.error = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { signUp };
export default userSlice.reducer;
