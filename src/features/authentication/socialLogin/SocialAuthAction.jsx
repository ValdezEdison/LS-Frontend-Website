import { createAsyncThunk } from "@reduxjs/toolkit";
import SocialAuthService from "./SocialAuthService";
import { handleApiError, setAuthTokens } from "../../../utils/Helper";

export const socialLogin = createAsyncThunk(
    "user/socialLogin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await SocialAuthService.socialLogin(data);
            console.log(response, 'response');
            setAuthTokens(response, false);
            return response;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);