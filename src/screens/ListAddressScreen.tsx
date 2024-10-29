import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import AddressItem from "../components/AddressItem";
import { useRoute } from "@react-navigation/native";
import { callFetchListUserAddress } from "../api/api";
type Params = {
  user: string;
};
const ListAddressScreen = () => {
  const route = useRoute();
  const { user } = route.params as Params;

  const [address, setAddress] = useState([]);
  const fetchListUserAddress = async () => {
    const re = (await callFetchListUserAddress(user)) as any;
    if (re && re.data) {
      setAddress(re.data.result);
    }
  };
  useEffect(() => {
    fetchListUserAddress();
    return () => {};
  }, []);

  return (
    <SafeAreaView>
      <View className="relative h-screen p-10">
        <View className="relative flex flex-row items-center justify-between">
          <View className="absolute left-0">
            <ArrowLeftIcon size={24} color={"#000000"} />
          </View>
          <Text className="font-medium text-xl">Delivery Address</Text>
        </View>
        <View className="mt-7">
          <FlatList
            showsVerticalScrollIndicator
            data={address}
            renderItem={({ item }) => <AddressItem item={item} />}
          />
        </View>

        <View className="absolute bottom-0">
          <TouchableOpacity>
            <View className="w-full rounded-[30px] bg-main">
              <Text className="text-white text-xl font-bold tracking-widest">
                + New Address
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListAddressScreen;
