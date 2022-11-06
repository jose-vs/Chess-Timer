import { Button, Box } from "native-base";
import React from "react";
import { ThemeState } from "../../../models/app-slice/themeSlice";
import { Appearance } from "react-native";

interface SampleProps {
  theme: ThemeState;
}

export const Sample = ({ theme }: SampleProps) => {
  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      m={10}
      h={72}
      w={40}
      rounded="lg"
      borderTopColor={theme.active}
      borderTopWidth={"150"}
      borderBottomColor={theme.inactive}
      borderBottomWidth={"150"}
      shadow={3}
    >
      <Button
        h={8}
        w={8}
        onPress={() => {
          console.log(Appearance.getColorScheme());
        }}
        bg={theme.button}
        borderRadius={"full"}
        shadow={3}
      />
    </Box>
  );
};
