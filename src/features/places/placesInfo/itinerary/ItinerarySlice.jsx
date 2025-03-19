
import { createSlice } from '@reduxjs/toolkit';
import { fetchItineriesInCity } from './ItineraryAction';

const initialState = {
  itineries: [],
  loading: false,
  error: null,
  next: null,
  count: 0
};

const itineriesInCitySlice = createSlice({
  name: 'itineriesInCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchItineriesInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineriesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.itineries = action.payload?.results || [];
        state.next = action.payload?.next;
        state.count = action.payload?.count;
      })
      .addCase(fetchItineriesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default itineriesInCitySlice.reducer;
