import { createSlice } from "@reduxjs/toolkit";
import { fetchCitiesInContinent } from "./ExploreAction";

const initialState = {
    citiesInContinent: [],
    loading: false,
    error: null,
};

const exploreSlice = createSlice({
    name: "explore",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitiesInContinent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCitiesInContinent.fulfilled, (state, action) => {
                state.loading = false;
                state.citiesInContinent = action.payload;
            })
            .addCase(fetchCitiesInContinent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default exploreSlice.reducer;