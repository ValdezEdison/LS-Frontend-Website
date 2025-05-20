import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroContent, fetchOurPartners, fetchWhoWeAre, fetchContactUs } from "./PagesAction";

const initialState = {
    heroContent: null,
    loading: false,
    error: null,
    ourPartners: [],
    ourPartnersLoading: false,
    ourPartnersError: null,
    whoWeAre: null,
    whoWeAreLoading: false,
    whoWeAreError: null,
    contactUs: null,
    contactUsLoading: false,
    contactUsError: null
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
            })

            .addCase(fetchWhoWeAre.pending, (state) => {
                state.whoWeAreLoading = true;
                state.error = null;
            })
            .addCase(fetchWhoWeAre.fulfilled, (state, action) => {
                state.whoWeAreLoading = false;                
                state.whoWeAre = action.payload?.results;                
            })
            .addCase(fetchWhoWeAre.rejected, (state, action) => {
                state.whoWeAreLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchContactUs.pending, (state) => {
                state.contactUsLoading = true;
                state.error = null;
            })
            .addCase(fetchContactUs.fulfilled, (state, action) => {
                state.contactUsLoading = false;                
                state.contactUs = action.payload?.results;                
            })
            .addCase(fetchContactUs.rejected, (state, action) => {
                state.contactUsLoading = false;
                state.error = action.payload;
            });
    },
});

export default pagesSlice.reducer;
   