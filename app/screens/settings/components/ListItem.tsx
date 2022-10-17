import React from "react";
import { Box } from "native-base";
import { Platform, TouchableNativeFeedback, TouchableHighlight } from "react-native";
import { ITimerInterface } from "../../../models/timer";

interface ListItemProps {
  onPress: (mode: ITimerInterface) => void;
  onLongPress: (mode: ITimerInterface) => void;
}

export const ListItem = ({ onPress, onLongPress }: ListItemProps) => {
  
};
