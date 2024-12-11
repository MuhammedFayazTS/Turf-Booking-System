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

const listSeenNotifications = createAsyncThunk('turf/listSeenNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/user/notification/seen');
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

const markNotificationAsSeen = createAsyncThunk(
  'notification/markNotificationAsSeen',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/notification/${id}`);
      await dispatch(listUnseenNotifications());
      await dispatch(listSeenNotifications());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const markNotificationsAsSeen = createAsyncThunk(
  'notification/markNotificationsAsSeen',
  async (notificationIds, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/notifications`, {
        notificationIds,
      });
      await dispatch(listUnseenNotifications());
      await dispatch(listSeenNotifications());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`/user/notification/${id}`);
      await dispatch(listUnseenNotifications());
      await dispatch(listSeenNotifications());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteNotifications = createAsyncThunk(
  'notification/deleteNotifications',
  async (notificationIds, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`/user/notifications`, {
        data: { notificationIds },
      });
      await dispatch(listUnseenNotifications());
      await dispatch(listSeenNotifications());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      state.seenNotifications = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(listSeenNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listSeenNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.seenNotifications = action.payload.data;
      state.error = '';
    });
    builder.addCase(listSeenNotifications.rejected, (state, action) => {
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
    builder.addCase(markNotificationAsSeen.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markNotificationAsSeen.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(markNotificationAsSeen.rejected, (state, action) => {
      state.loading = false;
      state.notificationDetails = {};
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(markNotificationsAsSeen.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markNotificationsAsSeen.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(markNotificationsAsSeen.rejected, (state, action) => {
      state.loading = false;
      state.notificationDetails = {};
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(deleteNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteNotification.rejected, (state, action) => {
      state.loading = false;
      state.notificationDetails = {};
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(deleteNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteNotifications.rejected, (state, action) => {
      state.loading = false;
      state.notificationDetails = {};
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export {
  listUnseenNotifications,
  listSeenNotifications,
  getNotificationDetails,
  markNotificationAsSeen,
  markNotificationsAsSeen,
  deleteNotification,
  deleteNotifications,
};
export default notificationSlice.reducer;
