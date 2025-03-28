import { createSlice } from "@reduxjs/toolkit";
import { socialLogin } from "./SocialAuthAction";

const initialState = {
    loading: false,
    error: null,
    user: null,
    token: null,
    isAuthenticated: false

};

const socialAuthSlice = createSlice({
    name: "socialAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(socialLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(socialLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true; // Set authenticated to true
                state.error = null; // Clear any previous errors
            })
            .addCase(socialLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error from the rejected action
                state.isAuthenticated = false; // Ensure authenticated is false on error
            });
    },
});

export default socialAuthSlice.reducer;