import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICartItem, IOrder, RECEIPT_STATUS } from "../types/type";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { imgProductDefault } from "../utils/imageDefault";
import { callFetchImagesProductById } from "../api/api";

type Props = {
  item: IOrder;
  setForm: Dispatch<SetStateAction<boolean>>;
  setProduct: Dispatch<SetStateAction<ICartItem>>;
};

const Order = ({ item, setForm, setProduct }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [uriImages, setUriImages] = useState<string[]>([]);

  // Lấy idP từ sản phẩm đầu tiên trong danh sách
  const idP = item.items?.[0]?.product;

  // Hàm fetch hình ảnh theo id sản phẩm
  const fetchImagesById = async (id: string) => {
    if (!id) return;
    try {
      const re: any = await callFetchImagesProductById(id);
      if (re && re.data) {
        setUriImages(re.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Gọi fetch hình ảnh khi idP thay đổi
  useEffect(() => {
    fetchImagesById(idP || "");
  }, [idP]);

  const handleClick = (item: ICartItem) => {
    setForm(true);
    setProduct(item);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderDetail", { id: item._id, user: item.user })
      }
    >
      <View className="p-[10px] bg-white rounded-[10px] mb-[10px]">
        {item.items &&
          item.items.map((order, i) => (
            <View
              key={i}
              className={`flex flex-row items-center gap-[10px] pb-[10px] border-b border-gray1 ${
                i >= 1 ? "mt-[10px]" : "mt-[5px]"
              }`}
            >
              <Image
                source={{ uri: uriImages[0] }}
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
                  <Text className="text-xs mr-1">x{order.quantity}</Text>
                  {item.statusSupplier === RECEIPT_STATUS.DELIVERED &&
                    item.statusUser === RECEIPT_STATUS.CONFIRMED && (
                      <TouchableOpacity onPress={() => handleClick(order)}>
                        <View className="w-[80px] h-8 bg-main rounded-2xl flex items-center justify-center">
                          <Text className="text-xs text-white">Review</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            </View>
          ))}
        <View className="mt-[10px] w-full flex flex-col items-start space-y-2">
          <Text className="text-xs text-main">
            {item.isCheckout ? `Đã thanh toán` : `Chưa thanh toán`}
          </Text>
          <Text className="text-xs text-main">{item.statusUser}</Text>
          <Text className="text-money">Total: {item.total} VNĐ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Order;
