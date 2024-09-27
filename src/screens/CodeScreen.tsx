import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState } from "react";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SignUp } from "../types/type";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { userCheckCodeActive } from "../api/api";

type RouteParams = {
  email: string;
  active: number;
};

const CodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { email, active } = route.params as RouteParams;
  const [checkCode, setCheckCode] = useState<string>();
  const handleSubmit = async () => {
    // nếu cần xác thực lại tài khoản
    const res: any = await userCheckCodeActive(email, checkCode as string);
    if (res && res.data) {
      Toast.show({
        type: "success",
        text1: "Xác thực tài khoản thành công.",
      });
      if (active === 1) {
        navigation.replace("Login");
      }
      // quên mật khẩu
      else if (active === 2) {
        navigation.replace("ChangePass", { code: checkCode, email });
      }
    } else {
      const { message } = res;
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
            <Text className="text-5xl text-main">Cloths</Text>
            <Text className="text-5xl text-main">for Everyone</Text>
          </View>
          <View className=" absolute flex flex-row items-center justify-between bottom-0">
            <View className="w-[134px] py-3 border-b-2 border-main">
              <Text className="text-center text-main text-base font-semibold">
                Confirm OTP
              </Text>
            </View>
          </View>
        </View>
        <View className="flex gap-[30px] flex-col items-center justify-center px-[50px] mt-5">
          <View className="flex flex-col items-center justify-between w-full space-y-1">
            <Text className="text-sm">
              Một mã OTP đã gửi đến Email của bạn có hiệu lực trong 5 phút
            </Text>
          </View>
          <View>
            <Text className="font-bold text-base text-gray2">Enter OTP</Text>
          </View>
          <View className="w-full">
            <OTPInputView
              style={{ width: "100%", height: 20 }}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setCheckCode(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
        </View>
        <View className="absolute bottom-0 w-full mb-10">
          <View className="px-[30px]">
            <View className="bg-main py-4 rounded-[30px]">
              <TouchableOpacity onPress={handleSubmit}>
                <Text className="font-bold text-xl text-white text-center">
                  Continue
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

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 50,
    height: 50,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  textColor: {
    color: "#33A0FF",
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    color: "#33A0FF",
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default CodeScreen;
