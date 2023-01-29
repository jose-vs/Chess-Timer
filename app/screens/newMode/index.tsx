import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ITimerInterface } from "../../models/timer";
import { toMMSS, toSeconds } from "../../utils";
import { StackNavigatorParamList } from "../../navigators";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../models/root-stores/root-store";
import { darkMode, lightMode } from "../../theme";
import {
  PickerItem,
  TimePicker,
  TimePickerOption,
} from "./components/TimePicker";

/**
 *
 */
export type NewModeScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "mode"
>;

export const NewModeScreen: React.FC = (props: any) => {
  const timerTheme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<NewModeScreenProps>();

  /**
   *
   * @returns
   */
  const isUpdate = (): boolean => {
    return props.route.params !== undefined;
  };

  /**
   *
   */
  const [nameExists, setNameExists] = useState<boolean>(false);
  const [nameEmpty, setNameEmpty] = useState<boolean>(false);

  /**
   *
   */
  const [namePlaceholder, setNamePlaceholder] = useState<string>("Name");
  const [name, setName] = useState<string>();
  const [increment, setIncrement] = useState<string>("0");
  const [hours, setHours] = useState<string>("00");
  const [mins, setMins] = useState<string>("10");
  const [seconds, setSeconds] = useState<string>("00");

  const incrementItems = [...Array(10).keys()].map((item, idx): PickerItem => {
    return {
      label: item.toString().slice(-2),
      value: idx.toString().slice(-2),
    };
  });

  const [incrementItemsArray, setIncrementItemsArray] =
    useState(incrementItems);

  const scrollTimerIncrementData: Array<TimePickerOption> = [
    {
      key: "increment",
      currentValue: increment,
      valueArray: incrementItemsArray,
      onChange: (item, idx) => {
        setIncrement(item);
        if (idx === 0) {
          setIncrementItemsArray([
            ...incrementItemsArray.slice(-1),
            ...incrementItemsArray.slice(0, -1),
          ]);
        } else if (idx === incrementItemsArray.length - 1) {
          setIncrementItemsArray([
            ...incrementItemsArray.slice(1),
            ...incrementItemsArray.slice(0, 1),
          ]);
        }
      },

      items: incrementItems,
    },
  ];

  // const scrollTimerTimerData: Array<TimePickerOption> = [
  //   {
  //     key: "hours",
  //     currentValue: hours,
  //     onChange: (item) => {
  //       setHours(item);
  //     },
  //     items: [...Array(60).keys()].map((item, idx): PickerItem => {
  //       return {
  //         label: ("0" + item.toString()).slice(-2),
  //         value: ("0" + idx.toString()).slice(-2),
  //       };
  //     }),
  //   },
  //   {
  //     key: "mins",
  //     currentValue: mins,
  //     onChange: (item) => {
  //       setMins(item);
  //     },
  //     items: [...Array(60).keys()].map((item, idx): PickerItem => {
  //       return {
  //         label: ("0" + item.toString()).slice(-2),
  //         value: ("0" + idx.toString()).slice(-2),
  //       };
  //     }),
  //   },
  //   {
  //     key: "seconds",
  //     currentValue: seconds,
  //     onChange: (item) => {
  //       setSeconds(item);
  //     },
  //     items: [...Array(60).keys()].map((item, idx): PickerItem => {
  //       return {
  //         label: ("0" + item.toString()).slice(-2),
  //         value: ("0" + idx.toString()).slice(-2),
  //       };
  //     }),
  //   },
  // ];

  useEffect(() => {
    const getItem = async () => {
      if (isUpdate()) {
        try {
          const updateMode = await AsyncStorage.getItem(props.route.params);

          console.log("[MODE TO UPDATE]: ", updateMode);

          if (updateMode != null) {
            const json_mode: ITimerInterface = JSON.parse(updateMode);

            setName(json_mode.name);
            setNamePlaceholder(json_mode.name);
            setIncrement(json_mode.increment.toString());

            let time = toMMSS(json_mode.startTime);
            if (time.length <= 5) time = "00:" + time;

            setHours(time.substring(0, 2));
            setMins(time.substring(3, 5));
            setSeconds(time.substring(6, 8));
          }
        } catch (e) {
          // read error
        }
      }
    };

    getItem();
  }, []);

  /**
   *
   */
  const handleOnPress = async (): Promise<void> => {
    if (!name) {
      setNameEmpty(true);
    } else {
      const mode: ITimerInterface = {
        name: name,
        key: props.route.params ? props.route.params : uuidv4(),
        status: "ready",
        increment: increment ? parseInt(increment) : 0,
        startTime: toSeconds(hours + ":" + mins + ":" + seconds),
        selected: false,
      };

      if (!(await checkExisting(name))) {
        setNameEmpty(false);
        setNameExists(false);

        navigation.navigate("settings");
        await storeData(mode);
      }

      if (!isUpdate()) setNameExists(true);
      else {
        await updateItem(props.route.params, mode);
        navigation.navigate("settings");
      }
    }
  };

  const updateItem = async (key: string, mode: ITimerInterface) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(mode));
      const checkUpdated = await AsyncStorage.getItem(key);

      if (checkUpdated === null)
        throw new Error("[UPDATING FAILED]: " + JSON.stringify(mode));
      else console.log("[UPDATED SUCCESFULLY]: ", mode);
    } catch (e) {
      console.error(e);
    }
  };

  const checkExisting = async (name: string): Promise<boolean> => {
    let exists: boolean = false;

    try {
      await AsyncStorage.getAllKeys()
        .then((modes_keys) => {
          return Promise.all(
            modes_keys.map(async (key) => {
              const _mode = await AsyncStorage.getItem(key);
              return _mode != null ? _mode : null;
            })
          );
        })
        .then((modes) => {
          modes.forEach((_mode) => {
            if (_mode) {
              const json_mode = JSON.parse(_mode) as ITimerInterface;
              if (json_mode.name === name) {
                console.log("[MODE FOUND]: ", json_mode);
                exists = true;
              }
            }
          });
        });
    } catch (e) {
      // error reading value
    }

    return exists;
  };

  /**
   *
   * @param mode
   */
  const storeData = async (mode: ITimerInterface) => {
    try {
      const mode_json = JSON.stringify(mode);
      await AsyncStorage.setItem(mode.key, mode_json);

      console.log("[MODE SAVED SUCCESFULLY]: ", mode);
    } catch (e) {
      // saving error
    }
  };

  const NameErrorMessage = () => {
    if (nameExists) {
      return (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Name already exists
        </FormControl.ErrorMessage>
      );
    } else if (nameEmpty) {
      return (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Name empty
        </FormControl.ErrorMessage>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView
      _light={{ bg: lightMode.background }}
      _dark={{ bg: darkMode.background }}
    >
      <Stack
        space={2.5}
        alignSelf="center"
        px={4}
        safeArea
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box>
          <FormControl isInvalid={nameEmpty || nameExists} mb="5">
            <FormControl.Label>Mode Name</FormControl.Label>
            <Input
              placeholder={namePlaceholder}
              onChangeText={(text) => {
                setName(text);
              }}
            />

            <NameErrorMessage />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>Increment</FormControl.Label>
            <TimePicker options={scrollTimerIncrementData}></TimePicker>
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>Timer</FormControl.Label>
            {/* <TimePicker options={scrollTimerTimerData}></TimePicker> */}
          </FormControl>
        </Box>
        <Button
          _light={{
            bg: lightMode.button.primary,
            _pressed: {
              bg: lightMode.button.pressed,
            },
            _text: { color: lightMode.text },
          }}
          _dark={{
            bg: darkMode.button.primary,
            _pressed: {
              bg: darkMode.button.pressed,
            },
            _text: { color: darkMode.text },
          }}
          onPress={handleOnPress}
        >
          Submit
        </Button>
      </Stack>
    </ScrollView>
  );
};
