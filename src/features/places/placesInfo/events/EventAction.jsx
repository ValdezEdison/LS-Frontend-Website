// src/features/events/EventAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import eventService from './EventService';
import { handleApiError } from '../../../../utils/Helper';

// Fetch all events
export const fetchEventsByCityId = createAsyncThunk(
  'events/fetchEvents',
  async ({ city_id, page, type, levels, points }, { rejectWithValue }) => {
    try {
      const response = await eventService.getEventsByCityId(city_id, page, 1, type, levels, points);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch a single event by ID
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.getEvent(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Create a new event
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await eventService.createEvent(eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Update an existing event
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await eventService.updateEvent(eventId, eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventService.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
