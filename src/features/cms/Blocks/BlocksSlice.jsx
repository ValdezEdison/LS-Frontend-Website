import { createSlice } from "@reduxjs/toolkit";
import { fetchHeaderBlocks, fetchNewsLetterBlocks, fetchBannerBlocks, fetchFooterBlocks, fetchMarketingCampaigns } from "./BlocksAction";

const initialState = {
    headerBlocks: [],
    headerLoading: false,
    headerError: null,
    
    newsLetterBlocks: [],
    newsLetterLoading: false,
    newsLetterError: null,
    
    bannerBlocks: [],
    bannerLoading: false,
    bannerError: null,

    footerBlocks: [],
    footerLoading: false,
    footerError: null,

    marketingCampaigns: {
        H1: {
            data: [],
            loading: false,
            error: null
        },
        H2: {
            data: [],
            loading: false,
            error: null
        }
    }
};

const blocksSlice = createSlice({
    name: "blocks",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Header Blocks
            .addCase(fetchHeaderBlocks.pending, (state) => {
                state.headerLoading = true;
                state.headerError = null;
            })
            .addCase(fetchHeaderBlocks.fulfilled, (state, action) => {
                state.headerLoading = false;
                state.headerBlocks = action.payload;
            })
            .addCase(fetchHeaderBlocks.rejected, (state, action) => {
                state.headerLoading = false;
                state.headerError = action.payload;
            })

            // Newsletter Blocks
            .addCase(fetchNewsLetterBlocks.pending, (state) => {
                state.newsLetterLoading = true;
                state.newsLetterError = null;
            })
            .addCase(fetchNewsLetterBlocks.fulfilled, (state, action) => {
                state.newsLetterLoading = false;
                state.newsLetterBlocks = action.payload?.results;
            })
            .addCase(fetchNewsLetterBlocks.rejected, (state, action) => {
                state.newsLetterLoading = false;
                state.newsLetterError = action.payload;
            })

            // Banner Blocks
            .addCase(fetchBannerBlocks.pending, (state) => {
                state.bannerLoading = true;
                state.bannerError = null;
            })
            .addCase(fetchBannerBlocks.fulfilled, (state, action) => {
                state.bannerLoading = false;
                state.bannerBlocks = action.payload?.results;
            })
            .addCase(fetchBannerBlocks.rejected, (state, action) => {
                state.bannerLoading = false;
                state.bannerError = action.payload;
            })

            // Footer Blocks
            .addCase(fetchFooterBlocks.pending, (state) => {
                state.footerLoading = true;
                state.footerError = null;
            })
            .addCase(fetchFooterBlocks.fulfilled, (state, action) => {
                state.footerLoading = false;
                state.footerBlocks = action.payload?.results;
            })
            .addCase(fetchFooterBlocks.rejected, (state, action) => {
                state.footerLoading = false;
                state.footerError = action.payload;
            })

            // Marketing Campaigns
            .addCase(fetchMarketingCampaigns.pending, (state, action) => {
                const { name } = action.meta.arg;
                state.marketingCampaigns[name] = {
                    ...state.marketingCampaigns[name],
                    loading: true,
                    error: null
                };
            })
            .addCase(fetchMarketingCampaigns.fulfilled, (state, action) => {
                const { name } = action.meta.arg;
                state.marketingCampaigns[name] = {
                    loading: false,
                    data: action.payload?.results || [],
                    error: null
                };
            })
            .addCase(fetchMarketingCampaigns.rejected, (state, action) => {
                const { name } = action.meta.arg;
                state.marketingCampaigns[name] = {
                    ...state.marketingCampaigns[name],
                    loading: false,
                    error: action.payload
                };
            });
    },
});

export default blocksSlice.reducer;