import { createSlice } from "@reduxjs/toolkit";
import { fetchCities } from "./CityAction";

const initialState = {
    cities: [],
    loading: false,
    error: null,
};

const citySlice = createSlice({
    name: "cities",
    initialState,
    reducers: { 
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;  // Update the cities state with the fetched data
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default citySlice.reducer;