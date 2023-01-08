import React, { useState, useEffect } from "react";
import { HStack, Center, VStack } from "native-base";
import { Button } from "../../components";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { RootState } from "../../models/root-stores/root-store";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "./components/Timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { TimerState } from "../../models/timer";
import { changeStatus } from "../../models/app-slice/modeSlice";

type HomeScreenProps = StackNavigationProp<StackNavigatorParamList, "home">;

const UPDATE_DELAY: number = 998;

export const HomeScreen: React.FC = () => {
  /**
   *
   */
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenProps>();
  const isFocused = useIsFocused();

  //
  const theme = useSelector((state: RootState) => state.theme);
  const timerInterface = useSelector((state: RootState) => state.mode);

  const initialState: TimerState = {
    top: {
      name: "top",
      isActive: false,
      time: timerInterface.startTime,
    },
    bot: {
      name: "bot",
      isActive: false,
      time: timerInterface.startTime,
    },
  };

  //
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [timer, setTimer] = useState<TimerState>(initialState);

  /**
   *
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("[GAME LOADED]: ", initialState)
      setTimer(initialState);
      dispatch(changeStatus("ready"))
      clearInterval(timerID);
    });
    return unsubscribe;
  }, [navigation, timerInterface, isFocused]);

  /**
   *
   */
  useEffect(() => {
    const _tick = () => {
      if (timerInterface.status === "live") {
        if (timer.top.isActive) _decrement("top");
        if (timer.bot.isActive) _decrement("bot");
      }
    };

    setTimerID(
      setInterval(() => {
        _tick();
      }, UPDATE_DELAY)
    );

    return () => clearInterval(timerID);
  }, [timer]);

  /**
   *
   * @param timerKey
   */
  const onTimerPress = (timerKey: keyof TimerState) => {
    // if both are inactive
    if (
      !timer.top.isActive &&
      !timer.bot.isActive &&
      timerInterface.status === "ready"
    ) {
      dispatch(changeStatus("live"));
      _changeState(timerKey);

      // if only one is inactive
    } else if (
      !timer[timerKey].isActive &&
      timerInterface.status === "paused"
    ) {
      dispatch(changeStatus("live"));
      _switchState(timerKey);
    } else if (!timer[timerKey].isActive) {
      _switchState(timerKey);
    }

    if (timerID) {
      clearInterval(timerID);
    }
  };

  const pause = () => {
    if (timerInterface.status !== "ready") dispatch(changeStatus("paused"));
  };

  const reset = () => {
    if (timerInterface.status === "paused") {
      setTimer(initialState);
      dispatch(changeStatus("ready"));
    }
  };

  /**
   *
   * @param timerKey
   */
  const _changeState = (timerKey: keyof TimerState) => {
    setTimer({
      ...timer,
      [timerKey]: { ...timer[timerKey], isActive: !timer[timerKey].isActive },
    });
  };

  /**
   *
   * @param timerKey
   */
  const _switchState = (timerKey: keyof TimerState) => {
    //
    let topIncrement: number = 0,
      botIncrement: number = 0;

    //
    switch (timerKey) {
      case "top":
        botIncrement = timerInterface.increment;
        break;
      case "bot":
        topIncrement = timerInterface.increment;
        break;
    }

    setTimer({
      top: {
        ...timer.top,
        isActive: !timer.top.isActive,
        time: timer.top.time + topIncrement,
      },
      bot: {
        ...timer.bot,
        isActive: !timer.bot.isActive,
        time: timer.bot.time + botIncrement,
      },
    });
  };

  /**
   *
   * @param timerKey
   */
  const _decrement = (timerKey: keyof TimerState) => {
    if (timer[timerKey].isActive && timer[timerKey].time > 0) {
      setTimer({
        ...timer,
        [timerKey]: { ...timer[timerKey], time: timer[timerKey].time - 1 },
      });
    }

    if (timer.top.time > 0 || timer.bot.time > 0) {
      // console.log("bruh")
    }
  };

  return (
    <Center backgroundColor={theme.inactive} px={4} flex={1}>
      {/* TIMER */}
      <VStack alignItems="center">
        <Timer timer={timer.top} styles={theme} handlePress={onTimerPress} />
        <Timer timer={timer.bot} styles={theme} handlePress={onTimerPress} />
      </VStack>

      {/* MENU */}
      <HStack space={"75"} alignItems="center" position="absolute">
        {/* SETTINGS */}
        <Button
          name="settings"
          icon={Ionicons}
          isRound={true}
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
        {/* PAUSE/RESET */}
        {timerInterface.status !== "paused" ? (
          <Button
            name="pause"
            icon={MaterialIcons}
            isRound={true}
            onPress={pause}
          />
        ) : (
          <Button
            name="redo-alt"
            icon={FontAwesome5}
            isRound={true}
            onPress={reset}
          />
        )}
      </HStack>
    </Center>
  );
};
