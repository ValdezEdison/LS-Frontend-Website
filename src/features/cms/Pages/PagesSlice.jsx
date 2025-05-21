import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroContent, fetchOurPartners, fetchWhoWeAre, fetchContactUs, fetchFreePages, fetchWorkWithUs, fetchFaqBlocks } from "./PagesAction";

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
    contactUsError: null,
    freePages: [],
    freePagesLoading: false,
    freePagesError: null,
    workWithUs: null,
    workWithUsLoading: false,
    workWithUsError: null,
    faqBlocks: [],
    faqBlocksLoading: false,
    faqBlocksError: null
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
            })

            .addCase(fetchFreePages.pending, (state) => {
                state.freePagesLoading = true;
                state.error = null;
            })
            .addCase(fetchFreePages.fulfilled, (state, action) => {
                state.freePagesLoading = false;                
                state.freePages = action.payload?.results;                
            })
            .addCase(fetchFreePages.rejected, (state, action) => {
                state.freePagesLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchWorkWithUs.pending, (state) => {
                state.workWithUsLoading = true;
                state.error = null;
            })
            .addCase(fetchWorkWithUs.fulfilled, (state, action) => {
                state.workWithUsLoading = false;                
                state.workWithUs = action.payload?.results;                
            })
            .addCase(fetchWorkWithUs.rejected, (state, action) => {
                state.workWithUsLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchFaqBlocks.pending, (state) => {
                state.faqBlocksLoading = true;
                state.error = null;
            })
            .addCase(fetchFaqBlocks.fulfilled, (state, action) => {
                state.faqBlocksLoading = false;                
                state.faqBlocks = action.payload?.results;                
            })
            .addCase(fetchFaqBlocks.rejected, (state, action) => {
                state.faqBlocksLoading = false;
                state.error = action.payload;
            })
            ;
    },
});

export default pagesSlice.reducer;
   