import React, { useState } from "react";
import { HStack, Center, VStack, Box } from "native-base";
import { MenuButton } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AppPallette } from "../../theme";
import { Timer } from "./components/Timer";


export const HomeScreen = () => {
  const [theme, setTheme] = useState(AppPallette.default);

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
          color={{ primary: "primary.600", secondary: "secondary.100" }}
          onPress={() => {
            console.log("hi");
          }}
        />
        {/* PAUSE/RESUME */}
        <MenuButton
          name="pause"
          icon={MaterialIcons}
          color={{ primary: "primary.600", secondary: "secondary.100" }}
          onPress={() => {}}
        />
      </HStack>
    </Center>
  );
};
