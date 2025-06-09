import { createSlice } from "@reduxjs/toolkit";
import { subscribe } from "./NewsLetterAction";

const initialState = {
    loading: false,
    error: null,
};

const newsletterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscribe.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default newsletterSlice.reducer;