import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";
import data, { OnboardingData } from "../data/data";
import Pagination from "../components/Pagination";
import Image from "../components/Image";
import { SafeAreaView } from "react-native-safe-area-context";
import Review from "../components/Review";
import ProductInfo from "../components/ProductInfo";
import { HeartIcon } from "react-native-heroicons/outline";
import { IProduct, RVariant, User } from "../types/type";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { imgProductDefault } from "../utils/imageDefault";
import {
  addFavoriteProduct,
  callFetchProductById,
  checkFavoriteProduct,
  fetchCommentProduct,
  removeFavoriteProduct,
} from "../api/api";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Rating } from "@kolking/react-native-rating";
import { HeartIcon as NoF } from "react-native-heroicons/outline";
import { HeartIcon as F } from "react-native-heroicons/solid";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Confirm from "../components/Confirm";
type RouteParams = {
  id: string;
};

const DetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const [form, setForm] = useState(false);
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState<Comment[]>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const [item, setItem] = useState<IProduct>();
  const [active, setActive] = useState(false);
  const [profile, setProfile] = useState<User>();

  const containerRef = useRef<View>(null);
  const handleCheckFavorite = async () => {
    const re = (await checkFavoriteProduct(id)) as any;
    if (re && re.data) {
      setIsFavorite(re.data.checkProduct);
    }
  };
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };
  const handleFavorite = async () => {
    if (!profile) {
      navigation.navigate("Login");
      return;
    }
    if (isFavorite) {
      const re = await removeFavoriteProduct(id);
      if (re && re.data) {
        setLoad(!load);
        setIsFavorite(!isFavorite);
      }
    } else {
      const re = await addFavoriteProduct({
        product: {
          _id: id,
          name: item?.name,
        },
      });

      if (re && re.data) {
        setLoad(!load);
        setIsFavorite(!isFavorite);
      }
    }
  };
  const callFetchCommentProduct = async () => {
    const re = (await fetchCommentProduct(id)) as any;
    if (re && re.data) {
      setComment(re.data.result);
    }
  };
  useEffect(() => {
    callFetchCommentProduct();
  }, [load]);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const handlePressOutside = () => {
    setActive(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handlePressOutside
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  const fetchProductDetail = async () => {
    const data: any = await callFetchProductById(id);
    if (data) {
      setItem(data.data);
    } else {
      console.log("🚀 ~ fetchProductDetail ~ data:", data);
    }
  };
  const getProfile = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const userObject = JSON.parse(user);
      setProfile(userObject);
    }
  };
  useEffect(() => {
    getProfile();
    fetchProductDetail();
    handleCheckFavorite();
  }, []);

  return (
    <SafeAreaView className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="relative">
        {item && (
          // < onPress={handlePressOutside}>
          <View
            className="flex flex-col items-center justify-center"
            onTouchEnd={handlePressOutside}
          >
            <Animated.FlatList
              ref={flatListRef}
              onScroll={onScroll}
              data={item.images}
              renderItem={({ item, index }) => {
                return <Image key={item} item={item} index={index} x={x} />;
              }}
              keyExtractor={(item) => item.id}
              scrollEventThrottle={16}
              horizontal={true}
              bounces={false}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{
                minimumViewTime: 300,
                viewAreaCoveragePercentThreshold: 10,
              }}
            />
            <View>
              {item?.images && <Pagination item={item.images} x={x} />}
            </View>
            <Text className="mt-5 mb-[10px] font-bold text-xl">
              {item.name}
            </Text>
            <Text className="text-xl text-money mb-[10px]">${item.price}</Text>
            <View className="flex flex-row mb-10">
              <Rating baseColor="#FF952D" disabled size={18} rating={5} />
              {/* <Text>Sumbit a Review</Text> */}
            </View>
            <View className="flex flex-row items-center">
              <View
                className={`w-[140px] ${
                  form ? "" : "border-b-[3px] border-main"
                }`}
              >
                <TouchableOpacity onPress={() => setForm(false)}>
                  <Text
                    className={`${
                      form ? "" : "text-main"
                    } font-semibold text-base text-center`}
                  >
                    Infomation
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                className={`w-[140px] ${
                  form ? "border-b-[3px] border-main" : ""
                }`}
              >
                <TouchableOpacity onPress={() => setForm(true)}>
                  <Text
                    className={`${
                      form ? "text-main" : ""
                    } font-semibold text-base text-center`}
                  >
                    Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-5 w-full">
              <View className="w-full h-[302px] bg-white mt-[10px] mb-40 rounded-[10px]">
                {form ? (
                  <Review comment={comment as any} />
                ) : (
                  <ProductInfo info={item.description} />
                )}
              </View>
            </View>
          </View>
        )}

        <View className="absolute bottom-0 w-full mb-10">
          <View className="px-10 flex flex-row items-center">
            <View className="bg-main flex-1 py-4 rounded-[30px] mr-7">
              <TouchableOpacity onPress={() => setActive(true)}>
                <Text className="font-bold text-xl text-white text-center">
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </View>
            {item && true ? (
              <F size={36} color="red" onPress={handleFavorite} />
            ) : (
              <NoF size={36} color="#000000" onPress={handleFavorite} />
            )}
          </View>
        </View>
      </ScrollView>
      {active && <Confirm id={id} item={item} user={profile?._id} />}
    </SafeAreaView>
  );
};

export default DetailScreen;
