import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  HomeScreen,
  SettingsScreen,
  ThemeScreen,
  NewModeScreen,
} from "../screens";
import { Appearance } from "react-native";
import { darkMode, lightMode } from "../theme";

export type StackNavigatorParamList = {
  home: undefined;
  settings: undefined;
  theme: undefined;
  mode: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

const AppStack = () => {
  const isDarkMode: boolean = Appearance.getColorScheme() === "dark";

  const screenHeaderStyles: StackNavigationOptions = {
    headerShown: true,
    headerTitle: "",
    headerStyle: {
      backgroundColor: isDarkMode
        ? darkMode.header.background
        : lightMode.header.background,
    },
    headerTintColor: isDarkMode
      ? darkMode.header.secondary
      : lightMode.header.secondary,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: "Back",
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={screenHeaderStyles}
      />
      <Stack.Screen
        name="mode"
        component={NewModeScreen}
        options={screenHeaderStyles}
      />
      <Stack.Screen
        name="theme"
        component={ThemeScreen}
        options={screenHeaderStyles}
      />
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

AppNavigator.displayName = "AppNavigator";

const exitRoutes = ["welcome"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
