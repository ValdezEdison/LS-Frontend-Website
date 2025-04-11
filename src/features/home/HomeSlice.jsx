import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeRandomSites } from "./HomeAction";

const initialState = {
    randomPlaces: [],
    loading: false,
    error: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeRandomSites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeRandomSites.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.randomPlaces = action.payload;
            })
            .addCase(fetchHomeRandomSites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });        
    },
});

export default homeSlice.reducer;