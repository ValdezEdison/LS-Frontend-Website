import { createSlice } from "@reduxjs/toolkit";
import { fetchUnifiedSearchResults } from "./UnifiedSearchAction";

const initialState = {
    unifiedSearchResults: [],
    loading: false,
    error: null,
};

const unifiedSearchSlice = createSlice({
    name: "unifiedSearch",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnifiedSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnifiedSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.unifiedSearchResults = action.payload;
            })
            .addCase(fetchUnifiedSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default unifiedSearchSlice.reducer;