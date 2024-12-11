import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  turfs: [],
  turfsForHome: null,
  turfDetails: null,
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

const listTurfs = createAsyncThunk('turf/listTurfs', async (filter, { rejectWithValue }) => {
  try {
    const { search = '', location = '' } = filter;
    const response = await axios.get(`/turf/list?search=${search}&location=${location}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getTurfDetails = createAsyncThunk('turf/getTurfDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/turf/${id}`);
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
      state.turfs = action.payload.data;
      state.error = '';
    });
    builder.addCase(listTurfs.rejected, (state, action) => {
      state.loading = false;
      state.turfs = [];
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(getTurfDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTurfDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.turfDetails = action.payload.data;
      state.error = '';
    });
    builder.addCase(getTurfDetails.rejected, (state, action) => {
      state.loading = false;
      state.turfDetails = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { listTurfsForHome, listTurfs,getTurfDetails };
export default turfSlice.reducer;
