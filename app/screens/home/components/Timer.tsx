import { Box, Pressable } from "native-base";
import React from "react";
import { WINDOW_WIDTH } from "../../../utils";
import { ITimer, TimerState} from "../../../models/timer";

interface TimerProps {
  timer: ITimer
  color: {
    primary: string;
    secondary: string;
  };
  handlePress: (timerKey: keyof TimerState) => void;
}

export const Timer = ({
  timer, 
  color,
  handlePress,
}: TimerProps) => {
  return (
    <Pressable
      bg={timer.isActive ? color.primary : color.secondary}
      borderRadius="3xl"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: WINDOW_WIDTH,
        
      }}
      onPress={() => {
        handlePress(timer.name);
      }}
    >
      <Box
        style={
          timer.name === "top"
            ? { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }
            : {}
        }
      >
        {timer.time}
      </Box>
    </Pressable>
  );
};
