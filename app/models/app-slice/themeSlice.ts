import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppPallette } from "../../theme";

export interface TimerStyles { 
  active: { 
    backgroundColour: string
    text: string
  }
  inactive: { 
    backgroundColour: string
    text: string
  }
  backgroundColour: string  
}

export interface ThemeState {
  timer: TimerStyles
  button: { 
    primary: string
    secondary: string
    pressed: string
  }
  header: { 
    backgroundColour: string
    secondaryColour: string
  }
  list: { 
    backgroundcolor: string
    selected: string
    text: string
  }
  backgroundColour: string
  secondaryColour: string
  title: string
  subtitle: string
  text: string
  
}

const initialState: ThemeState = AppPallette.default;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeState>) => {
      state = action.payload
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
