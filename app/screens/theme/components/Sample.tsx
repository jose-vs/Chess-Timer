import { Button, Box, HStack } from "native-base";
import React from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../utils";
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
      h={72}
      w={40}
      rounded="lg"
      borderTopColor={theme.timer.active.backgroundColour}
      borderTopWidth={"150"}
      borderBottomColor={theme.timer.inactive.backgroundColour}
      borderBottomWidth={"150"}
      shadow={3}
    >
      <Button
        h={8}
        w={8}
        onPress={() => { 
          console.log("[HEIGHT]: ", WINDOW_HEIGHT)
          console.log("[WIDTH]: ", WINDOW_WIDTH)
        }}
        bg={theme.button.primary}
        borderRadius={"full"}
        shadow={3}
      />
    </Box>
  );
};
