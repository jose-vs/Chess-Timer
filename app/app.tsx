import React from "react";
import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./navigators";
import { store } from "./models/root-stores/root-store";
import { Provider as StoreProvider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEFAULT_TIMER_MODES,
} from "./models/timer";

const storeData = async () => {
  try {
    /**
     * store timer modes
     */
    DEFAULT_TIMER_MODES.forEach(async (mode) => {
      const mode_json = JSON.stringify(mode);
      await AsyncStorage.setItem(mode.key, mode_json);
    });
  } catch (e) {
    // saving error
  }
};

storeData();

// const theme = extendTheme({colors: AppTheme})

// type CustomThemeType = typeof theme;

// declare module 'native-base' {
//   interface ICustomTheme extends CustomThemeType {}
// }

export default function App() {
  return (
    <NativeBaseProvider>
      <StoreProvider store={store}>
        <AppNavigator />
      </StoreProvider>
    </NativeBaseProvider>
  );
}
