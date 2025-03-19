
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlacesInCity } from './PlacesAction';

const initialState = {
  placesList: [],
  loading: false,
  error: null,
  next: null,
  count: 0
};

const placesInCitySlice = createSlice({
  name: 'placesInCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchPlacesInCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlacesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.placesList = action.payload?.results || [];
        state.next = action.payload?.next;
        state.count = action.payload?.count;
      })
      .addCase(fetchPlacesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default placesInCitySlice.reducer;
