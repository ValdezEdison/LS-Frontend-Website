import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    isWarningOpen: false,
    isPopUpOpen: false,
  },
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
    openWarningPopup: (state) => {
      state.isWarningOpen = true;
    },
    closeWarningPopup: (state) => {
      state.isWarningOpen = false;
    },

    openPasswordPopup: (state) => {
      state.isPopUpOpen = true;
    },
    closePasswordPopup: (state) => {
      state.isPopUpOpen = false;
    },
  },
});

export const {
  openPopup,
  closePopup,
  openWarningPopup,
  closeWarningPopup,
  openPasswordPopup,
  closePasswordPopup,
} = popupSlice.actions;
export default popupSlice.reducer;
