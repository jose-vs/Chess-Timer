import {
  Box,
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
import React, { useState } from "react";

export const NewModeScreen: React.FC = () => {
  const [timePickMode, setTimePickMode] = useState<boolean>(false);
  const [time, setTime] = useState<string>("10:00");
  const [incrementPickMode, setIncrementPickMode] = useState<boolean>(false);
  const [increment, setIncrement] = useState<string | undefined>();

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
          value: idx.toString(),
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
          value: idx.toString(),
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
          value: idx.toString(),
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
          <FormControl mb="5">
            <FormControl.Label>Mode Title</FormControl.Label>
            <Input placeholder="Title" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Name already exists
            </FormControl.ErrorMessage>
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
      </Stack>
    </ScrollView>
  );
};
