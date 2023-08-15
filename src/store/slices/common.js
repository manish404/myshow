import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        notice: '',
        inputNotice: {}
    },
    reducers: {
        setNotice: (state, action) => {
            state.notice = action.payload;
        },
        setInputNotice: (state, action) => {
            const { name, message } = action.payload;
            state.inputNotice[name] = message;
        }
    },
});

export const { setNotice, setInputNotice } = commonSlice.actions;
export default commonSlice;