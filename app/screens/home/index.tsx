import React, { useState, useEffect, useReducer } from "react";
import { HStack, Center, VStack } from "native-base";
import { Button } from "../../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { RootState } from "../../models/root-stores/root-store";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "./components/Timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import { ITimer, TimerState } from "../../models/timer";
import { changeStatus } from "../../models/app-slice/modeSlice";

type HomeScreenProps = StackNavigationProp<StackNavigatorParamList, "home">;

const UPDATE_DELAY: number = 998;

export const HomeScreen: React.FC = () => {
  /**
   *
   */
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenProps>();

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
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [timer, setTimer] = useState<TimerState>(initialState);

  /**
   * 
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimer(initialState);
      clearInterval(timerID);
    });
    return unsubscribe;
  }, [navigation, timerInterface]);

  /**
   * 
   */
  useEffect(() => {
    if (timerInterface.status === "ready") dispatch(changeStatus("live"));

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
    if (!timer.top.isActive && !timer.bot.isActive) {
      _changeState(timerKey);

      // if only one is inactive
    } else if (!timer[timerKey].isActive) {
      _switchState(timerKey);
    }

    if (timerID) {
      clearInterval(timerID);
    }
  };

  const pause = () => { 

  }

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
  };

  return (
    <Center backgroundColor={theme.secondary} px={4} flex={1}>
      {/* TIMER */}
      <VStack alignItems="center">
        <Timer timer={timer.top} color={theme} handlePress={onTimerPress} />
        <Timer timer={timer.bot} color={theme} handlePress={onTimerPress} />
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
