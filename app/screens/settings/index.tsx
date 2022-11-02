import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Text, IconButton, Icon, ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Entypo, Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
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
  const isFocused = useIsFocused();
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
      backgroundColor: theme.list.selected,
      padding: 10,
      margin: 5,
      paddingLeft: 18,
      borderRadius: 5,
    },
    normal: {
      padding: 10,
      margin: 5,
      borderRadius: 5,
      backgroundColor: theme.list.backgroundcolor,
    },
  });

  /**
   *
   * @param mode
   * @returns
   */
  const renderModeItem = (mode: ITimerInterface): JSX.Element => {
    return (
      <Box
        key={mode.key}
 
      >
        <Pressable
          onPress={() => onPress(mode)}
          onLongPress={() => onLongPress(mode)}
          style={[mode.selected ? style.selected : style.normal]}
        >
          <HStack justifyContent={"space-between"}>
            <Text m={3} color={theme.list.text}>{mode.name}</Text>
            {selectionMode ? (
              <IconButton
                size={"md"}
                onPress={() => {
                  navigation.navigate("mode", mode.key);
                }}
                icon={<Icon as={Feather} name={"edit"} />}
              />
            ) : null}
          </HStack>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box px={4} flex={1} backgroundColor={theme.backgroundColour}>
      {/* Buttons */}
      <HStack justifyContent={"space-between"} marginTop={5} marginBottom={5}>
        <HStack space={"lg"} justifyContent={"flex-end"}>
          {selectionMode ? (
            <Button name="delete" icon={MaterialIcons} onPress={handleDelete} />
          ) : null}
        </HStack>
        <HStack space={"lg"} justifyContent={"flex-end"}>
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
      </HStack>

      <ScrollView>
        {modes.map((mode) => {
          return renderModeItem(mode);
        })}
      </ScrollView>
    </Box>
  );
};


