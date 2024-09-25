import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  useWindowDimensions,
  Dimensions,
  FlatList,
} from "react-native";
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

import Toast from "react-native-toast-message";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Product from "../components/Product";
import Navbar from "../components/Navbar";
import { ICategory, IProduct } from "../types/type";
import Loading from "../components/Loading";
import { callFetchListCategory, callFetchListProduct } from "../api/api";
import data from "../data/data";

type Params = {
  id: string;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [user, setUser] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [category, setCategory] = useState<ICategory[]>();
  const [cateId, setCateId] = useState("");
  const [items, setItems] = useState<IProduct[]>();
  const [hots, setHots] = useState<IProduct[]>();
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const getProfile = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObject = JSON.parse(user);
        setUser(userObject._id);
      }
    };
    getProfile();
  }, []);
  // const handleKeyPress = ({
  //   nativeEvent,
  // }: {
  //   nativeEvent: { key: string };
  // }) => {
  //   if (nativeEvent.key === "Enter") {
  //     performSearch();
  //   }
  // };
  const performSearch = () => {
    console.log("🚀 ~ performSearch ~ keyword:", keyword);
    navigation.navigate("Search", { keyword: keyword });
    Keyboard.dismiss();
  };

  const { height } = useWindowDimensions();
  const modifiedHeight = height + 36;
  const fetchListCategory = async () => {
    const data: any = await callFetchListCategory("?current=1&pageSize=1000");
    if (data && data.data) {
      setCategory(data.data.result);
    } else {
      console.log("🚀 ~ fetchListItems ~ data:", data);
    }
  };
  const fetchListItems = async () => {
    // lấy 10 sản phẩm gần đây nhất
    const data: any = await callFetchListProduct(
      "current=1&pageSize=10&sort=-createdAt"
    );
    if (data && data.data) {
      setItems(data.data.result);
    } else {
      console.log("🚀 ~ fetchListItems ~ data:", data);
    }
    const dataHot: any = await callFetchListProduct(
      "current=1&pageSize=10&sort=-quantitySold"
    );
    if (dataHot && dataHot.data) {
      setHots(dataHot.data.result);
      setTotal(dataHot.data.meta.total);
    } else {
      console.log("🚀 ~ fetchListItems ~ dataHot:", dataHot);
    }
  };

  useEffect(() => {
    fetchListItems();
    fetchListCategory();
  }, []);
  const handleChange = (id: string, index: number) => {
    setCateId(id);
    setActive(index);
  };
  const handleMoveCart = () => {
    navigation.navigate("Cart", { user: user });
  };
  return (
    <SafeAreaView className="relative" style={{ height: modifiedHeight }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-background"
      >
        <View className="pt-[50px]">
          <View className="flex flex-row justify-between items-center px-[50px]">
            <View>
              <Text className="text-main text-3xl">Cloths</Text>
              <Text className="text-main text-3xl">For Everyone</Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleMoveCart}>
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
              </TouchableOpacity>
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
                placeholder="Search SomeThings"
                value={keyword}
                onChangeText={setKeyword}
              ></TextInput>
              <View className="px-[13px]">
                <TouchableOpacity onPress={performSearch}>
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
              {category &&
                category.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleChange(item._id as string, i)}
                  >
                    <View
                      className={`w-20 h-[33px] mr-[10px] ${
                        active === i ? "border-b-[3px] border-main" : ""
                      } `}
                    >
                      <Text className="text-main text-base text-center">
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
          <View className="mt-[30px] pl-10">
            <View className="pr-5 mb-[5px]">
              <Text className="text-xs text-main text-right">
                See more &gt;
              </Text>
            </View>
            <View className="flex flex-row">
              <View>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingTop: 20 }}
                  data={items}
                  keyExtractor={(item: any, idx) => item._id + idx}
                  renderItem={({ item }) => (
                    <Product name="Home" key={item._id} item={item} />
                  )}
                />
              </View>
            </View>
          </View>
          <View className="mt-[50px] pl-10 mb-[100px]">
            <View className="flex flex-row justify-between items-center pr-5 mb-[5px]">
              <Text className="font-bold text-xl tracking-[4px] text-main">
                HOT
              </Text>
              <Text className="text-xs text-main text-right ">
                All({total}) &gt;
              </Text>
            </View>
            <View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20 }}
                data={hots}
                keyExtractor={(item: any, idx) => item._id + idx}
                renderItem={({ item }) => (
                  <Product name="Home" key={item._id} item={item} />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Navbar name="Home" />
    </SafeAreaView>
  );
};

export default HomeScreen;
