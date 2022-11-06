import { Box, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { toMMSS, WINDOW_WIDTH } from "../../../utils";
import { ITimer, TimerState } from "../../../models/timer";
import { ThemeState } from "../../../models/app-slice/themeSlice";

interface TimerProps {
  timer: ITimer;
  styles: ThemeState;
  handlePress: (timerKey: keyof TimerState) => void;
}

export const Timer = ({ timer, styles, handlePress }: TimerProps) => {
  return (
    <Pressable
      bg={timer.isActive ? styles.active : styles.inactive}
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: WINDOW_WIDTH,
        },
        timer.name === "bot"
          ? { borderTopLeftRadius: 30, borderTopRightRadius: 30 }
          : { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
      ]}
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
        <Text fontSize={60} color={styles.text}>
          {toMMSS(timer.time)}
        </Text>
      </Box>
    </Pressable>
  );
};

const style = StyleSheet.create({
  top: {
    transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }],
  },
  bot: {},
});
