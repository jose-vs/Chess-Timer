import { Circle, Center, Button, HStack } from "native-base";
import React from "react";
import { ThemeState } from "../../../models/app-slice/themeSlice";

interface ThemeButtonProps {
  theme: ThemeState;
}

export const ThemeButton = ({ theme }: ThemeButtonProps) => {
  const { primary, secondary } = theme;
  return (
    <Button size="lg" variant="outline" rounded={"full"} >
      
    </Button>
  );
};
