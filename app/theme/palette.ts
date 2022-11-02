import { ThemeState } from "../models/app-slice/themeSlice";

export const AppPallette = {

  default: { 
    timer: { 
      active: { 
        backgroundColour: "#06090a",
        text: "#dcdcde",
      },
      inactive: { 
        backgroundColour: "#34343b",
        text: "#dcdcde",
      },
      backgroundColour: "#34343b",  
    },
    button: { 
      primary: "#111517",
      secondary: "#dcdcde",
      pressed: "#1b1b1f",
    },
    header: { 
      backgroundColour: "#111517",
      secondaryColour: "#fff",
    },
    list: { 
      backgroundcolor: "#202224",
      selected: "#3b4680",
      text: "#fff",
    },
    backgroundColour: "#2f3236",
    secondaryColour: "#fff",
    title: "#fff",
    subtitle: "#fff",
    text: "",
  } as ThemeState


  // default: { 
  //   primary: "gray.600" , 
  //   secondary: "gray.300", 
  //   buttonPrimary: "tertiary.900",
  //   buttonSecondary: "tertiary.100",
  //   pressed: "black"
  // } as ThemeState, 
  // theme2: { 
  //   primary: "amber.600" , 
  //   secondary: "amber.300", 
  //   buttonPrimary: "amber.800",
  //   buttonSecondary: "orange.100",
  //   pressed: "orange.900"
  // } as ThemeState
  
};
