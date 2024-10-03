import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { RadioButton } from "react-native-paper";
import Address from "../components/Address";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Address as A, ICartItem, ItemCart } from "../types/type";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { checkoutReceipt } from "../api/api";

const unProps = {
  onCheckedItem: () => {},
  onRemoveItem: () => {},
};

type Params = {
  data: ICartItem[];
  user: string;
  total: number;
};

const CheckoutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [address, setAddress] = useState<A>();
  const route = useRoute();
  const [pay, setPay] = useState("COD");
  const { data, user, total } = route.params as Params;

  useEffect(() => {
    // const fetchData = async () => {
    //   const { data } = await axios.get(`/address/user/default?user=${user}`);
    //   if (data.success) {
    //     setAddress(data.data);
    //   } else setAddress(undefined);
    // };
    // fetchData();
  }, []);

  const handleOrder = async () => {
    const itemCart = data.map((item) => {
      const { product, name, price, quantity } = item;
      return { product, name, price, quantity };
    });
    console.log("🚀 ~ itemCart ~ itemCart:", itemCart);
    const re = await checkoutReceipt({
      items: itemCart,
      supplier: "demo 123",
      notes: "test demo",
      address: {
        province: "Thành phố Hà Nội",
        district: "Quận Ba Đình",
        ward: "Phường Trúc Bạch",
        detail: "45/2/1 abc xyz",
      },
    });
    if (re && re.data) {
      Toast.show({ type: "success", text1: "Order Success" });
      navigation.replace("Order", { user: user });
    } else {
      const { message, statusCode } = re as any;
      Toast.show({
        type: "error",
        text1: JSON.stringify(message),
      });
    }
    // if (!address) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Please Create Address",
    //   });
    //   navigation.navigate("ManageAddress");
    // } else {
    //   const { data } = await axios.post("/orders", {
    //     items: itemCart,
    //     userID: user,
    //     deliveryAddress: address._id,
    //     paymentMethod: pay,
    //     total: total,
    //   });
    //   if (data.success) {
    //     Toast.show({ type: "success", text1: "Order Success" });
    //     navigation.replace("Order", { user: user });
    //   }
    // }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="relative h-screen flex flex-col items-center">
          <View className="px-10 flex flex-col items-center w-full">
            <View className="relative flex flex-row items-center justify-center mb-[30px] w-full">
              <TouchableOpacity
                className="absolute left-0"
                onPress={() => navigation.goBack()}
              >
                <ArrowLeftIcon size={24} color={"#000000"} />
              </TouchableOpacity>
              <Text className="font-medium text-lg">Checkout</Text>
            </View>
            <View className="w-full flex flex-row items-center justify-between">
              <Text className="font-medium text-base">Delivery Address</Text>
              <Text className="text-main">Change</Text>
            </View>
            {address && (
              <View className="mt-[10px] mb-[20px]">
                <Address data={address} />
              </View>
            )}
            <Text className="font-medium w-full">Order Details</Text>
            <View className="mt-[10px] h-[240px]">
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <CartItem data={item} {...unProps} type="Checkout" />
                )}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
              />
            </View>
          </View>
          <View className="absolute bottom-0 w-full px-10 flex justify-end">
            <View className="flex flex-col items-center justify-center">
              <Text className="w-full font-medium">Payment method</Text>
              <View className="py-[10px] bg-white rounded-[20px] w-full flex flex-row items-center justify-around">
                <View className="flex flex-row items-center ">
                  <RadioButton
                    value="COD"
                    status={pay === "COD" ? "checked" : "unchecked"}
                    onPress={() => setPay("COD")}
                  />
                  <Text className="text-lg ml-[10px]">COD</Text>
                </View>
                <View className="flex flex-row items-center ">
                  <RadioButton
                    value="VNPAY"
                    status={pay === "VNPAY" ? "checked" : "unchecked"}
                    onPress={() => setPay("VNPAY")}
                  />
                  <Text className="text-lg ml-[10px]">VNPay</Text>
                </View>
              </View>
              <View className="mt-9 w-full flex flex-row justify-between mb-5">
                <Text className="text-lg">Total</Text>
                <Text className="text-xl text-money">{total} VNĐ</Text>
              </View>
              <TouchableOpacity
                className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center mb-5"
                onPress={handleOrder}
              >
                <Text className="font-bold text-xl text-white tracking-widest">
                  Order Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
