import { HeartIcon } from "react-native-heroicons/outline";
import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HeartIcon as NoF } from "react-native-heroicons/outline";
import { HeartIcon as F } from "react-native-heroicons/solid";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IProduct } from "../types/type";
import {
  addFavoriteProduct,
  callFetchImagesProductById,
  callFetchProductById,
  checkFavoriteProduct,
  removeFavoriteProduct,
} from "../api/api";

type Props = {
  name: string;
  item: IProduct;
  user: any;
  setLoad: Dispatch<SetStateAction<boolean>>;
  load: boolean;
};
const ProductFavorite = ({ name, item, user, setLoad, load }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [uriImages, setUriImages] = useState([]);
  const fetchImagesById = async () => {
    const re: any = await callFetchImagesProductById(item.product._id);
    if (re && re.data) {
      setUriImages(re.data);
    }
  };
  const handleCheckFavorite = async () => {
    const re = (await checkFavoriteProduct(item._id)) as any;
    if (re && re.data) {
      setIsFavorite(re.data?.checkProduct);
    }
  };
  const fetchProductById = async () => {
    const re = await callFetchProductById(item.product._id);
    if (re && re.data) {
      setData(re.data);
    }
  };
  useEffect(() => {
    fetchImagesById();
    fetchProductById();
    handleCheckFavorite();
    return () => {};
  }, []);

  const handleFavorite = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    if (isFavorite) {
      const re = await removeFavoriteProduct(item._id);
      if (re && re.data) {
        setLoad(!load);
        setIsFavorite(!isFavorite);
      }
    } else {
      const re = await addFavoriteProduct({
        product: {
          _id: item._id,
          name: item.name,
        },
      });

      if (re && re.data) {
        setLoad(!load);
        setIsFavorite(!isFavorite);
      }
    }
  };
  return (
    <View className="flex flex-row justify-center">
      <TouchableOpacity
        key={data?._id}
        className={`bg-white ${
          name === "Home" ? "w-[180px] mr-10" : `w-[170px]`
        } h-[352px] rounded-[10px] relative`}
        onPress={() => navigation.navigate("Detail", { id: data?._id })}
      >
        <Image
          source={{
            uri: uriImages[0],
          }}
          style={{
            width: name === "Home" ? 140 : 120,
            height: 180,
          }}
          className={`rounded-[10px] absolute mt-[10px] ${
            name === "Home" ? "left-5" : "left-[15px]"
          }`}
        />
        <View className="mt-[210px] flex flex-col items-center justify-center">
          <Text className="font-bold">
            {data?.name.length > 20
              ? data?.name.slice(0, 20) + "..."
              : data?.name}
          </Text>
          <Text className="mt-[6px]">{data?.brand}</Text>
          <Text className="mt-[6px]">{data?.name}</Text>
          {/* <Text className="text-money">${data?.price}</Text> */}
          <View className="flex flex-row items-center justify-between mt-[10px] px-5">
            {name !== "Home" ? (
              <TouchableOpacity
                className={`w-[100px] h-8 rounded-[10px] bg-main flex items-center justify-center ${
                  name === "Home" ? "mr-5" : "mr-2"
                }`}
              >
                <Text className="text-white">Add To Cart</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {isFavorite ? (
              <F size={24} color="red" onPress={handleFavorite} />
            ) : (
              <NoF size={24} color="#000000" onPress={handleFavorite} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductFavorite;
