import {
  View,
  Text,
  ScrollView,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Product from "../components/Product";
import Navbar from "../components/Navbar";
import {
  CommonActions,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { IProduct } from "../types/type";
import { callFetchListProduct } from "../api/api";

type RouteParams = {
  keyword: string;
  user?: string;
};

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute();
  const { keyword, user } = route.params as RouteParams;
  const [items, setItems] = useState<IProduct[]>([]);
  const [keyword2, setKeyword2] = useState("");
  const [load, setLoad] = useState<boolean>(false);

  const performSearch = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Search",
            params: { keyword: keyword2 },
          },
        ],
      })
    );
    Keyboard.dismiss();
  };

  const { height } = useWindowDimensions();
  const modifiedHeight = height + 36;
  const fetchProductByKeyWord = async (keyword: string) => {
    const data: any = await callFetchListProduct(
      `current=1&pageSize=999&name=/${keyword}/i`
    );
    if (data && data.data) {
      setItems(data.data.result);
    } else {
      console.log("🚀 ~ fetchListItems ~ data:", data);
    }
  };

  useEffect(() => {
    console.log("Perform search with keyword:", keyword);
    fetchProductByKeyWord(keyword2);
  }, [keyword2]);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative h-screen bg-background"
      >
        <View className="relative px-5 mt-10 flex flex-row w-full items-center">
          <View className="absolute left-0">
            <ChevronLeftIcon color="black" width={24} height={24} />
          </View>
          <View className="bg-search flex flex-row items-center justify-between mb-[10px] ml-[30px] py-[10px] pl-[20px] rounded-full">
            <TextInput
              className="text-gray1 flex-1"
              // onKeyPress={handleKeyPress}
              placeholder="Search Somethings"
              value={keyword2}
              onChangeText={setKeyword2}
            ></TextInput>
            <View className="px-[13px]">
              <TouchableOpacity onPress={performSearch}>
                <MagnifyingGlassIcon color="#33A0FF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-center text-gray1">
            Found {items.length} results
          </Text>
        </View>
        {items && (
          <View className="mt-5 mx-5">
            {items.length === 0 ? (
              // <View className="flex flex-col items-center justify-center">
              //     <MagnifyingGlassIcon color="#C7C7C7" width={122} height={122} />
              //     <Text className="font-medium text-3xl">Shoes not found</Text>
              //     <Text className="font-base opacity-70">
              //         Try searching the item with a different keyword.
              //     </Text>
              // </View>
              <Loading name="Search" />
            ) : (
              <View>
                <MasonryList
                  data={items}
                  keyExtractor={(item): string => item.id}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingTop: 20 }}
                  renderItem={({ item }) => (
                    <View className="mb-[40px]">
                      <Product
                        name="Search"
                        item={item as IProduct}
                        user={user as any}
                        setLoad={setLoad}
                        load={load}
                      />
                    </View>
                  )}
                  // refreshing={isLoadingNext}
                  // onRefresh={() => refetch({ first: ITEM_CNT })}
                  onEndReachedThreshold={0.1}
                  // contentContainerStyle={{ paddingBottom: 30 }}
                  // onEndReached={() => loadNext(ITEM_CNT)}
                />
              </View>
            )}
          </View>
        )}

        {/* https://github.com/hyochan/react-native-masonry-list */}
      </ScrollView>
      <Navbar name="Home" />
    </SafeAreaView>
  );
};

export default SearchScreen;
