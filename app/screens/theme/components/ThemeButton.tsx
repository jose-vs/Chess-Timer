import { Box, Pressable } from "native-base";
import React from "react";
import { ThemeState } from "../../../models/app-slice/themeSlice";

interface ThemeButtonProps {
  theme: ThemeState;
  changeTheme: (theme: ThemeState) => void;
}

export const ThemeButton = ({ theme, changeTheme }: ThemeButtonProps) => {
  return (
    <Box alignItems="center" m={3}>
      <Pressable onPress={() => changeTheme(theme)}>
        <Box borderColor={"coolGray.200"} rounded={"full"} shadow={3}>
          <Box
            h={15}
            w={15}
            rounded="full"
            borderTopColor={theme.active}
            borderTopWidth={60}
            borderRightColor={theme.inactive}
            borderRightWidth={60}
          ></Box>
        </Box>
      </Pressable>
    </Box>
  );
};
