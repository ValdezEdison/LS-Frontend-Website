import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    isWarningOpen: false,
    isPopUpOpen: false,
    isAddToPopupOpen: false,
    emailConfirmation: {
      email: "",
      isConfirmPopupOpen: false,
    }
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
    openAddToTripPopup: (state) => {
      state.isOpen = true;
      state.isAddToPopupOpen = true;
    },
    closeAddToTripPopup: (state) => {
      state.isOpen = false;
      state.isAddToPopupOpen = false;
    },
    openEmailConfirmationPopup: (state, action) => {
      state.emailConfirmation = {
        email: action.payload,
        isConfirmPopupOpen: true
      };
    },
    closeEmailConfirmationPopup: (state) => {
      state.emailConfirmation.email = "";
      state.emailConfirmation.isConfirmPopupOpen = false;
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
  openAddToTripPopup,
  closeAddToTripPopup,
  openEmailConfirmationPopup,
  closeEmailConfirmationPopup
} = popupSlice.actions;
export default popupSlice.reducer;
