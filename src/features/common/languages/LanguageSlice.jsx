import { createSlice } from "@reduxjs/toolkit";
import { fetchLanguages } from "./LanguageAction";

const initialState = {
    languages: [],
    loading: false,
    error: null,
};

const languageSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default languageSlice.reducer;