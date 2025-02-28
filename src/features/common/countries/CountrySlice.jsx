import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "./CountryAction";

const initialState = {
    countries: [],
    loading: false,
    error: null,
};  

const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default countrySlice.reducer;