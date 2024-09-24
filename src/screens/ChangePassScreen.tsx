import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Toast from "react-native-toast-message";
import { userChangePassword } from "../api/api";

type RouteParams = {
  code: "string";
  email: "string";
};

const ChangePassScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute();

  const { email, code } = route.params as RouteParams;

  const [item, setItem] = useState<{
    password: string;
    rePassword: string;
  }>({
    password: "",
    rePassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (item.password !== item.rePassword) {
      Toast.show({
        type: "error",
        text1: "Vui lòng kiểm tra lại mật khẩu và xác nhận mật khẩu",
      });
      return;
    }
    const res: any = await userChangePassword(
      email,
      code,
      item.password,
      item.rePassword
    );
    if (res && res.data) {
      Toast.show({
        type: "success",
        text1: "Login Success",
      });
      navigation.replace("Login");
    } else {
      const { message } = res as any;
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-second ">
      <View className="relative h-screen">
        <View className="relative w-full h-[380px] bg-white rounded-b-[30px] flex flex-col justify-center items-center">
          <View>
            <Text className="text-5xl text-main">Sneakers</Text>
            <Text className="text-5xl text-main">for Everyone</Text>
          </View>
          <View className=" absolute flex flex-row items-center justify-between bottom-0">
            <View className="w-[134px] py-3 border-b-2 border-main">
              <Text className="text-center text-main text-base font-semibold">
                Change Password
              </Text>
            </View>
          </View>
        </View>
        <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-5">
          <View className="flex space-y-1 flex-col border-b-[1px]  w-full h-[60px]">
            <Text className="text-sm opacity-40">Password</Text>
            <TextInput
              onChangeText={(e) => handleChange("password", e)}
              secureTextEntry
              className="tracking-wider text-base"
            ></TextInput>
          </View>
          <View className="flex space-y-1 flex-col border-b-[1px] w-full h-[60px]">
            <Text className="text-sm opacity-40">Re-type Password</Text>
            <TextInput
              onChangeText={(e) => handleChange("rePassword", e)}
              secureTextEntry
              className="tracking-wider text-base"
            ></TextInput>
          </View>
        </View>
        <View className="absolute bottom-0 w-full mb-10">
          <View className="px-[30px]">
            <View className="bg-main py-4 rounded-[30px]">
              <TouchableOpacity onPress={handleSubmit}>
                <Text className="font-bold text-xl text-white text-center tracking-widest">
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View className="absolute bottom-0 w-[314px]"></View> */}
      </View>
    </ScrollView>
  );
};

export default ChangePassScreen;
