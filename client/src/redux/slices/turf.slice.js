import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleApiResponse } from '../../Utils/toast.helper';

const initialState = {
  loading: false,
  turfs: [],
  turfsForHome: null,
  error: '',
};

const listTurfsForHome = createAsyncThunk('turf/listTurfsForHome', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/turf/list-for-home');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const listTurfs = createAsyncThunk('turf/listTurfs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/turf/list');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const turfSlice = createSlice({
  name: 'turf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTurfsForHome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listTurfsForHome.fulfilled, (state, action) => {
      state.loading = false;
      state.turfsForHome = action.payload.data.turfs;
      state.error = '';
    });
    builder.addCase(listTurfsForHome.rejected, (state, action) => {
      state.loading = false;
      state.turfsForHome = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(listTurfs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listTurfs.fulfilled, (state, action) => {
      state.loading = false;
      state.turfs = action.payload.data.turfs;
      state.error = '';
    });
    builder.addCase(listTurfs.rejected, (state, action) => {
      state.loading = false;
      state.turfs = [];
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { listTurfsForHome, listTurfs };
export default turfSlice.reducer;
