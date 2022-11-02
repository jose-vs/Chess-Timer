import { IconButton } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";

interface ButtonProps {
  name: string;
  icon: any;
  isRound?: boolean
  onPress: () => void
}

export const Button = (props: ButtonProps) => {
  const { name, icon, isRound, onPress } = props;
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <IconButton
      size={"lg"}
      variant="solid"
      borderRadius={isRound ? "full" : "lg"}
      bg={theme.button.primary}
      _pressed={{
        bg: theme.button.pressed, 
      }}
      _icon={{
        color: theme.button.secondary,
        as: icon,
        name: name,
      }}
      onPress={onPress}
    />
  );
};
