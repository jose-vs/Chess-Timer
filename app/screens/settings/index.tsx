import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Text, IconButton, Icon } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITimerInterface } from "../../models/timer";
import { Pressable, StyleSheet } from "react-native";
import { changeMode } from "../../models/app-slice/modeSlice";

/**
 *
 */
export type SettingsScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "settings"
>;

/**
 *
 * @param items
 * @returns
 */
const useSelectionChange = (items: ITimerInterface[]): boolean => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  useEffect(() => {
    if (items.filter((i) => i.selected).length > 0) {
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  });

  return selectionMode;
};

/**
 *
 * @returns
 */
export const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<SettingsScreenProps>();
  const [modes, setModes] = useState<ITimerInterface[]>(
    [] as ITimerInterface[]
  );

  const selectionMode = useSelectionChange(modes);

  /**
   *
   */
  useEffect(() => {
    const getData = async () => {
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
          .then((mode) => {
            setModes(
              mode.map((_mode) => {
                if (_mode) return JSON.parse(_mode);
              })
            );
          });
      } catch (e) {
        // error reading value
      }
    };

    getData();

    return () => {
      setModes([] as ITimerInterface[]);
    };
  }, []);

  /**
   *
   * @param mode
   */
  const toggleSelect = (mode: ITimerInterface): void => {
    setModes(
      modes.map((i) => {
        if (mode === i) {
          i.selected = !i.selected;
        }
        return i;
      })
    );
  };

  /**
   *
   */
  const clearSelection = (): void => {
    setModes(
      modes.map((i) => {
        i.selected = false;
        return i;
      })
    );
  };

  /**
   *
   * @param mode
   */
  const onPress = (mode: ITimerInterface): void => {
    if (selectionMode) {
      toggleSelect(mode);
    } else {
      pressItem(mode);
    }
  };

  /**
   *
   * @param mode
   */
  const onLongPress = (mode: ITimerInterface): void => {
    if (selectionMode === false) {
      toggleSelect(mode);
    }
  };

  /**
   *
   * @param mode
   */
  const pressItem = (mode: ITimerInterface): void => {
    dispatch(changeMode(mode));
    navigation.navigate("home");
  };

  /**
   *
   */
  const handleDelete = (): void => {};

  /**
   *
   * @param mode
   * @returns
   */
  const renderModeItem = (mode: ITimerInterface): JSX.Element => {
    return (
      <Pressable
        onPress={() => onPress(mode)}
        onLongPress={() => onLongPress(mode)}
        key={mode.key}
        style={[mode.selected ? style.selected : style.normal]}
      >
        <HStack>
          <Text>{mode.name}</Text>
          {selectionMode ? <IconButton size={"md"} onPress={() => {}} icon={<Icon as={Feather} name={"edit"}/>}/> : null}
        </HStack>
      </Pressable>
    );
  };

  return (
    <Box px={4} flex={1}>
      {/* Buttons */}
      <HStack space={"lg"} justifyContent={"flex-end"} marginTop={2}>
        <Button
          name="plus"
          icon={Entypo}
          onPress={() => {
            navigation.navigate("mode");
          }}
        />
        <Button
          name="color-palette"
          icon={Ionicons}
          onPress={() => {
            navigation.navigate("theme");
          }}
        />
      </HStack>
      {modes.map((mode) => {
        return renderModeItem(mode);
      })}
    </Box>
  );
};

const style = StyleSheet.create({
  selected: {
    backgroundColor: "lightgray",
    padding: 10,
    paddingLeft: 18,
  },
  normal: {
    padding: 10
  },
});
