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

import { imgProductDefault } from "../utils/imageDefault";
import { IProduct } from "../types/type";
import {
  addCartItemUser,
  addFavoriteProduct,
  checkFavoriteProduct,
  removeFavoriteProduct,
} from "../api/api";
import Toast from "react-native-toast-message";
type Props = {
  name: string;
  item: IProduct;
  user: any;
  setLoad: Dispatch<SetStateAction<boolean>>;
  load: boolean;
};
const Product = ({ name, item, user, setLoad, load }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleCheckFavorite = async () => {
    const re = (await checkFavoriteProduct(item._id)) as any;
    if (re && re.data) {
      setIsFavorite(re.data.checkProduct);
    }
  };
  useEffect(() => {
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
  const handleAddCart = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    const product = {
      _id: item?._id,
      name: item?.name,
      price: item?.price,
      quantity: 1,
    };
    const re = await addCartItemUser(product);
    if (re.data) {
      Toast.show({
        type: "success",
        text1: "Add to Cart Success",
      });
      navigation.replace("Cart", { user: user });
    } else {
      const { message, statusCode } = re as any;
      Toast.show({
        type: "error",
        text1: JSON.stringify(message),
      });
    }
  };
  return (
    <View className="flex flex-row justify-center">
      <TouchableOpacity
        key={item._id}
        className={`bg-white ${
          name === "Home" ? "w-[180px] mr-10" : `w-[170px]`
        } h-[352px] rounded-[30px] relative`}
        onPress={() => navigation.navigate("Detail", { id: item._id })}
      >
        <Image
          source={{
            uri: imgProductDefault.uri,
          }}
          style={{
            width: name === "Home" ? 140 : 120,
            height: 180,
          }}
          className={`rounded-[20px] absolute mt-[10px] ${
            name === "Home" ? "left-5" : "left-[15px]"
          }`}
        />
        <View className="mt-[210px] flex flex-col items-center justify-center">
          <Text className="font-bold">
            {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
          </Text>
          <Text className="mt-[6px]">{item.brand}</Text>
          <Text className="text-money">${item.price}</Text>
          <View className="flex flex-row items-center justify-between mt-[10px] px-5">
            {name !== "Home" ? (
              <TouchableOpacity
                className={`w-[100px] h-8 rounded-[36px] bg-main flex items-center justify-center ${
                  name === "Home" ? "mr-5" : "mr-2"
                }`}
                onPress={handleAddCart}
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

export default Product;
