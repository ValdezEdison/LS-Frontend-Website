import { createSlice } from "@reduxjs/toolkit";
import { fetchContinents } from "./ContinentAction";

const initialState = {
    continents: [],
    loading: false,
    error: null,
};

const continentSlice = createSlice({
    name: "continents",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContinents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContinents.fulfilled, (state, action) => {
                state.loading = false;
                state.continents = action.payload;
            })
            .addCase(fetchContinents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });    
    },
});


export default continentSlice.reducer;
       