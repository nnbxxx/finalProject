import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { HeartIcon } from "react-native-heroicons/outline";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { imgProductDefault } from "../utils/imageDefault";
import { IProduct } from "../types/type";

type Props = {
  name: string;
  item: IProduct;
  user: any;
};
const Product = ({ name, item }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View
      key={item._id}
      className={`bg-white ${
        name === "Home" ? "w-[180px]" : "w-[170px]"
      } h-[352px] rounded-[30px] mr-10 relative`}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { id: item._id })}
      >
        <Image
          source={{
            uri: imgProductDefault.uri,
          }}
          style={{
            width: 140,
            height: 180,
          }}
          className={`rounded-[20px] absolute top-[10px] ${
            name === "Home" ? "left-5" : "left-[15px]"
          }`}
        />
        <View className="mt-[210px] flex flex-col items-center justify-center">
          <Text className="font-bold">
            {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
          </Text>
          <Text className="mt-[6px]">{item.brand}</Text>
          <Text className="text-money">${item.price}</Text>
          <View className="flex flex-row items-center justify-between mt-[10px]">
            <TouchableOpacity className="w-[100px] h-8 rounded-[36px] bg-main flex items-center justify-center mr-5">
              <Text className="text-white">Add To Cart</Text>
            </TouchableOpacity>
            <HeartIcon width={20} color="#000000" height={18} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
