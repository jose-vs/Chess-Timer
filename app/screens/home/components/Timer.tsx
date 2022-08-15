import { Center } from "native-base";
import React from "react";
import { WINDOW_WIDTH } from "../../../utils";

interface TimerProps {
  color: {
    primary: string;
    secondary: string;
  };
  isActive: boolean;
}

export const Timer = (props: TimerProps) => {
  const { color, isActive } = props;
  return (
    <Center
      bg={isActive ? color.primary : color.secondary}
      borderRadius="3xl"
      style={{
        flex: 1,
        alignItems: "center",
        width: WINDOW_WIDTH,
      }}
    >
      bruh
    </Center>
  );
};
