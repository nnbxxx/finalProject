import { View, Text } from "react-native";
import React from "react";
import { Address as A, IAddress } from "../types/type";
type Props = {
  data: IAddress | undefined;
};
const Address = ({ data }: Props) => {
  return (
    <View className="px-5 py-[10px] rounded-[5px] bg-white">
      <View className="w-full flex flex-row items-center justify-between pb-[10px] border-b border-gray1 mb-[10px]">
        <Text className="font-semibold">Ngô Nguyên Bảo</Text>
        <Text>+{`0946144189`}</Text>
      </View>
      <View className="flex flex-col gap-2">
        <Text className="text-xs">Province/City: {`TP.Hồ Chí Minh`}</Text>
        <Text className="text-xs">District: {`TP.Thủ Đức`}</Text>
        <Text className="text-xs">Wards: {`Phường Linh Trung`}</Text>
        <Text className="text-xs">Detail: {`1 abc xyz`}</Text>
      </View>
    </View>
  );
};
export default Address;
