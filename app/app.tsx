import React from "react";
import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./navigators";
import { store } from "./models/root-stores/root-store";
import { Provider as StoreProvider } from "react-redux";

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
