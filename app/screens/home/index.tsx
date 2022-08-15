import React from "react";
import { HStack, Center, VStack, Box } from "native-base";
import { MenuButton } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { RootState } from "../../models/root-stores/root-store";
import { useSelector } from "react-redux";
import { Timer } from "./components/Timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";

type HomeScreenProps = StackNavigationProp<StackNavigatorParamList, "home">;

export const HomeScreen: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<HomeScreenProps>();

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
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
        {/* PAUSE/RESUME */}
        <MenuButton name="pause" icon={MaterialIcons} onPress={() => {}} />
      </HStack>
    </Center>
  );
};
