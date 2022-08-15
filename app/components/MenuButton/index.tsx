import { Button, Box, IconButton, Icon } from "native-base";
import React from "react";

interface MenuButtonProps {
  name: string;
  icon: any;
  color: {
    buttonPrimary: string;
    buttonSecondary: string;
  };
  onPress: () => void;
}

export const MenuButton = (props: MenuButtonProps) => {
  const { name, icon, color, onPress } = props;
  return (
    <IconButton
      size={"lg"}
      variant="solid"
      borderRadius={"full"}
      bg={color.buttonPrimary}
      _pressed={{
        bg: "black", //temp
      }}
      _icon={{
        color: color.buttonSecondary,
        as: icon,
        name: name,
      }}
      onPress={onPress}
    />
  );
};
