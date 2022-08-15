import React from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, SettingsScreen, ThemeScreen } from "../screens";

export type StackNavigatorParamList = {
  home: undefined;
  settings: undefined;
  theme: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="theme" component={ThemeScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

