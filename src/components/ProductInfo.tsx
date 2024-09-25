import { View, Text } from "react-native";
import React from "react";

const ProductInfo = ({ info }: any) => {
  return (
    <View className="p-5">
      <Text>{info}</Text>
    </View>
  );
};

export default ProductInfo;
