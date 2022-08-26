import { Box, Pressable } from "native-base";
import React from "react";
import { WINDOW_WIDTH } from "../../../utils";
import { TimerType } from "../../../models/timer";

interface TimerProps {
  name: TimerType
  color: {
    primary: string;
    secondary: string;
  };
  isActive: boolean;
  isTop?: boolean;
  time: string;
  handlePress: (timer: TimerType) => void;
}

export const Timer = ({
  name, 
  color,
  isActive,
  isTop,
  time,
  handlePress,
}: TimerProps) => {
  return (
    <Pressable
      bg={isActive ? color.primary : color.secondary}
      borderRadius="3xl"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: WINDOW_WIDTH,
        
      }}
      onPress={() => {
        handlePress(name);
      }}
    >
      <Box
        style={
          isTop
            ? { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }
            : {}
        }
      >
        {time}
      </Box>
    </Pressable>
  );
};
