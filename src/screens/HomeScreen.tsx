import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import axios from "../utils/axios-customize";
import Toast from "react-native-toast-message";
import { userLogout } from "../api/api";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import Navbar from "../components/Navbar";

type Params = {
  id: string;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [user, setUser] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(user);
    };
    const getId = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObject = JSON.parse(user);
        setId(userObject._id);
      }
    };

    getUser();
    getId();
  }, []);
  const check = async () => {
    if (user) {
      // Xử lý khi user tồn tại
    } else {
      navigation.navigate("Login");
    }
  };

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
    // <View
    //   style={{
    //     flex: 1,
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <TouchableOpacity onPress={check}>
    //     <Image
    //       source={require("../../assets/avatar.jpg")}
    //       style={{ height: hp(10), width: hp(10.5) }}
    //     />
    //   </TouchableOpacity>
    //   {user && (
    //     <View>
    //       <TouchableOpacity onPress={handleLogout}>
    //         <Text>Logout</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}
    // </View>
    <SafeAreaView className="h-screen relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-background"
      >
        <View className="pt-[50px]">
          <View className="flex flex-row justify-between items-center px-[50px]">
            <View>
              <Text className="text-main text-3xl">Sneakers</Text>
              <Text className="text-main text-3xl">For Everyone</Text>
            </View>
            <View>
              <View className="relative">
                <ShoppingCartIcon
                  size={30}
                  className="text-main"
                  color="#33A0FF"
                />
              </View>
              <View className="w-4 h-4 rounded-full bg-main absolute right-[-5px] top-[-3px]">
                <Text className="text-[10px] text-white text-center">3</Text>
              </View>
            </View>
          </View>
          <View className="px-10">
            <View className="bg-search py-[10px] pl-[30px] flex flex-row items-center justify-between my-10 rounded-full">
              <TextInput
                className="text-gray1 flex-1"
                onKeyPress={() => {}}
                placeholder="women"
                value={"1"}
                onChangeText={() => {}}
              ></TextInput>
              <View className="px-[13px]">
                <TouchableOpacity onPress={() => {}}>
                  <MagnifyingGlassIcon color="#33A0FF" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="w-full"
          >
            <View className="flex flex-row justify-between pl-10">
              {/* {category &&
                category.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => handleChange(item._id as string, i)}
                  >
                    <View
                      key={i}
                      className={`w-20 h-[33px] mr-[10px] ${
                        active === i ? "border-b-[3px] border-main" : ""
                      } `}
                    >
                      <Text className="text-main text-base text-center">
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))} */}
              <Text></Text>
              <Text className="text-xs text-main text-right">
                Danh Sách Category
              </Text>
            </View>
          </ScrollView>
          <View className="mt-[30px] pl-10">
            <View className="pr-5 mb-[5px]">
              <Text className="text-xs text-main text-right">
                See more &gt;
              </Text>
            </View>
            <View className="flex flex-row">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20 }}
              >
                {/* {items &&
                  items.map((item) => (
                    <Product name="Home" key={item._id} item={item} />
                  ))} */}
                <Text className="text-xs text-main text-right">
                  Danh Sách Products
                </Text>
              </ScrollView>
            </View>
          </View>
          <View className="mt-[50px] pl-10 mb-[100px]">
            <View className="flex flex-row justify-between items-center pr-5 mb-[5px]">
              <Text className="font-bold text-xl tracking-[4px] text-main">
                HOT
              </Text>
              <Text className="text-xs text-main text-right ">
                {/* All({total}) &gt; */}
              </Text>
            </View>
            <View className="flex flex-row">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20 }}
              >
                <Text className="text-xs text-main text-right">
                  Danh Sách Hot product
                </Text>
                {/* {hots &&
                  hots.map((item) => (
                    <Product name="Home" key={item._id} item={item} />
                  ))} */}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <Navbar name="Home" />
    </SafeAreaView>
  );
};

export default HomeScreen;
