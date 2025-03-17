import { createSlice } from "@reduxjs/toolkit";
import { fetchHeaderBlocks } from "./BlockAction";

const initialState = {
    headerBlocks: [],
    loading: false,
    error: null,
};

const blockSlice = createSlice({
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
            });
    },
});

export default blockSlice.reducer;