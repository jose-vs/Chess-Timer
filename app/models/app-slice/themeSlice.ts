import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppPallette } from "../../theme";

export interface ThemeState {
  primary: string;
  secondary: string;
  buttonPrimary: string;
  buttonSecondary: string;
  pressed: string;
}

const initialState: ThemeState = AppPallette.default;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeState>) => {
      state.primary = action.payload.primary;
      state.secondary = action.payload.secondary;
      state.buttonPrimary = action.payload.buttonPrimary;
      state.buttonSecondary = action.payload.buttonSecondary;
      state.pressed = action.payload.pressed;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
