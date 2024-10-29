import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import MasonryList from "@react-native-seoul/masonry-list";
import { IProduct } from "../types/type";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import Navbar from "../components/Navbar";
import { callFetchListFavouriteProduct } from "../api/api";

import ProductFavorite from "../components/ProductFavorite";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type Params = {
  id: string;
};
const FavoriteScreen = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const route = useRoute();
  const { id } = route.params as Params;
  const [load, setLoad] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const fetchItem = async () => {
    const re = (await callFetchListFavouriteProduct()) as any;
    if (re && re.data) {
      setItems(re.data.items);
      console.log("🚀 ~ fetchItem ~ re:", re.data.items);
    }
  };
  useEffect(() => {
    fetchItem();
  }, [load]);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative h-screen px-5"
      >
        <View className="relative mt-10 px-5 flex flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute left-0"
          >
            <ArrowLeftIcon size={24} color={"#000000"} />
          </TouchableOpacity>
          <Text className="font-medium text-lg">Favorites</Text>
        </View>
        <View className="mt-10">
          {items.length === 0 ? (
            // <View className="flex flex-col items-center justify-center">
            //     <MagnifyingGlassIcon color="#C7C7C7" width={122} height={122} />
            //     <Text className="font-medium text-3xl">Shoes not found</Text>
            //     <Text className="font-base opacity-70">
            //         Try searching the item with a different keyword.
            //     </Text>
            // </View>
            <Loading name="Favorite" />
          ) : (
            // <></>
            <MasonryList
              data={items}
              keyExtractor={(item): string => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 20 }}
              renderItem={({ item }) => (
                <View className="mb-[40px]">
                  <ProductFavorite
                    name="Search"
                    item={item as IProduct}
                    setLoad={setLoad}
                    load={load}
                  />
                </View>
              )}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}

              // onEndReached={() => loadNext(ITEM_CNT)}
            />
          )}
        </View>
        <Navbar name="Favorites" />
      </ScrollView>
      <Navbar name="Favorites" />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
