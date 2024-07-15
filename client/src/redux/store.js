import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import alertReducer from './alertSlice';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';
import adminReducer from './adminSlice';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertReducer,
//   booking: bookingReducer,
//   admin: adminReducer,
});

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
