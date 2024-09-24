import { View, Text } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useEffect } from "react";

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-main">
      <Text>WelcomeScreen</Text>
    </View>
  );
};

export default WelcomeScreen;
