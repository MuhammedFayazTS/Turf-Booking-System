import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
  },
  reducers: {
    addToBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeFromBooking: (state, action) => {
      const { time, date } = action.payload;
      state.bookings = state.bookings.filter(
        (booking) => booking.time !== time || booking.date !== date
      );
    },

    removeAllBooking: (state, action) => {
      state.bookings = [];
    },
  },
});

export const { addToBooking, removeFromBooking, removeAllBooking } =
  bookingSlice.actions;
