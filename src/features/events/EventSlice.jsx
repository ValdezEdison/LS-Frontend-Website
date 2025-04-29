// src/features/events/EventSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, fetchEventById, createEvent, updateEvent, deleteEvent } from './EventAction';
import { toggleFavorite } from "../../features/favorites/FavoritesAction"

const initialState = {
  events: [],
  loading: false,
  error: null,
  next: null,
  count: 0,
  isFavoriteToggling: false,
  favTogglingId: null
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFavTogglingId: (state, action) => {
      state.favTogglingId = action.payload;
    },
    listUpdater: (state, action) => {
      state.events = [...state.events, ...action.payload?.results];
      state.next = action.payload.next;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload?.results || [];
        state.next = action.payload?.next;
        state.count = action.payload?.count;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch a single event
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [action.payload];
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete an event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
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
      });
  },
});

export const { setFavTogglingId, listUpdater } = eventSlice.actions;
export default eventSlice.reducer;
