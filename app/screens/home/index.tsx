import React, { useState } from "react";
import { HStack, Center, VStack, Box } from "native-base";
import { MenuButton } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import type { RootState } from "../../models/root-stores/root-store";
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from "../../models/app-slice/themeSlice";
import { AppPallette } from "../../theme";
import { Timer } from "./components/Timer";


export const HomeScreen = () => {
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  return (
    <Center backgroundColor={theme.secondary} px={4} flex={1}>
      {/* TIMER */}
      <VStack alignItems="center">
        <Timer color={theme} isActive={false} />
        <Timer color={theme} isActive={true} />
      </VStack>

      {/* MENU */}
      <HStack space={"lg"} alignItems="center" position="absolute">
        {/* SETTINGS */}
        <MenuButton
          name="settings"
          icon={Ionicons}
          color={theme}
          onPress={() => {
            dispatch(changeTheme(AppPallette.theme2));
          }}
        />
        {/* PAUSE/RESUME */}
        <MenuButton
          name="pause"
          icon={MaterialIcons}
          color={theme}
          onPress={() => {
            dispatch(changeTheme(AppPallette.default));
          }}
        />
      </HStack>
    </Center>
  );
};
