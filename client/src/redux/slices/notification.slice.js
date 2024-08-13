import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  notifications: [],
  seenNotifications: [],
  unseenNotifications: [],
  notificationDetails: {},
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

const getNotificationDetails = createAsyncThunk('turf/getNotificationDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/user/notification/${id}`);
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
    builder.addCase(getNotificationDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotificationDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationDetails = action.payload.data.notification;
      state.error = '';
    });
    builder.addCase(getNotificationDetails.rejected, (state, action) => {
      state.loading = false;
      state.notificationDetails = {};
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { listUnseenNotifications, getNotificationDetails };
export default notificationSlice.reducer;
