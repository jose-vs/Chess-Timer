import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Text, IconButton, ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StackNavigatorParamList } from "../../navigators";
import { Entypo, Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITimerInterface } from "../../models/timer";
import { Pressable, StyleSheet } from "react-native";
import { changeMode } from "../../models/app-slice/modeSlice";
import { darkMode, lightMode } from "../../theme";
import { Appearance } from "react-native";

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
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation<SettingsScreenProps>();
  const [modes, setModes] = useState<ITimerInterface[]>(
    [] as ITimerInterface[]
  );

  const isDarkMode: boolean = Appearance.getColorScheme() === "dark";

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
              modes_keys
                .filter((key) => {
                  if (key === "_init" || key === "_theme") return false;
                  else return true;
                })
                .map(async (key) => {
                  const _mode = await AsyncStorage.getItem(key);
                  return _mode != null ? _mode : null;
                })
            );
          })
          .then((mode) => {
            setModes(
              mode.map((_mode) => {
                if (_mode !== null) {
                  return JSON.parse(_mode);
                }
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
  }, [isFocused]);

  /**
   *
   * @param mode
   */
  const toggleSelect = (mode: ITimerInterface): void => {
    console.log("[MODE SELECTED]: ", mode);

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
  const handleDelete = (): void => {
    const modeUpdate: ITimerInterface[] = modes.filter((mode) => {
      if (mode.selected) {
        deleteItem(mode.key);
        return false;
      } else return true;
    });

    setModes(modeUpdate);
  };

  const deleteItem = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };

  const style = StyleSheet.create({
    selected: {
      backgroundColor: isDarkMode
        ? darkMode.list.selected
        : darkMode.list.selected,
      padding: 10,
      margin: 5,
      paddingLeft: 18,
      borderRadius: 5,
    },
    normal: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      backgroundColor: isDarkMode
        ? darkMode.list.background
        : darkMode.list.background,
    },
  });

  /**
   *
   * @param mode
   * @returns
   */
  const renderModeItem = (mode: ITimerInterface): JSX.Element => {
    return (
      <Box key={mode.key}>
        <Pressable
          onPress={() => onPress(mode)}
          onLongPress={() => onLongPress(mode)}
          style={[mode.selected ? style.selected : style.normal]}
        >
          <HStack justifyContent={"space-between"}>
            <Text
              m={3}
              _light={{ color: lightMode.list.text }}
              _dark={{ color: darkMode.list.text }}
            >
              {mode.name}
            </Text>
            {selectionMode ? (
              <IconButton
                size={"md"}
                variant="ghost"
                _light={{
                  _pressed: { bg: lightMode.button.pressed },
                  _icon: {
                    color: lightMode.button.secondary,
                    as: Feather,
                    name: "edit",
                  },
                }}
                _dark={{
                  _pressed: { bg: darkMode.button.pressed },
                  _icon: {
                    color: darkMode.button.secondary,
                    as: Feather,
                    name: "edit",
                  },
                }}
                onPress={() => {
                  navigation.navigate("mode", mode.key);
                }}
              />
            ) : null}
          </HStack>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box
      px={4}
      flex={1}
      _light={{ bg: lightMode.background }}
      _dark={{ bg: darkMode.background }}
    >
      {/* Buttons */}
      <HStack justifyContent={"space-between"} marginTop={5} marginBottom={5}>
        <HStack space={"lg"} justifyContent={"flex-end"}>
          {selectionMode ? (
            <IconButton
              size={"lg"}
              variant="solid"
              bg="#bd2d2d"
              _pressed={{
                bg: "#a31212",
              }}
              _icon={{
                color: "#fff",
                as: MaterialIcons,
                name: "delete",
              }}
              onPress={handleDelete}
            />
          ) : null}
        </HStack>
        <HStack space={"lg"} justifyContent={"flex-end"}>
          <IconButton
            size={"lg"}
            variant="ghost"
            _light={{
              _pressed: { bg: lightMode.button.pressed },
              _icon: {
                color: lightMode.button.secondary,
                as: Entypo,
                name: "plus",
              },
            }}
            _dark={{
              _pressed: { bg: darkMode.button.pressed },
              _icon: {
                color: darkMode.button.secondary,
                as: Entypo,
                name: "plus",
              },
            }}
            onPress={() => {
              navigation.navigate("mode");
            }}
          />
          <IconButton
            size={"lg"}
            variant="ghost"
            _light={{
              _pressed: { bg: lightMode.button.pressed },
              _icon: {
                color: lightMode.button.secondary,
                as: Ionicons,
                name: "color-palette",
              },
            }}
            _dark={{
              _pressed: { bg: darkMode.button.pressed },
              _icon: {
                color: darkMode.button.secondary,
                as: Ionicons,
                name: "color-palette",
              },
            }}
            onPress={() => {
              navigation.navigate("theme");
            }}
          />
        </HStack>
      </HStack>
      <ScrollView>
        {modes.map((mode) => {
          return renderModeItem(mode);
        })}
      </ScrollView>
    </Box>
  );
};
