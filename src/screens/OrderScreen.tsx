import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import Order from "../components/Order";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { IOrder, ICartItem } from "../types/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { callFetchListReceipt } from "../api/api";
import data from "../data/data";
import Toast from "react-native-toast-message";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
type Params = {
  id: string;
};

const OrdersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const statuses = [
    "All",
    "Unconfirm", //UNCONFIRMED u u
    "Confirm", //CONFIRMED c c
    "Prepare", //PREPARE c p
    "On Delivery", // ON_DELIVERY c o
    "Delivered", //DELIVERED c d
    "Cancel", //CANCEL ca ca
  ];
  const query = {
    unconfirm: "&statusUser=UNCONFIRMED&statusSupplier=UNCONFIRMED",
    confirm: "&statusUser=CONFIRMED&statusSupplier=CONFIRMED",
    prepare: "&statusUser=CONFIRMED&statusSupplier=PREPARE",
    onDelivery: "&statusUser=CONFIRMED&statusSupplier=ON_DELIVERY",
    delivered: "&statusUser=CONFIRMED&statusSupplier=DELIVERED",
    cancel: "&statusUser=CANCEL&statusSupplier=CANCEL",
  };
  const route = useRoute();

  const { id } = route.params as Params;

  const [active, setActive] = useState("All");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [product, setProduct] = useState<ICartItem[]>();
  const [form, setForm] = useState(false);
  const handlePressOutside = () => {
    setForm(false);
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
  const fetchListReceipt = async (query: string) => {
    const re: any = await callFetchListReceipt(query);
    if (re && re.data) {
      setOrders(re.data.result);
    } else {
      const { message, statusCode } = re as any;
      Toast.show({
        type: "error",
        text1: JSON.stringify(message),
      });
    }
  };
  useEffect(() => {
    switch (active) {
      case "All":
        fetchListReceipt("");
        break;
      case "Unconfirm":
        fetchListReceipt(query.unconfirm);
        break;
      case "Confirm":
        fetchListReceipt(query.confirm);
        break;
      case "Prepare":
        fetchListReceipt(query.prepare);
        break;
      case "On Delivery":
        fetchListReceipt(query.onDelivery);
        break;
      case "Delivered":
        fetchListReceipt(query.delivered);
        break;
      case "Cancel":
        fetchListReceipt(query.cancel);
      default:
        fetchListReceipt("");
    }
  }, [active]);
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View className="relative px-5 h-screen">
          <View className="relative mt-10 mb-7 flex flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute left-0"
            >
              <ArrowLeftIcon size={24} color={"#000000"} />
            </TouchableOpacity>
            <Text className="font-medium text-lg">Orders</Text>
          </View>
          <View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 20 }}
              data={statuses}
              keyExtractor={(item, idx) => item + idx}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setActive(item)}>
                  <View
                    className={`w-[100px] h-7 ${
                      active === item ? "border-main border-b" : ""
                    }`}
                    key={item}
                  >
                    <Text
                      className={`${
                        active === item ? "text-main" : "text-gray1"
                      } text-center text-base`}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          {orders.length === 0 ? (
            <View className="mt-[50px] h-[50px]">
              <Loading name="Order" />
            </View>
          ) : (
            <View className="mt-[10px]">
              <FlatList
                showsVerticalScrollIndicator={false}
                data={orders}
                renderItem={({ item }) => (
                  <Order
                    item={item}
                    setForm={setForm}
                    setProduct={
                      setProduct as Dispatch<SetStateAction<ICartItem[]>>
                    }
                  />
                )}
              />
            </View>
          )}

          <Navbar name="Orders" />
          {form && (
            <Comments
              setForm={setForm}
              user={id}
              product={product as ICartItem[]}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default OrdersScreen;
