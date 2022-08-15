import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="theme"
        component={ThemeScreen}
        options={{
          headerShown: true,
          headerTitle: "Theme",
          headerBackTitleVisible: true,
        }}
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
