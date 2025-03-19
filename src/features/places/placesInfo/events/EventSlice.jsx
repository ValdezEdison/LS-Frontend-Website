// src/features/events/EventSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchEventsByCityId } from './EventAction';

const initialState = {
  events: [],
  loading: false,
  error: null,
  next: null,
};

const eventByCitySlice = createSlice({
  name: 'eventsByCity',
  initialState,
  reducers: {},
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

  },
});

export default eventByCitySlice.reducer;
