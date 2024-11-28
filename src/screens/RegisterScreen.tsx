import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TextInputChangeEventData,
} from "react-native";
import { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { SignUp } from "../types/type";

import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { userSignup } from "../api/api";

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [checked, setChecked] = useState<string>("Male");
  const [user, setUser] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
    // age: "",
    // gender: "",
    // address: "",
  });
  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      Toast.show({
        type: "error",
        text1: "Not Email",
      });
      return;
    }

    if (
      // user.address === "" ||
      // user.age === "" ||
      user.email === "" ||
      user.name === "" ||
      user.password === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Please complete all information",
      });
      return;
    }
    const res: any = await userSignup({ ...user });
    // const res: any = await userSignup({ ...user, gender: checked });
    if (res && res.data) {
      Toast.show({
        type: "success",
        text1: "Resgister Success",
      });
      navigation.replace("Code", {
        email: user.email,
        active: 1, // xác thực lại tài khoản
      });
    } else {
      const { message } = res as any;
      Toast.show({
        type: "error",
        text1: message,
      });
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
          <View className="w-[134px] py-3">
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-center text-gray1text-base font-semibold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-[134px] py-3 border-b-2 border-main">
            <Text className="text-center  text-main  text-base font-semibold">
              Register
            </Text>
          </View>
        </View>
      </View>
      <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-16 mb-10">
        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Email</Text>
          <TextInput
            value={user.email}
            onChangeText={(e) => handleChange("email", e)}
            className="tracking-wider text-base"
          ></TextInput>
        </View>
        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Name</Text>
          <TextInput
            value={user.name}
            onChangeText={(e) => handleChange("name", e)}
            className="tracking-wider text-base"
          ></TextInput>
        </View>
        {/* <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Address</Text>
          <TextInput
            value={user.address}
            onChangeText={(e) => handleChange("address", e)}
            className="tracking-wider text-base"
          ></TextInput>
        </View> */}
        <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Password</Text>
          <TextInput
            value={user.password}
            onChangeText={(e) => handleChange("password", e)}
            secureTextEntry
            className="tracking-wider text-base"
          ></TextInput>
        </View>

        {/* <View className="flex flex-row items-center justify-around w-full h-[60px]">
          <View className="flex flex-row items-center">
            <RadioButton
              value="Male"
              status={checked === "Male" ? "checked" : "unchecked"}
              onPress={() => setChecked("Male")}
            />
            <Text>Male</Text>
          </View>
          <View className="flex flex-row items-center">
            <RadioButton
              value="Female"
              status={checked === "Female" ? "checked" : "unchecked"}
              onPress={() => setChecked("Female")}
            />
            <Text>Female</Text>
          </View>
        </View> */}
        {/* <View className="flex space-y-1 flex-col border-b-2 w-full h-[60px]">
          <Text className="text-sm opacity-40">Age</Text>
          <TextInput
            value={user.age as any}
            onChangeText={(e) => handleChange("age", e)}
            className="tracking-wider text-base"
          ></TextInput>
        </View> */}
        <View className="bg-main w-full py-4 rounded-[10px]">
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="font-bold text-xl text-white text-center">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
