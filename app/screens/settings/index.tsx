import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { RootState } from "../../models/root-stores/root-store";
import { StackNavigatorParamList } from "../../navigators";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";

type SettingsScreenProps = StackNavigationProp<
  StackNavigatorParamList,
  "settings"
>;

export const SettingsScreen: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<SettingsScreenProps>();

  return (
    <Box backgroundColor={"brown"} px={4} flex={1}>
      {/* Buttons */}
      <HStack
        space={"lg"}
        justifyContent={"flex-end"}
        marginTop={2}
      >
        <Button name="plus" icon={Entypo} onPress={() => {}} />
        <Button name="edit" icon={Feather} onPress={() => {}} />
        <Button name="color-palette" icon={Ionicons} onPress={() => {navigation.navigate("theme")}} />
      </HStack>
    </Box>
  );
};
