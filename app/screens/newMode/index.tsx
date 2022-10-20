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
import React, { useState } from "react";
import { ITimerInterface } from "../../models/timer";
import { toSeconds } from "../../utils";
import { StackNavigatorParamList } from "../../navigators";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

/**
 *
 */
export type NewModeScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "mode"
>;

export const NewModeScreen: React.FC = () => {
  const navigation = useNavigation<NewModeScreenProps>();

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
  const [name, setName] = useState<string>();
  const [increment, setIncrement] = useState<string | undefined>();
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

  const handleOnPress = async (): Promise<void> => {
    if (!name) {
      setNameEmpty(true);
    } else {
      const key = "@" + name + "_key";

      if (!(await checkExisting(key))) {
        setNameEmpty(false);
        setNameExists(false);

        const mode: ITimerInterface = {
          name: name,
          key: key,
          status: "ready",
          increment: increment ? parseInt(increment) : 0,
          startTime: toSeconds(time),
          selected: false,
        };

        await storeData(mode);
        navigation.navigate("settings");
      } else {
        setNameExists(true);
      }
    }
  };

  const checkExisting = async (key: string): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (e) {
      // error reading value
    }

    return true;
  };

  /**
   *
   * @param mode
   */
  const storeData = async (mode: ITimerInterface) => {
    try {
      const mode_json = JSON.stringify(mode);
      await AsyncStorage.setItem(mode.key, mode_json);
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
              console.info(selections);
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
              console.info(selections);
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
              placeholder="Name"
              onChangeText={(text) => {
                setName(text);
              }}
            />

            <NameErrorMessage />
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>Increment</FormControl.Label>
            <Input
              placeholder="0"
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
