import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import {
  Address as A,
  Coupon as C,
  ICartItem,
  PAYMENT_METHOD,
} from "../types/type";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  activeCouponReceipt,
  callFetchListUserAddress,
  checkoutReceipt,
  getAddressUserDefault,
  getCouponsByUser,
} from "../api/api";
import Coupon from "../components/Coupon";
import MasonryList from "@react-native-seoul/masonry-list";
import WebView from "react-native-webview";
const unProps = {
  onCheckedItem: () => {},
  onRemoveItem: () => {},
};

type Params = {
  data: ICartItem[];
  user: string;
  total: number;
};
const unPropss = {
  setAddress: () => {},
  setOpen: () => {},
};
const CheckoutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [address, setAddress] = useState<A>();
  const [addresses, setAddresses] = useState<A[]>([]);
  const route = useRoute();
  const [pay, setPay] = useState("COD");
  const { data, user, total } = route.params as Params;
  const [items, setItems] = useState<C[]>();
  const [money, setMoney] = useState(total);
  const [active, setActive] = useState(false);
  const [chooseCoupon, setChooseCoupon] = useState<any>();
  const [open, setOpen] = useState(false);
  const handlePressOutside = () => {
    setActive(false);
    setOpen(false);
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
  const fetchListUserAddress = async () => {
    const re = (await callFetchListUserAddress(user)) as any;
    if (re && re.data) {
      setAddresses(re.data.result);
    }
  };
  const fetchDataAddressUser = async () => {
    const re = (await getAddressUserDefault()) as any;
    if (re && re.data) {
      setAddress(re.data);
    } else setAddress(undefined);
  };
  const fetchCouponsByUser = async () => {
    const re = (await getCouponsByUser(user)) as any;

    if (re && re.data) {
      const inactiveCoupons = re.data.couponsUser.filter(
        (coupon: any) => coupon.isActive === false
      );
      setItems(inactiveCoupons);
    }
  };

  useEffect(() => {
    fetchDataAddressUser();
    fetchCouponsByUser();
    fetchListUserAddress();
  }, []);
  useEffect(() => {
    // if (chooseCoupon) {
    //   if (chooseCoupon?.type === "percent") {
    //     const moneyReduce = (money * chooseCoupon.value) / 100;
    //     setMoney(money - moneyReduce);
    //   } else setMoney(money - chooseCoupon.value);
    // }
    // fetch coupon
  }, [chooseCoupon]);
  const handleOrder = async () => {
    const itemCart = data.map((item) => {
      const { product, name, price, quantity } = item;
      return { product, name, price, quantity };
    });

    if (!address) {
      Toast.show({
        type: "error",
        text1: "Please Create Address",
      });
      navigation.navigate("ManageAddress");
    } else {
      let data;
      if (!chooseCoupon) {
        data = {
          items: itemCart,
          supplier: "demo 123",
          notes: "test demo",
          paymentMethod: pay,
          address: {
            province: address?.province,
            district: address?.districts,
            ward: address?.wards,
            detail: address?.specific,
          },
        };
      } else {
        data = {
          items: itemCart,
          supplier: "demo 123",
          notes: "test demo",
          paymentMethod: pay,
          address: {
            province: address?.province,
            district: address?.districts,
            ward: address?.wards,
            detail: address?.specific,
          },
          coupon: [chooseCoupon.code],
        };
      }
      const re = await checkoutReceipt(data);
      if (re && re.data) {
        if (pay === "COD") {
          Toast.show({ type: "success", text1: "Order Success" });
          navigation.replace("Order", { id: user });
        } else {
          Linking.openURL("https://www.google.com/");
          Toast.show({ type: "success", text1: "Order Success" });
          navigation.replace("Order", { id: user });
        }
      }
    }
  };
  const handleSet = () => {
    setActive(true);
  };
  return (
    <SafeAreaView className="relative">
      <ScrollView showsVerticalScrollIndicator={false} className="h-screen">
        <View className="flex flex-col items-center pt-5">
          <View
            className="px-10 flex flex-col items-center w-full"
            onTouchMove={handlePressOutside}
          >
            <View className="relative flex flex-row items-center justify-center mb-[20px] w-full">
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
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text className="text-main">Change</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-[10px] mb-[10px]">
              <Address data={address as A} type="View" {...unPropss} />
            </View>

            <Text className="font-medium w-full">Order Details</Text>
            <View className="mt-[5px] w-full mb-[10px]">
              {data.map((item) => (
                <CartItem
                  key={item.product}
                  data={item as ICartItem}
                  {...unProps}
                  type="Checkout"
                />
              ))}
            </View>

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
          </View>
          <View className="w-full mt-2 px-10 h-[200px]">
            <View className="flex flex-row items-center justify-between">
              <Text className="font-medium">Choose Coupon</Text>
              <TouchableOpacity onPress={handleSet}>
                <View className="px-2 py-1 bg-main flex items-center justify-center rounded-xl">
                  <Text className="text-white">Choose</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text className="font-semibold text-lg text-center">
              {chooseCoupon?.name}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full px-10 bg-white rounded-[10px]">
        <View className="mt-2 w-full flex flex-row justify-between mb-5">
          <Text className="text-lg">Total</Text>
          <Text className="text-xl text-money">${money}</Text>
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
      {active && (
        <View className="absolute bottom-0 w-full h-[350px] bg-white">
          {items && (
            <MasonryList
              data={items}
              keyExtractor={(item): string => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 20,
                paddingRight: 20,
                paddingLeft: 20,
              }}
              renderItem={({ item }) => (
                <Coupon
                  item={item as C}
                  type="Checkout"
                  setChooseCoupon={
                    setChooseCoupon as Dispatch<SetStateAction<C>>
                  }
                  setActive={setActive}
                />
              )}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
            />
            // items.map((item) => (
            //     <Coupon
            //         item={item as C}
            //         type="Checkout"
            //         setChooseCoupon={setChooseCoupon as Dispatch<SetStateAction<C>>}
            //         setActive={setActive}
            //     ></Coupon>
            // ))}
          )}
        </View>
      )}
      {open && (
        <View className="absolute bottom-0 w-full h-[350px] bg-white">
          {addresses && (
            <MasonryList
              data={addresses}
              keyExtractor={(item): string => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 20,
                paddingRight: 20,
                paddingLeft: 20,
              }}
              renderItem={({ item }) => (
                <Address
                  data={item as A}
                  setAddress={setAddress}
                  type="Change"
                  setOpen={setOpen}
                />
              )}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
            />
            // items.map((item) => (
            //     <Coupon
            //         item={item as C}
            //         type="Checkout"
            //         setChooseCoupon={setChooseCoupon as Dispatch<SetStateAction<C>>}
            //         setActive={setActive}
            //     ></Coupon>
            // ))}
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;
