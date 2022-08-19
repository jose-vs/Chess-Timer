import React, { useState } from "react";
import { HStack, Center, VStack } from "native-base";
import { Button } from "../../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { toMMSS } from "../../utils/toMMSS";
import { useNavigation } from "@react-navigation/native";
import type { RootState } from "../../models/root-stores/root-store";
import { useSelector, useDispatch } from "react-redux";
import { Timer } from "./components/Timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import {
  decrementTime,
  changeState,
  TimerState,
  switchState,
} from "../../models/app-slice/timeSlice";

type HomeScreenProps = StackNavigationProp<StackNavigatorParamList, "home">;

export const HomeScreen: React.FC = () => {
  //
  const dispatch = useDispatch();

  //
  const navigation = useNavigation<HomeScreenProps>();

  //
  const theme = useSelector((state: RootState) => state.theme);
  const timer = useSelector((state: RootState) => state.time);

  //
  const [timerID, settimerID] = useState<NodeJS.Timeout>();

  const onTimerPress = (timerKey: keyof TimerState) => {
    // if both are inactive
    if (!timer.timerTop.isActive && !timer.timerBot.isActive) {
      dispatch(changeState(timerKey));

      // if only one is inactive
    } else if (!timer[timerKey].isActive) {
      dispatch(switchState());
    }

    if (timerID) {
      clearInterval(timerID);
    }

    settimerID(
      setInterval(() => {
        if (timer[timerKey].time > 0) {
          dispatch(decrementTime(timerKey));
        } else {
          clearInterval(timerID as NodeJS.Timeout);
        }
      }, 998)
    );
  };

  return (
    <Center backgroundColor={theme.secondary} px={4} flex={1}>
      {/* TIMER */}
      <VStack alignItems="center">
        <Timer
          color={theme}
          isActive={timer.timerTop.isActive}
          time={toMMSS(timer.timerTop.time)}
          isTop={true}
          handlePress={onTimerPress}
        />
        <Timer
          color={theme}
          isActive={timer.timerBot.isActive}
          time={toMMSS(timer.timerBot.time)}
          handlePress={onTimerPress}
        />
      </VStack>

      {/* MENU */}
      <HStack space={"lg"} alignItems="center" position="absolute">
        {/* SETTINGS */}
        <Button
          name="settings"
          icon={Ionicons}
          isRound={true}
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
        {/* PAUSE/RESUME */}
        <Button
          name="pause"
          icon={MaterialIcons}
          isRound={true}
          onPress={() => {}}
        />
      </HStack>
    </Center>
  );
};
