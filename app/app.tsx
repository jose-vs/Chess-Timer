import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./navigators";
import { store } from "./models/root-stores/root-store";
import { Provider as StoreProvider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_TIMER_MODES } from "./models/timer";

interface InitState {
  beenInit: boolean;
  key: string;
}

const initState: InitState = {
  beenInit: true,
  key: "_init",
};

/**
 *
 */
const storeData = async () => {
  try {
    if (!(await checkInit())) {
      /**
       * store timer modes
       */
      DEFAULT_TIMER_MODES.forEach(async (mode) => {
        const mode_json = JSON.stringify(mode);
        await AsyncStorage.setItem(mode.key, mode_json);
      });

      /**
       * set state as has been initialized
       */
      const mode_json = JSON.stringify(initState);
      await AsyncStorage.setItem(initState.key, mode_json);

      console.log("[APP INITIALIZED WITH DEFAULT MODES]")
    }
  } catch (e) {
    // saving error
  }
};

/**
 *
 * @returns
 */
const checkInit = async (): Promise<boolean> => {
  try {
    const beenInit = await AsyncStorage.getItem("_init");
    if (beenInit) {
      const parseInit: InitState = JSON.parse(beenInit);
      
      return parseInit.beenInit;
    }
  } catch (e) {
    // saving error
  }
  return false;
};

export default function App() {
  useEffect(() => {
    storeData();
  }, []);

  return (
    <NativeBaseProvider>
      <StoreProvider store={store}>
        <AppNavigator />
      </StoreProvider>
    </NativeBaseProvider>
  );
}
