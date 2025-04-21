import { createSlice } from "@reduxjs/toolkit";
import { fetchHeaderBlocks, fetchNewsLetterBlocks, fetchBannerBlocks } from "./BlocksAction";

const initialState = {
    headerBlocks: [],
    loading: false,
    error: null,
    newsLetterBlocks: [],
    bannerBlocks: []
    
};

const blocksSlice = createSlice({
    name: "blocks",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderBlocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHeaderBlocks.fulfilled, (state, action) => {
                state.loading = false;
                state.headerBlocks = action.payload;
            })
            .addCase(fetchHeaderBlocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchNewsLetterBlocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsLetterBlocks.fulfilled, (state, action) => {
                state.loading = false;
                state.newsLetterBlocks = action.payload?.results;
            })
            .addCase(fetchNewsLetterBlocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchBannerBlocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBannerBlocks.fulfilled, (state, action) => {
                state.loading = false;
                state.bannerBlocks = action.payload?.results;
            })
            .addCase(fetchBannerBlocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blocksSlice.reducer;