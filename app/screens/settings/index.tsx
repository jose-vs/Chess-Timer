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
import { DEFAULT_TIMER, ITimerInterface } from "../../models/timer";
import { Mode } from "./components/Mode";

type SettingsScreenProps = StackNavigationProp<
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
        await AsyncStorage.getAllKeys().then((modes_keys) => {
          console.log(modes_keys);
          modes_keys.map(async (key) => {
            await AsyncStorage.getItem(key).then((_mode) => {
              _mode != null
                ? setModes((prev) => {
                    return [...prev, JSON.parse(_mode) as ITimerInterface];
                  })
                : null;
            });
          });
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
