import React, { useEffect, useState } from "react";
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
import { RootState } from "../models/root-stores/root-store";
import { useSelector } from "react-redux";

export type StackNavigatorParamList = {
  home: undefined;
  settings: undefined;
  theme: undefined;
  mode: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

const AppStack = () => {

  const theme = useSelector((state: RootState) => state.theme);

  const screenHeaderStyles: StackNavigationOptions = {
    headerShown: true,
    headerTitle: "",
    headerStyle: {
      backgroundColor:theme.header.backgroundColour,
    },
    headerTintColor: theme.header.secondaryColour,
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
