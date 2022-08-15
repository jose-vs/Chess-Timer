import { Button, Box, IconButton, Icon } from "native-base";
import React from "react";

interface MenuButtonProps {
  name: string;
  icon: any;
  color: {
    primary: string;
    secondary: string;
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
      // backgroundColor={color.primary}
      bg={color.primary}
      _pressed={{
        bg: "black", //temp
      }}
      _icon={{
        color: color.secondary,
        as: icon,
        name: name,
      }}
      onPress={onPress}
    />
  );
};
