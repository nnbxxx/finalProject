import { View, Text, Image } from "react-native";
import React from "react";
import { useEffect, useState } from "react";

import { Comment } from "../types/type";
import { Rating } from "@kolking/react-native-rating";
import { avtDefault } from "../utils/imageDefault";
type Props = {
  comment: Comment[] | undefined;
};
const Review = ({ comment }: Props) => {
  return (
    <View className="p-5">
      {comment?.map((item) => (
        <View key={item._id} className="flex flex-row items-center">
          <View className="rounded-full">
            <Image
              source={{ uri: avtDefault.uri }}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
          </View>
          <View className="ml-5 flex-1">
            {/* <Text className="font-bold text-xs">{item.user.name}</Text> */}
            <Text className="font-bold text-xs">nnnb</Text>
            {/* <Text className="mt-[5px]">Giày good</Text> */}
          </View>
          <View>
            <Rating
              baseColor="#FF952D"
              size={12}
              disabled
              rating={+item.rating}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default Review;
