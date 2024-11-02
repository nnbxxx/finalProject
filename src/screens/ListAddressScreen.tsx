import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import AddressItem from "../components/AddressItem";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { callFetchListUserAddress, updateAddressUserDefault } from "../api/api";
type Params = {
  id: string;
};
const ListAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { id } = route.params as Params;
  const [load, setLoad] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [addressDefault, setAddressDefault] = useState("");
  const handleSetDefault = async () => {
    const re = (await updateAddressUserDefault(addressDefault)) as any;
    if (re && re.data) {
      Toast.show({
        type: "success",
        text1: "Save Success",
      });
      setLoad((prev) => !prev);
    }
  };
  const [address, setAddress] = useState([]);
  const fetchListUserAddress = async () => {
    const re = (await callFetchListUserAddress(id)) as any;
    if (re && re.data) {
      setAddress(re.data.result);
    }
  };
  useEffect(() => {
    fetchListUserAddress();
    return () => {};
  }, [load]);

  return (
    <SafeAreaView>
      <ScrollView className="relative h-screen px-5">
        <View className="relative flex flex-row items-center justify-center mt-10 px-5">
          <View className="absolute left-0">
            <ArrowLeftIcon size={24} color={"#000000"} />
          </View>
          <Text className="font-medium text-xl">Delivery Address</Text>
        </View>
        <View className="mt-7">
          <View className="mt-7">
            {address &&
              address.map((item, i) => (
                <AddressItem
                  key={i}
                  item={item}
                  setLoad={setLoad}
                  setActive={setActive}
                  setAddressDefault={setAddressDefault}
                />
              ))}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 right-2 mb-2 flex flex-row">
        {active && (
          <TouchableOpacity onPress={handleSetDefault} className="mr-1">
            <View className="w-full rounded-[30px] bg-main px-2">
              <Text className="text-white text-xl font-bold tracking-widest">
                Save Change
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("ManageAddress", { type: "Add" })}
        >
          <View className="w-full rounded-[30px] bg-main px-2">
            <Text className="text-white text-xl font-bold tracking-widest">
              + New Address
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListAddressScreen;
