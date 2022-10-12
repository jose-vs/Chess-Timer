import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import AppLoading from "expo-app-loading";
import { ITimerInterface } from "../../models/timer";
import { Mode } from "./components/Mode";

export type SettingsScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "settings"
>;

export const SettingsScreen: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<SettingsScreenProps>();
  const [modes, setModes] = useState<ITimerInterface[]>(
    [] as ITimerInterface[]
  );

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

  // if (!ready) {
  //   return (
  //     <AppLoading
  //       startAsync={loadMode}
  //       onFinish={() => setReady(true)}
  //       onError={console.error}
  //     />
  //   )
  // }

  return (
    <Box px={4} flex={1}>
      {/* Buttons */}
      <HStack space={"lg"} justifyContent={"flex-end"} marginTop={2}>
        <Button
          name="plus"
          icon={Entypo}
          onPress={() => {
            console.log(modes);
          }}
        />
        <Button name="edit" icon={Feather} onPress={() => {}} />
        <Button
          name="color-palette"
          icon={Ionicons}
          onPress={() => {
            navigation.navigate("theme");
          }}
        />
      </HStack>

      {modes?.map((value, index) => {
        return <Mode timer={value} key={index} />;
      })}
    </Box>
  );
};
