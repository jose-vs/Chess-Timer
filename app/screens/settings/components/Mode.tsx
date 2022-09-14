import { Box, Button } from "native-base";
import React from "react";

import { useDispatch } from "react-redux";
import { changeMode } from "../../../models/app-slice/modeSlice";
import { ITimerInterface } from "../../../models/timer";

interface ModeProps {
  timer: ITimerInterface;
}

export const Mode = ({ timer }: ModeProps) => {
  const dispatch = useDispatch();

  return (
    <Button
      onPress={() => {
        console.log(timer)
        dispatch(changeMode(timer));
      }}
    >
      {timer.name}
    </Button>
  );
};
