import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  name: string;
};
const Navbar = ({ name }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const getToken = async () => {
      const userAccessToken = await AsyncStorage.getItem("access_token");
      setToken(userAccessToken);
    };
    const getProfile = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObject = JSON.parse(user);
        setProfile(userObject);
      }
    };

    getToken();
    getProfile();
  }, []);
  const check = async () => {
    if (token) {
      navigation.navigate("Profile", { profile: profile });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View className="bg-white w-full absolute bottom-[-40px] h-20 flex flex-row items-center justify-between px-[50px] rounded-t-[30px] drop-shadow-navbar">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <HomeIcon color={`${name === "Home" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity>
        <HeartIcon color={`${name === "Heart" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={check}>
        <UserIcon color={`${name === "Profile" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity>
        <QueueListIcon color={`${name === "Cart" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
