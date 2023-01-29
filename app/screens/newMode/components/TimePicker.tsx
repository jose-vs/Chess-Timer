import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Box, useColorMode } from "native-base";
import { WINDOW_WIDTH } from "../../../utils";

export interface TimePickerProps {
  options: Array<TimePickerOption>;
}

export interface TimePickerOption {
  key: string;
  items: Array<PickerItem>;
  valueArray: Array<PickerItem>;
  currentValue: string;
  onChange: (item: any, idx: number) => void;
}

export interface PickerItem {
  label: string;
  value: string;
}

/**
 *
 * @param props
 * @returns
 */
export const TimePicker = ({ options }: TimePickerProps) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode: boolean = colorMode === "dark";

  const renderSeparators = (idx: number) => {
    if (options.length > 1 && idx + 1 < options.length) {
      return <Box fontSize={100}>:</Box>;
    }
  };

  return (
    <Box
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {options.map((item, idx) => {
        return (
          <Box
            key={idx}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Picker
              selectedValue={item.currentValue}
              mode="dropdown"
              enabled={true}
              onValueChange={item.onChange}
              style={{
                width: WINDOW_WIDTH * 0.3,
              }}
              itemStyle={isDarkMode ? { color: "#fff" } : {color: "#000"}}
            >
              {item.valueArray.map((item, idx) => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={idx}
                  />
                );
              })}
            </Picker>
            {renderSeparators(idx)}
          </Box>
        );
      })}
    </Box>
  );
};

/**
 *
 */
export interface PickerItemProps {
  selectedValue: string;
  data: TimePickerOption;
}

/**
 *
 * @param props
 * @returns
 */
export const PickerItem = ({ selectedValue }: PickerItemProps) => {
  return (
    <Box style={{ flexDirection: "row" }}>
      <Picker selectedValue={selectedValue}></Picker>
    </Box>
  );
};
