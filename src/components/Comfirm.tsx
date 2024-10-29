import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { IProduct } from "../types/type";
// import axios from "../utils/axios";
import Toast from "react-native-toast-message";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addCartItemUser } from "../api/api";

type Props = {
  id: string;
  item: IProduct | undefined;
  user: string | undefined;
};

const Comfirm = ({ id, item, user }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [items, setItems] = useState<IProduct>(item as IProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDes = () => {
    if (quantity <= 1) return;
    else {
      setQuantity(quantity - 1);
    }
  };
  const handleIns = () => {
    if (quantity >= +items.stock) return;
    else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddCart = async () => {
    const product = {
      _id: item?._id,
      name: item?.name,
      price: item?.price,
      quantity: quantity,
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
    <View className="absolute bottom-0 w-screen h-auto bg-white rounded-[30px] ">
      <View className="p-5">
        <View className="w-full border-b border-gray1 pb-[10px]">
          <Text className="text-center font-bold text-base">{item?.name}</Text>
        </View>

        <View className="py-5 px-[10px] flex flex-row gap-10 items-center">
          <View>
            {items.stock === 0 ? (
              <Text className="font-semibold text-gray1">Available: </Text>
            ) : (
              <Text className="font-semibold text-gray1">
                Available: {items.stock}
              </Text>
            )}
          </View>
          <View className="flex flex-row items-center justify-between w-[180px] h-10 rounded-[30px] border">
            <View className="flex-1">
              <TouchableOpacity onPress={handleDes}>
                <Text className="font-bold text-xl text-center">-</Text>
              </TouchableOpacity>
            </View>
            <View className="h-8 border border-gray3"></View>
            <View className="flex-1">
              <Text className="font-bold text-xl text-center">{quantity}</Text>
            </View>
            <View className="h-8 border border-gray3"></View>

            <View className="flex-1">
              <TouchableOpacity onPress={handleIns}>
                <Text className="font-bold text-xl text-center">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="px-5">
          <TouchableOpacity onPress={handleAddCart}>
            <View className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center">
              <Text className="text-white text-xl font-bold tracking-[4px]">
                Comfirm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Comfirm;
