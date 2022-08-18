import { Button, Box, HStack } from "native-base";
import React from "react";
import { ThemeState } from "../../../models/app-slice/themeSlice";

interface SampleProps {
  theme: ThemeState
}

export const Sample = ({ theme }: SampleProps) => {
  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      m={10}
      h={"72"}
      w={"40"}
      rounded="lg"
      borderTopColor={theme.primary}
      borderTopWidth={"150"}
      borderBottomColor={theme.secondary}
      borderBottomWidth={"150"}
      shadow={3}
    >
      <Button
        h={8}
        w={8}
        bg={theme.buttonPrimary}
        borderRadius={"full"}
        shadow={3}
      />
    </Box>
  );
};
