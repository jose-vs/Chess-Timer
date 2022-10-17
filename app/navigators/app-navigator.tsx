import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, SettingsScreen, ThemeScreen, NewModeScreen } from "../screens";

export type StackNavigatorParamList = {
  home: undefined;
  settings: undefined;
  theme: undefined;
  mode: undefined
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
        options={{
          headerShown: true,
          headerTitle: "Settings",
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="mode"
        component={NewModeScreen}
        options={{
          headerShown: true,
          headerTitle: "Create New Mode",
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

// export type TabNavigatorParamList = {
//   mode: undefined;
// };

// const Tab = createBottomTabNavigator<TabNavigatorParamList>();


// const SettingsTab = () => { 
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="mode" component={NewModeScreen}/>
//     </Tab.Navigator>
//   )
// }



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
