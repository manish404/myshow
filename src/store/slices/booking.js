import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        movie: '',
        selectedSeats: {},
        selectedSeatsSize: 0,
        bookedSeats: {},
        bookedSeatsSize: 0,
    },
    reducers: {
        setSelectedSeats: (state, { payload }) => {
            const { seat, status } = payload;
            if (status) {
                state.selectedSeats[seat] = status;
                state.selectedSeatsSize++;
            }
        },
        setBookedSeats: (state, { payload }) => {
            const { seat, status } = payload;
        }
    },
});

export const { setSelectedSeats, setBookedSeats } = bookingSlice.actions;
export default bookingSlice;