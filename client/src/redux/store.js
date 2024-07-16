import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import alertReducer from './alertSlice';
import authReducer from './slices/auth.slice';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
});

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
