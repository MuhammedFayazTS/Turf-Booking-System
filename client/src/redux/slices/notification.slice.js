import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  notifications: [],
  seenNotifications: [],
  unseenNotifications: [],
  error: '',
};

const listUnseenNotifications = createAsyncThunk('turf/listUnseenNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/user/notification/unseen');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listUnseenNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listUnseenNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.unseenNotifications = action.payload.data;
      state.error = '';
    });
    builder.addCase(listUnseenNotifications.rejected, (state, action) => {
      state.loading = false;
      state.unseenNotifications = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { listUnseenNotifications };
export default notificationSlice.reducer;
