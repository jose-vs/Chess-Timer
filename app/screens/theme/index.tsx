import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Center,
  HStack,
  VStack,
  Button,
  ScrollView,
  theme,
} from "native-base";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Sample, ThemeButton } from "./components";
import { AppPallette, darkMode, lightMode } from "../../theme";
import { ThemeState, changeTheme } from "../../models/app-slice/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeScreenProps = StackNavigationProp<StackNavigatorParamList, "theme">;

export const ThemeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ThemeScreenProps>();

  const [currentTheme, setCurrentTheme] = useState(
    useSelector((state: RootState) => state.theme)
  );

  const handleThemeOnPress = (theme: ThemeState) => {
    setCurrentTheme(theme);
  };

  const handleApplyOnPress = () => {
    dispatch(changeTheme(currentTheme));
    storeTheme();
    navigation.navigate("home");
  };

  const storeTheme = async () => {
    try {
      await AsyncStorage.mergeItem("_theme", JSON.stringify(currentTheme));

      const theme = await AsyncStorage.getItem("_theme");
      if (theme) console.log("[THEME SAVED SUCCESFULLY]: " + currentTheme);
      else console.log("[THEME SAVED UNSUCCESFULLY]: " + currentTheme);
    } catch (e) {
      // saving error
    }
  };

  return (
    <ScrollView
      _light={{ bg: lightMode.background }}
      _dark={{ bg: darkMode.background }}
    >
      <Center px={4} flex={1}>
        <VStack alignItems={"center"}>
          {/* SAMPLE */}
          <Sample theme={currentTheme} />
          {/* THEMES */}
          <Box>
            <HStack space={"lg"} alignItems="center" m={3}>
              <ThemeButton
                theme={AppPallette.default}
                changeTheme={handleThemeOnPress}
              />
              <ThemeButton
                theme={AppPallette.theme2}
                changeTheme={handleThemeOnPress}
              />
              <ThemeButton
                theme={AppPallette.theme3}
                changeTheme={handleThemeOnPress}
              />
            </HStack>
            <HStack space={"lg"} alignItems="center" m={3}>
              <ThemeButton
                theme={AppPallette.theme4}
                changeTheme={handleThemeOnPress}
              />
              <ThemeButton
                theme={AppPallette.theme5}
                changeTheme={handleThemeOnPress}
              />
              <ThemeButton
                theme={AppPallette.theme6}
                changeTheme={handleThemeOnPress}
              />
            </HStack>
          </Box>
          <Button
            m={8}
            paddingLeft={10}
            paddingRight={10}
            onPress={handleApplyOnPress}
            _light={{ bg: lightMode.button.primary }}
            _dark={{ bg: darkMode.button.primary }}
          >
            Apply
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};
