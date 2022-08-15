import { VStack, Center, Box, HStack } from "native-base";
import React from "react";
import { ThemeState } from "../../../models/app-slice/themeSlice";

interface SampleProps {
  theme: ThemeState;
}

export const Sample = ({ theme }: SampleProps) => {
  const { primary, secondary } = theme;
  return (
    <VStack justifyContent={"center"} >
      <Center h="40" w="20" backgroundColor={primary} />
      <Center h="40" w="20" backgroundColor={secondary} />
    </VStack>
  );
};
