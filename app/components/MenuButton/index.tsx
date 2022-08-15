import { useNavigation } from "@react-navigation/native";
import { Button, Box, IconButton, Icon } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";

interface MenuButtonProps {
  name: string;
  icon: any;
  onPress: () => void
}

export const MenuButton = (props: MenuButtonProps) => {
  const { name, icon, onPress } = props;
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation();
  return (
    <IconButton
      size={"lg"}
      variant="solid"
      borderRadius={"full"}
      bg={theme.buttonPrimary}
      _pressed={{
        bg: "black", //temp
      }}
      _icon={{
        color: theme.buttonSecondary,
        as: icon,
        name: name,
      }}
      onPress={onPress}
    />
  );
};
