// src/features/events/EventSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchEventsByCityId } from './EventAction';
import { toggleFavorite } from '../../../favorites/FavoritesAction';

const initialState = {
  events: [],
  loading: false,
  error: null,
  next: null,
  isFavoriteToggling: false,
  favTogglingId: null
};

const eventByCitySlice = createSlice({
  name: 'eventsByCity',
  initialState,
  reducers: {
    setFavTogglingId: (state, action) => {
      state.favTogglingId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchEventsByCityId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByCityId.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload?.results || [];
        state.next = action.payload?.next;
      })
      .addCase(fetchEventsByCityId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle favorite
      .addCase(toggleFavorite.pending, (state) => {
        state.isFavoriteToggling = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isFavoriteToggling = false;
        state.favTogglingId = null;
        
        const updatedevents = state.events.map(event => {
          if (event.id === action.payload.id) {
            return {
              ...event,
              is_fav: action.payload.response.detail === "Marked as favorite"
            };
          }
          return event;
        });
        
        state.events = updatedevents;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isFavoriteToggling = false;
        state.error = action.payload;
      })

  },
});
export const { setFavTogglingId } = eventByCitySlice.actions;
export default eventByCitySlice.reducer;
