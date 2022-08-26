import React, { useState, useRef, useEffect } from "react";
import { HStack, Center, VStack } from "native-base";
import { Button } from "../../components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { RootState } from "../../models/root-stores/root-store";
import { useSelector } from "react-redux";
import { Timer } from "./components/Timer";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigators";
import {
  ITimerInterface,
  TimerType,
  DEFAULT_TIMER,
  ITimer,
} from "../../models/timer";
import { toMMSS } from "../../utils/toMMSS";

type HomeScreenProps = StackNavigationProp<StackNavigatorParamList, "home">;

const UPDATE_DELAY: number = 998;

export const HomeScreen: React.FC = () => {
  /**
   *
   */
  const navigation = useNavigation<HomeScreenProps>();
  const theme = useSelector((state: RootState) => state.theme);

  /**
   *
   */
  const [timerInterface, setTimerInterface] =
    useState<ITimerInterface>(DEFAULT_TIMER);

  /**
   *
   */
  const [topTimer, setTopTimer] = useState<ITimer>({
    name: "top",
    isActive: false,
    remainingTime: DEFAULT_TIMER.startTime,
  } as ITimer);

  const [botTimer, setBotTimer] = useState<ITimer>({
    name: "bot",
    isActive: false,
    remainingTime: DEFAULT_TIMER.startTime,
  } as ITimer);

  /**
   *
   */
  useEffect(() => {
    const _tick = (): void => {
      if (topTimer.isActive && !botTimer.isActive) {
        _handleTopTick();
      }
      if (botTimer.isActive && !topTimer.isActive) {
        _handleBotTick();
      }
    };

    if (timerInterface.status === "live") {
      const _interval = setInterval(() => _tick(), UPDATE_DELAY);
      return () => clearInterval(_interval);
    }
  }, [topTimer, botTimer, timerInterface.status]);

  /**
   *
   */
  const _handleTopTick = (): void => {
    setTopTimer({
      ...topTimer,
      remainingTime: topTimer.remainingTime - 1,
    });
  };

  /**
   *
   */
  const _handleBotTick = (): void => {
    setBotTimer({
      ...botTimer,
      remainingTime: botTimer.remainingTime - 1,
    });
  };

  /**
   *
   */
  const reset = (): void => {};

  /**
   *
   */
  const pause = (): void => {
    setTimerInterface({ ...timerInterface, status: "ready" });
  };

  /**
   *
   */
  const start = (timer: TimerType): void => {
    if (timerInterface.status !== "ready") return;
    setTimerInterface({ ...timerInterface, status: "live" });

    switch (timer) {
      case "top":
        setTopTimer({ ...topTimer, isActive: true });
        return;
      case "bot":
        setBotTimer({ ...botTimer, isActive: true });
        return;
    }
  };

  /**
   *
   */
  const increment = (): void => {};

  /**
   *
   */
  const setActiveTimer = (timer: TimerType): void => {
    switch (timer) {
      case "top":
        if (!topTimer.isActive && botTimer.isActive) {
          setTopTimer({ ...topTimer, isActive: true });
          setBotTimer({
            ...botTimer,
            isActive: false,
          });
        }
        return;
      case "bot":
        if (!botTimer.isActive && topTimer.isActive) {
          setTopTimer({
            ...topTimer,
            isActive: false,
          });
          setBotTimer({
            ...botTimer,
            isActive: true,
          });
        }
        return;
    }
  };

  /**
   *
   * @param timer
   */
  const onTimerPress = (timer: TimerType) => {
    switch (timerInterface.status) {
      case "ready":
        start(timer);
        break;
      case "live":
        setActiveTimer(timer);
        break;
    }
  };

  return (
    <Center backgroundColor={theme.secondary} px={4} flex={1}>
      {/* TIMER */}
      <VStack alignItems="center">
        <Timer
          name={"top"}
          color={theme}
          isActive={topTimer.isActive}
          time={toMMSS(topTimer.remainingTime)}
          handlePress={onTimerPress}
        />
        <Timer
          name={"bot"}
          color={theme}
          isActive={botTimer.isActive}
          time={toMMSS(botTimer.remainingTime)}
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
          onPress={pause}
        />
      </HStack>
    </Center>
  );
};
