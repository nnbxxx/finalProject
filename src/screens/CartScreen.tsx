import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import { Checkbox } from "react-native-paper";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { ICart, ICartItem } from "../types/type";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { getCartByUser, removeCartItemUser } from "../api/api";

type RouteParams = {
  user: string;
  setCartCount: Dispatch<SetStateAction<boolean>>;
};

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute();
  const { user } = route.params as RouteParams;

  const [cart, setCart] = useState<ICartItem[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [selectedCart, setSelectedCart] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(false);
  const fetchData = async () => {
    const res = await getCartByUser();
    if (res && res.data) {
      setCart(res.data.items);
      setCheckedAll(false);
    } else {
      const { message, statusCode } = res as any;
      Toast.show({
        type: "error",
        text1: message,
      });
      // console.log("🚀 ~ fetchData ~ res:", JSON.stringify(res.data.items));
    }
  };
  const handleFilterData = (data: ICartItem[]) => {
    const filterData = data.filter((item) => {
      return item.selected;
    });
    setSelectedCart(filterData);
  };
  const handleSelectedItem = (item: ICartItem) => {
    const selectedItem = cart?.map((data) => {
      if (item.product === data.product) {
        return {
          ...data,
          selected: !data.selected,
        };
      } else return data;
    });
    setCart(selectedItem);
    handleFilterData(selectedItem);
  };

  const handleSelectedAll = () => {
    const filterCart = cart?.map((data) => {
      if (checkedAll) {
        return {
          ...data,
          selected: false,
        };
      } else {
        return {
          ...data,
          selected: true,
        };
      }
    });
    setCart(filterCart);
    handleFilterData(filterCart);
  };
  const validateSelectedAll = () => {
    const data = cart?.every((item) => item.selected === true);
    setCheckedAll(data);
  };

  const handleRemove = async (id: string) => {
    const re = await removeCartItemUser(id);
    if (re && re.data) {
      Toast.show({
        type: "success",
        text1: "Delete Item Success",
      });
      setCart(re.data.items);
      setLoad((prev) => !prev);
    } else {
      const { message, statusCode } = re as any;
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  };
  const handlePrice = () => {
    const price = selectedCart.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0
    );
    setTotal(price);
  };
  const handleCheckout = () => {
    navigation.navigate("Checkout", {
      data: selectedCart,
      user: user,
      total: total,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handlePrice();
    validateSelectedAll();
  }, [selectedCart]);
  return (
    <SafeAreaView>
      <View className="px-[25px] pt-[60px] pb-10 relative h-screen flex flex-col items-center">
        <View className="relative flex flex-row items-center justify-center mb-[30px] w-full">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={24} color={"#000000"} />
          </TouchableOpacity>
          <Text className="font-medium text-lg">Cart</Text>
        </View>
        <View className="w-full mb-[10px]">
          <Text className="text-center text-xs">
            Swipe on an item to delete!
          </Text>
        </View>
        <View className="h-[500px]">
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <CartItem
                data={item}
                onCheckedItem={() => handleSelectedItem(item)}
                onRemoveItem={() => handleRemove(item.product)}
                type="Cart"
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.product}
          />
        </View>
        <View className="absolute bottom-0 w-full">
          <View className="pl-[15px] mb-10 flex flex-col items-center">
            <View className="w-full flex flex-row items-center justify-around">
              <View className="flex flex-row items-center gap-[10px]">
                <Checkbox
                  status={checkedAll ? "checked" : "unchecked"}
                  onPress={handleSelectedAll}
                />
                <Text className="font-medium text-base">ALL</Text>
              </View>
              <View className="flex flex-row gap-[10px]">
                <Text className="font-medium">Total:</Text>
                <Text className="text-money">{total} VNĐ</Text>
              </View>
            </View>
            <TouchableOpacity
              className="w-full h-[60px] bg-main rounded-[30px] flex items-center justify-center"
              onPress={handleCheckout}
            >
              <Text className="font-bold text-xl text-white tracking-widest">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
