import { useNavigation } from "@react-navigation/native";
import { Box, Button } from "native-base";
import React from "react";

import { useDispatch } from "react-redux";
import { SettingsScreenProps } from "..";
import { changeMode } from "../../../models/app-slice/modeSlice";
import { ITimerInterface } from "../../../models/timer";

interface ModeProps {
  timer: ITimerInterface;
}

export const Mode = ({ timer}: ModeProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<SettingsScreenProps>();


  const handleOnPress = () => {
    dispatch(changeMode(timer));
    navigation.navigate("home")
  }

  return (
    <Button
      onPress={handleOnPress}
    >
      {timer.name}
    </Button>
  );
};
