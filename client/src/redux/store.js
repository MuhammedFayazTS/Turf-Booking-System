import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { alertSlice } from './alertSlice'
import { userSlice } from './userSlice'
import { bookingSlice } from './bookingSlice'
import { adminSlice } from './adminSlice'

const rootReducer = combineReducers({
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
    admin: adminSlice.reducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store