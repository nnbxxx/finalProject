import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { User } from "../types/type";
import { avtDefault } from "../utils/imageDefault";

type Props = {
  profile: User;
};
const ProfileInfo = ({ profile }: Props) => {
  return (
    <View className="w-full h-[227px] flex flex-row items-end pt-[16px] pb-10 bg-white rounded-[20px]">
      <Image
        source={{ uri: avtDefault.uri }}
        style={{ width: 80, height: 80 }}
        className="rounded-[10px] mx-[10px] my-[50px]"
      />
      <View className="flex flex-1 flex-col items-center justify-center">
        <View className="flex flex-1 flex-col items-center justify-center w-full">
          <View className="border-b w-full">
            <Text className="text-center my-[10px]">
              Email: {profile.email}
            </Text>
          </View>
          <View className="border-b w-full">
            <Text className="text-center my-[10px]">Name: {profile.name}</Text>
          </View>
          <View className="border-b w-full">
            <Text className="text-center my-[10px]">
              Gender : {profile.gender}
            </Text>
          </View>
          <View className="border-b w-full">
            <Text className="text-center my-[10px]">
              Address: {profile.address}
            </Text>
          </View>
          <View>
            <Text className="mt-[10px]">Age: {profile.age}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;
