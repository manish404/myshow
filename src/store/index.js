import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common";
import bookingSlice from "./slices/booking";

const store = configureStore({
    reducer: {
        common: commonSlice.reducer,
        booking: bookingSlice.reducer
    },
}
);
export default store;