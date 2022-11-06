import { ThemeState } from "../models/app-slice/themeSlice";

export const AppPallette = {
  default: {
    active: "#06090a",
    inactive: "#34343b",
    button: "#111517",
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
    // button: {
    //   primary: "#111517",
    //   secondary: "#dcdcde",
    //   pressed: "#1b1b1f",
    // },
    // header: {
    //   backgroundColour: "#111517",
    //   secondaryColour: "#fff",
    // },
    // list: {
    //   backgroundcolor: "#202224",
    //   selected: "#3b4680",
    //   text: "#fff",
    // },
    // backgroundColour: "#2f3236",
    // secondaryColour: "#fff",
    // title: "#fff",
    // subtitle: "#fff",
    // text: "",
  
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
