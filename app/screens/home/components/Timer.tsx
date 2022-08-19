import { Center, Box, Pressable } from "native-base";
import React, { useState, useEffect, MenuHTMLAttributes } from "react";
import { toMMSS } from "../../../utils/toMMSS";
import { WINDOW_WIDTH } from "../../../utils";
import { TimerState } from "../../../models/app-slice/timeSlice";

interface TimerProps {
  color: {
    primary: string;
    secondary: string;
  };
  isActive: boolean;
  isTop?: boolean;
  time: string;
  handlePress: (key: keyof TimerState) => void;
}

export const Timer = ({
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
        handlePress(isTop ? "timerBot" : "timerTop");
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
