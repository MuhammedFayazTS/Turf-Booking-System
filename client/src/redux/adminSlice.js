import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    venues: [],
    bookings: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addVenues: (state, action) => {
        state.venues = action.payload;
    },
    addBookings: (state, action) => {
        state.bookings = action.payload;
    },
    // removeFromBooking:(state,action)=>{
    //     // state.bookings.filter(booking=>booking.);
    // },
    // removeAllBooking:(state,action)=>{
    //     state.bookings = []
    // },
  },
});

export const { addUsers, addBookings, addVenues } = adminSlice.actions;
