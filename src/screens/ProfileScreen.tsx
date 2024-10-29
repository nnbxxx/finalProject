import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";

import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { User } from "../types/type";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUserInfo, userLogout } from "../api/api";
import ProfileInfo from "../components/ProfileInfor";

type RouteParams = {
  profile: User;
};
const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { profile } = route.params as RouteParams;
  const [infoUser, setInfoUser] = useState<any>(profile);

  const { height } = useWindowDimensions();
  const modifiedHeight = height + 36;
  const handleGetInfo = async () => {
    const re = await getUserInfo(profile._id);
    if (re && re.data) {
      const { _id, name, email, gender, age, address, avatar } = re.data as any;
      const iUser = {
        _id,
        name,
        email,
        gender,
        age,
        address,
        avatar,
      };
      setInfoUser(iUser);
    }
  };
  useEffect(() => {
    handleGetInfo();
    return () => {};
  }, []);
  const handleLogout = async () => {
    const res = await userLogout();
    if (res && res.data) {
      Toast.show({
        type: "success",
        text1: "Logout Success",
      });
      navigation.replace("Login");
      AsyncStorage.clear();
    } else {
      const { message } = res as any;
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };
  return (
    <SafeAreaView className="bg-background" style={{ height: modifiedHeight }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col items-center justify-center p-10">
          <View className="flex flex-row items-center mb-10">
            <ChevronLeftIcon color="black" width={24} height={24} />
            <Text className="font-medium text-xl flex-1 text-center">
              My Profile
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="font-medium text-lg flex-1">Personal details</Text>
            <Text className="text-main">Change</Text>
          </View>
          <View className="mt-[10px] mb-[30px]">
            <ProfileInfo profile={infoUser} />
          </View>
          <View className="flex flex-col gap-[14px]">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Order", { user: profile?._id })
              }
              className="w-full flex flex-row items-center justify-between py-4 px-[30px] bg-white rounded-[20px]"
            >
              <Text className="font-medium text-lg">Orders</Text>
              <ChevronRightIcon color="black" width={24} height={24} />
            </TouchableOpacity>
            <View className="w-full flex flex-row items-center justify-between py-4 px-[30px] bg-white rounded-[20px]">
              <Text className="font-medium text-lg">Favorites</Text>

              <ChevronRightIcon color="black" width={24} height={24} />
            </View>
            <View className="w-full flex flex-row items-center justify-between py-4 px-[30px] bg-white rounded-[20px]">
              <Text className="font-medium text-lg">Change Password</Text>

              <ChevronRightIcon color="black" width={24} height={24} />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ListAddress", { user: profile?._id })
              }
              className="w-full flex flex-row items-center justify-between py-4 px-[30px] bg-white rounded-[20px]"
            >
              <Text className="font-medium text-lg">Delivery Addresses</Text>
              <ChevronRightIcon color="black" width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View className="px-[105px] py-[15px] rounded-[30px] bg-main mt-10 mb-20">
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-xl font-bold text-white">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar name="Profile" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
