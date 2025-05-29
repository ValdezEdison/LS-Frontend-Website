import { createSelector } from '@reduxjs/toolkit';

export const selectMarketingCampaigns = (state) => state.cms.blocks.marketingCampaigns;

export const selectCampaignsByName = createSelector(
  [selectMarketingCampaigns, (_, name) => name],
  (campaigns, name) => campaigns[name] || { 
    data: [], 
    loading: false, 
    error: null 
  }
);