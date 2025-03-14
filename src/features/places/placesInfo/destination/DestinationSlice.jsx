import { createSlice } from '@reduxjs/toolkit';
import { fetchDestinationInfo } from './DestinationAction';

const initialState = {
    destination: null,
    loading: false,
    error: null,
};

const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinationInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDestinationInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.destination = action.payload;
            })
            .addCase(fetchDestinationInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default destinationSlice.reducer;