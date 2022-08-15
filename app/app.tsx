import React from 'react';
import 'react-native-gesture-handler';
import {
  NativeBaseProvider,
} from "native-base";
import { AppNavigator } from './navigators';

// const theme = extendTheme({colors: AppTheme})

// type CustomThemeType = typeof theme;

// declare module 'native-base' {
//   interface ICustomTheme extends CustomThemeType {}
// }

export default function App() {
  return (
    <NativeBaseProvider>
       <AppNavigator/>
    </NativeBaseProvider>
  );
}
