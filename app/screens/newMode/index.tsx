import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  WarningOutlineIcon,
} from "native-base";
import SegmentedPicker, {
  PickerItem,
  PickerOptions,
} from "react-native-segmented-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ITimerInterface } from "../../models/timer";
import { toMMSS, toSeconds } from "../../utils";
import { StackNavigatorParamList } from "../../navigators";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

/**
 *
 */
export type NewModeScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "mode"
>;

export const NewModeScreen: React.FC = (props: any) => {
  const navigation = useNavigation<NewModeScreenProps>();

  useEffect(() => {
    const getItem = async () => {
      if (isUpdate()) {
        try {
          const updateMode = await AsyncStorage.getItem(props.route.params);

          console.log("[MODE TO UPDATE]: ", updateMode);

          if (updateMode != null) {
            const json_mode: ITimerInterface = JSON.parse(updateMode);

            setName(json_mode.name);
            setKey(json_mode.key);
            setNamePlaceholder(json_mode.name);
            setIncrement(json_mode.increment.toString());

            let time = toMMSS(json_mode.startTime);
            if (time.length <= 5) time = "00:" + time;

            setTime(time);
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
   * @returns
   */
  const isUpdate = (): boolean => {
    return props.route.params !== undefined;
  };

  /**
   *
   */
  const [timePickMode, setTimePickMode] = useState<boolean>(false);
  const [incrementPickMode, setIncrementPickMode] = useState<boolean>(false);

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
  const [key, setKey] = useState<string>();
  const [increment, setIncrement] = useState<string>("0");
  const [time, setTime] = useState<string>("00:10:00");

  /**
   *
   */
  const scrollTimerData: PickerOptions = [
    {
      key: "spacer1",
      items: [{ label: " ", value: " " }],
    },
    {
      key: "hour",
      items: [...Array(60).keys()].map((item, idx): PickerItem => {
        return {
          label: ("0" + item.toString()).slice(-2),
          value: ("0" + idx.toString()).slice(-2),
        };
      }),
    },
    {
      key: "divider1",
      items: [{ label: ":", value: ":" }],
    },
    {
      key: "minute",
      items: [...Array(60).keys()].map((item, idx): PickerItem => {
        return {
          label: ("0" + item.toString()).slice(-2),
          value: ("0" + idx.toString()).slice(-2),
        };
      }),
    },
    {
      key: "divider2",
      items: [{ label: ":", value: ":" }],
    },
    {
      key: "second",
      items: [...Array(60).keys()].map((item, idx): PickerItem => {
        return {
          label: ("0" + item.toString()).slice(-2),
          value: ("0" + idx.toString()).slice(-2),
        };
      }),
    },
    {
      key: "spacer2",
      items: [{ label: " ", value: " " }],
    },
  ];

  /**
   *
   */
  const scrollIncrementData: PickerOptions = [
    {
      key: "increment",
      items: [...Array(60).keys()].map((item, idx): PickerItem => {
        return { label: item.toString(), value: idx.toString() };
      }),
    },
  ];

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
        startTime: toSeconds(time),
        selected: false,
      };

      if (!(await checkExisting(name))) {
        setNameEmpty(false);
        setNameExists(false);

        await storeData(mode);
        navigation.navigate("settings");
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
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box>
          {/*  */}
          <SegmentedPicker
            ref={React.createRef()}
            visible={timePickMode}
            onConfirm={(selections) => {
              setTime(
                selections.hour +
                  ":" +
                  selections.minute +
                  ":" +
                  selections.second
              );
              setTimePickMode(false);
            }}
            options={scrollTimerData}
          />
          {/*  */}
          <SegmentedPicker
            ref={React.createRef()}
            visible={incrementPickMode}
            onConfirm={(selections) => {
              setIncrement(selections.increment);
              setIncrementPickMode(false);
            }}
            options={scrollIncrementData}
          />
          <Text bold fontSize="xl" mb="4">
            Create New Mode
          </Text>
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
            <Input
              placeholder={increment}
              onPressIn={() => setIncrementPickMode(true)}
              value={increment}
            />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>Timer</FormControl.Label>
            <Pressable m={10} onPress={() => setTimePickMode(true)}>
              <Box>{time}</Box>
            </Pressable>
          </FormControl>
          <Divider />
        </Box>
        <Button onPress={handleOnPress}>Submit</Button>
      </Stack>
    </ScrollView>
  );
};
