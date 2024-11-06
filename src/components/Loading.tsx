import {
  View,
  Text,
  ActivityIndicator,
  ActivityIndicatorProps,
} from "react-native";
import React from "react";
import {
  CircleStackIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from "react-native-heroicons/outline";
type Props = {
  name: string;
};
const Loading = ({ name }: Props) => {
  if (name === "Search") {
    return (
      <View className="flex-1 flex justify-center items-center">
        <MagnifyingGlassIcon size={100} color="#C7C7C7" />
        <Text className="font-medium text-3xl">Product not found</Text>
      </View>
    );
  } else if (name === "Order") {
    return (
      <View className="flex-1 flex justify-center items-center">
        <QueueListIcon size={100} color="#C7C7C7" />
        <Text className="font-medium text-3xl text-[#C7C7C7]">
          No orders yet
        </Text>
      </View>
    );
  }
  if (name === "Favorite") {
    return (
      <View className="flex-1 flex justify-center items-center">
        <CircleStackIcon size={100} color="#C7C7C7" />
        <Text className="font-medium text-3xl">No favorites yet</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 flex justify-center items-center">
      <CircleStackIcon size={100} color="#C7C7C7" />
      <Text className="font-medium text-3xl">No coupons yet</Text>
    </View>
  );
};

export default Loading;
