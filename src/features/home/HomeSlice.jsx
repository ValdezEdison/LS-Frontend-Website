import { createSlice } from "@reduxjs/toolkit";
import { fetchRandomSites } from "./HomeAction";

const initialState = {
    randomPlaces: [],
    loading: false,
    error: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        resetRandomPlaces: (state) => {
            state.randomPlaces = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomSites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomSites.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.randomPlaces = action.payload?.results;
            })
            .addCase(fetchRandomSites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });        
    },
});

export const { resetRandomPlaces } = homeSlice.actions;
export default homeSlice.reducer;