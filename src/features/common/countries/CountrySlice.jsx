import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries, fetchCountriesPhonecodes } from "./CountryAction";

const initialState = {
    countries: [],
    loading: false,
    error: null,
    phoneCodes: []
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
            })

            .addCase(fetchCountriesPhonecodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountriesPhonecodes.fulfilled, (state, action) => {
                state.loading = false;
                state.phoneCodes = action.payload;
            })
            .addCase(fetchCountriesPhonecodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default countrySlice.reducer;