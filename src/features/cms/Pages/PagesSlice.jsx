import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroContent } from "./PagesAction";

const initialState = {
    heroContent: null,
    loading: false,
    error: null,
};

const pagesSlice = createSlice({
    name: "cms/pages",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHeroContent.fulfilled, (state, action) => {
                state.loading = false;
                state.heroContent = action.payload?.results?.[0];
            })
            .addCase(fetchHeroContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default pagesSlice.reducer;
   