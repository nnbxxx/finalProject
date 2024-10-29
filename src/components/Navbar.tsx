import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  NavigationContainer,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/type";

type Props = {
  name: string;
};

const Navbar = ({ name }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [profile, setProfile] = useState<User>();
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
  const check = async (name: string) => {
    if (token) {
      navigation.navigate(name, { id: profile?._id, profile: profile });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View className="bg-white absolute bottom-0 right-0 left-0 h-20 flex flex-row items-center justify-between px-[50px] rounded-t-[30px] z-50">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <HomeIcon color={`${name === "Home" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Favorite", { id: profile?._id })}
      >
        <HeartIcon color={`${name === "Favorites" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => check("Profile")}>
        <UserIcon color={`${name === "Profile" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => check("Order")}>
        <QueueListIcon color={`${name === "Orders" ? "#33A0FF" : "#ADADAF"}`} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
