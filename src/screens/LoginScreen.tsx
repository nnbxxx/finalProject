import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { SignIn, IAccount } from "../types/type";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { userLogin, userRetryActive } from "../api/api";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [user, setUser] = useState<SignIn>({
    username: "",
    password: "",
  });
  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    const res = await userLogin(user);
    // console.log("🚀 ~ handleSubmit ~ res:", res);

    if (res && res.data) {
      const { access_token, user } = res.data as unknown as IAccount;
      AsyncStorage.setItem("access_token", access_token);
      AsyncStorage.setItem("user", JSON.stringify(user));
      Toast.show({
        type: "success",
        text1: "Login Success",
      });
      navigation.replace("Home", { id: user._id });
    } else {
      const { message, statusCode } = res as any;
      Toast.show({
        type: "error",
        text1: message,
      });
      if (statusCode === 400) {
        await userRetryActive(user.username);
        navigation.navigate("Code", {
          email: user.username,
          active: 1, // xác thực lại tài khoản
        });
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-second">
      <View className="relative w-full h-[380px] bg-white rounded-b-[30px] flex flex-col justify-center items-center">
        <View>
          <Text className="text-5xl text-main">Sắc</Text>
          <Text className="text-5xl text-main">for Everyone</Text>
        </View>
        <View className=" absolute flex flex-row items-center justify-between bottom-0">
          <View className="w-[134px] py-3 border-b-2 border-main">
            <Text className="text-center text-main text-base font-semibold">
              Login
            </Text>
          </View>
          <View className="w-[134px] py-3">
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-center text-gray1 text-base font-semibold">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-16">
        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Email</Text>
          <TextInput
            onChangeText={(e) => handleChange("username", e)}
            className="tracking-wider text-base"
          ></TextInput>
        </View>
        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Password</Text>
          <TextInput  
            onChangeText={(e) => handleChange("password", e)}
            secureTextEntry
            className="tracking-wider text-base"
          ></TextInput>
        </View>
        <View className="w-full">
          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text className="text-main font-medium text-base">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-main w-full py-4 rounded-[10px]">
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="font-bold text-xl text-white text-center">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
