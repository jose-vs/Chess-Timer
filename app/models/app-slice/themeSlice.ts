import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppPallette } from "../../theme";

export interface ThemeState {
  active: string;
  inactive: string;
  button: string;
  buttonSecondary: string;
  buttonPressed: string;
  text: string;
}

const initialState: ThemeState = AppPallette.default;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeState>) => {
      state = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
