import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Center, HStack, VStack, Button } from "native-base";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Sample, ThemeButton } from "./components";
import { AppPallette } from "../../theme";
import { ThemeState, changeTheme } from "../../models/app-slice/themeSlice";

type ThemeScreenProps = StackNavigationProp<StackNavigatorParamList, "theme">;

export const ThemeScreen: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(
    useSelector((state: RootState) => state.theme)
  );

  const dispatch = useDispatch();

  const navigation = useNavigation<ThemeScreenProps>();

  const handleThemeOnPress = (theme: ThemeState) => {
    setCurrentTheme(theme);
  };

  const handleApplyOnPress = () => { 
    dispatch(changeTheme(currentTheme))
    navigation.navigate("home")
  }

  return (
    <Center px={4} flex={1}>
      <VStack alignItems={"center"}>
        {/* SAMPLE */}
        <Sample theme={currentTheme} />
        {/* THEMES */}
        <Box>
          <HStack space={"lg"} alignItems="center" m={3}>
            <ThemeButton
              theme={AppPallette.theme2}
              changeTheme={handleThemeOnPress}
            />
            <ThemeButton
              theme={AppPallette.default}
              changeTheme={handleThemeOnPress}
            />
            <ThemeButton
              theme={AppPallette.default}
              changeTheme={handleThemeOnPress}
            />
          </HStack>
          <HStack space={"lg"} alignItems="center" m={3}>
            <ThemeButton
              theme={AppPallette.theme2}
              changeTheme={handleThemeOnPress}
            />
            <ThemeButton
              theme={AppPallette.default}
              changeTheme={handleThemeOnPress}
            />
            <ThemeButton
              theme={AppPallette.default}
              changeTheme={handleThemeOnPress}
            />
          </HStack>
        </Box>
        <Button m={4} paddingLeft={10} paddingRight={10} onPress={handleApplyOnPress}>
          Apply
        </Button>
      </VStack>
    </Center>
  );
};
