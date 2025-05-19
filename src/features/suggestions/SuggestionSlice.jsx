import { createSlice } from "@reduxjs/toolkit";
import { fetchSuggestedPlaces } from "./SuggestionAction";

const initialState = {
    suggestedPlaces: [],
    loading: false,
    error: null,
    next: null,
    count: 0
};

const suggestedPlacesSlice = createSlice({
    name: "suggestions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestedPlaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSuggestedPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestedPlaces = action.payload?.results;
                state.next = action.payload?.next;
                state.count = action.payload?.count;
            })
            .addCase(fetchSuggestedPlaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })   
    }
});

export default suggestedPlacesSlice.reducer;