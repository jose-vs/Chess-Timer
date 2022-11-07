import { ThemeState } from "../models/app-slice/themeSlice";

export const AppPallette = {
  default: {
    active:"#111517",
    inactive: "#2f3236",
    button: "#06090a",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  theme2: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  theme3: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  theme4: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  theme5: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  theme6: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
    buttonSecondary: "#dcdcde",
    buttonPressed: "#1b1b1f",
    text: "#dcdcde",
  } as ThemeState,
  
};

export interface SettingsThemeState { 
  button: {
    primary: string,
    secondary: string,
    pressed: string,
  },
  header: {
    background: string,
    secondary: string,
  },
  list: {
    background: string,
    selected: string,
    text: string,
  },
  background: string,
  secondary: string,
  title: string,
  subtitle: string,
  text: string,
}


export const darkMode: SettingsThemeState = {
  button: {
    primary: "#111517",
    secondary: "#dcdcde",
    pressed: "#1b1b1f",
  },
  header: {
    background: "#111517",
    secondary: "#fff",
  },
  list: {
    background: "#202224",
    selected: "#3b4680",
    text: "#fff",
  },
  background: "#2f3236",
  secondary: "#fff",
  title: "#fff",
  subtitle: "#fff",
  text: "#fff",
};

export const lightMode: SettingsThemeState = {
  button: {
    primary: "#b0bec5",
    secondary: "#263238",
    pressed: "#cfd8dc",
  },
  header: {
    background: "#90a4ae",
    secondary: "#222",
  },
  list: {
    background: "#cfd8dc",
    selected: "#90a4ae",
    text: "#222",
  },
  background: "#eceff1",
  secondary: "#fff",
  title: "#222",
  subtitle: "#222",
  text: "#263238",
};
