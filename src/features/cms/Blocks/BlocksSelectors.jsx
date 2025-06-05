import { createSelector } from '@reduxjs/toolkit';

export const selectMarketingCampaigns = (state) => state.cms.blocks.marketingCampaigns;
export const selectAnalyticsSettings = (state) => state.cms.blocks.analyticsSettings.analytics;

export const selectCampaignsByName = createSelector(
  [selectMarketingCampaigns, (_, name) => name],
  (campaigns, name) => campaigns[name] || { 
    data: [], 
    loading: false, 
    error: null 
  }
);

export const selectAnalyticsData = createSelector(
  [selectAnalyticsSettings],
  (analyticsSettings) => analyticsSettings || { 
    data: [], 
    loading: false, 
    error: null 
  }
);