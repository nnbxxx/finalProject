import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { ICartItem, IOrder, RECEIPT_STATUS } from "../types/type";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { imgProductDefault } from "../utils/imageDefault";
type Props = {
  item: IOrder;
  setForm: Dispatch<SetStateAction<boolean>>;
  setProduct: Dispatch<SetStateAction<ICartItem[]>>;
};

const Order = ({ item, setForm, setProduct }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleClick = () => {
    setForm(true);
    setProduct(item.items);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetail", { id: item._id, user: item.user })
      }
    >
      <View className="p-[10px] bg-white rounded-[5px]">
        {item.items &&
          item.items.map((order, i) => (
            <View
              className={`flex flex-row items-center gap-[10px] pb-[10px] border-b border-gray1 ${
                i >= 1 ? "mt-[10px] " : "mt-[5px]"
              }`}
            >
              <Image
                source={{ uri: imgProductDefault.uri }}
                style={{
                  width: 80,
                  height: 80,
                }}
                borderRadius={5}
              />
              <View>
                <Text className="font-bold">{order.name}</Text>
                <Text className="text-money mt-[8px] mb-[22px]">
                  ${order.price}
                </Text>
                <View className="flex flex-row items-center justify-between">
                  {/* <Text className="text-xs">Size: {order.size}</Text>
                  <View className="flex flex-row items-center mx-[15px]">
                    <Text className="text-xs">Color:</Text>
                    <View className="relative w-[10px] h-[10px] bg-[#FFBE00] rounded-full ml-[5px]">
                      <View className="absolute left-[-2px] top-[-2px] p-[5px] rounded-full border-2 border-gray1"></View>
                    </View>
                  </View> */}
                  <Text className="text-xs">x{order.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
        <View className="mt-[10px] w-full flex flex-row items-center justify-between">
          <Text className="text-xs text-main">
            {item.isCheckout ? `Đã thanh toán` : `Chưa thanh toán`}
          </Text>
          <Text className="text-xs text-main">{item.statusUser}</Text>
          <Text className="text-money">Total: {item.total} VNĐ</Text>
          {item.statusSupplier === RECEIPT_STATUS.DELIVERED && (
            <TouchableOpacity onPress={handleClick}>
              <View className="w-[80px] h-8 bg-main rounded-2xl flex items-center justify-center">
                <Text className="text-xs text-white">Review</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Order;
