import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Center, HStack, VStack } from "native-base";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Sample, ThemeButton } from "./components";

import { AppPallette } from "../../theme";

type ThemeScreenProps = StackNavigationProp<StackNavigatorParamList, "theme">;

export const ThemeScreen: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(
    useSelector((state: RootState) => state.theme)
  );
  const navigation = useNavigation<ThemeScreenProps>();

  return (
    <Center px={4} flex={1}>
      <VStack alignItems={"center"}>
        {/* SAMPLE */}
        {/* <Sample theme={currentTheme} /> */}
        {/* THEMES */}
        <Box>
          <HStack space={"lg"} alignItems="center">
            <ThemeButton theme={AppPallette.default}/>
            <ThemeButton theme={AppPallette.default}/>
            <ThemeButton theme={AppPallette.default}/>
          </HStack>
          <HStack space={"lg"} alignItems="center"></HStack>
        </Box>
      </VStack>
    </Center>
  );
};
