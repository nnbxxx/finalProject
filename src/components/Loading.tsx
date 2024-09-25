import {
  View,
  Text,
  ActivityIndicator,
  ActivityIndicatorProps,
} from "react-native";
import React from "react";

const Loading = (props: any) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;
