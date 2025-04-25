import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroContent, fetchOurPartners } from "./PagesAction";

const initialState = {
    heroContent: null,
    loading: false,
    error: null,
    ourPartners: [],
    ourPartnersLoading: false
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
            })

            .addCase(fetchOurPartners.pending, (state) => {
                state.ourPartnersLoading = true;
                state.error = null;
            })
            .addCase(fetchOurPartners.fulfilled, (state, action) => {
                state.ourPartnersLoading = false;                
                state.ourPartners = action.payload?.results;                
            })
            .addCase(fetchOurPartners.rejected, (state, action) => {
                state.ourPartnersLoading = false;
                state.error = action.payload;
            });
    },
});

export default pagesSlice.reducer;
   