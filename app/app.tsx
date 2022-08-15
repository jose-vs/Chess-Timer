import React from 'react';
import {
  NativeBaseProvider,
  // extendTheme,
} from "native-base";
// import { AppTheme } from './theme';
import { HomeScreen } from './screens';
// import { AppNavigator } from './navigators';

// const theme = extendTheme({colors: AppTheme})

// type CustomThemeType = typeof theme;

// declare module 'native-base' {
//   interface ICustomTheme extends CustomThemeType {}
// }

export default function App() {
  return (
    <NativeBaseProvider>
       <HomeScreen/>
    </NativeBaseProvider>
  );
}
