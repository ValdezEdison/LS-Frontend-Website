import { createSlice } from "@reduxjs/toolkit";
import { fetchImages } from "./ImageAction";

const initialState = {
    images: [],
    loading: false,
    error: null,
};

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload?.results;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default imageSlice.reducer;