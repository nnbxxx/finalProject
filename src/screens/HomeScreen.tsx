import { View, Text, Image, TouchableOpacity } from "react-native";
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={check}>
        <Image
          source={require("../../assets/avatar.jpg")}
          style={{ height: hp(10), width: hp(10.5) }}
        />
      </TouchableOpacity>
      {user && (
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
