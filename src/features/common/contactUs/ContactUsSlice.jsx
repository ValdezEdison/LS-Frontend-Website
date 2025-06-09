import { createSlice } from "@reduxjs/toolkit";
import { submitContactForm } from "./ContactUsAction";

const initialState = {
    loading: false,
    error: null,
};

const contactUsSlice = createSlice({
    name: "contactUs",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default contactUsSlice.reducer;