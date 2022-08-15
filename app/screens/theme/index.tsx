import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";

type ThemeScreenProps = StackNavigationProp<StackNavigatorParamList, "theme">;

export const ThemeScreen: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<ThemeScreenProps>();

  return (
    <Box>
      bruh
    </Box>
    
  );
};
