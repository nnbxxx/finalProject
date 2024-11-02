import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Rating } from "@kolking/react-native-rating";

import { ICartItem, ItemCart } from "../types/type";
import Toast from "react-native-toast-message";
import { callCreateNewReviewProduct } from "../api/api";
type Props = {
  setForm: Dispatch<SetStateAction<boolean>>;
  user: string;
  product: ICartItem[];
};
const Comments = ({ setForm, user, product }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const handleChange = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);
  const createNewReviewProduct = async (data: any) => {
    const re = await callCreateNewReviewProduct(data);
    return re;
  };
  const handleSubmit = async () => {
    let i = 0;
    while (i < product.length) {
      const data = {
        userId: user,
        productId: product[i].product,
        rating: rating.toString(),
        comment: "good products",
      };
      const re = (await createNewReviewProduct(data)) as any;
      if (re && re.data) {
        i++;
      } else {
        break;
      }
    }
    if (i === product.length) {
      Toast.show({ type: "success", text1: "Review Success" });
    } else {
      Toast.show({ type: "error", text1: "Has Error" });
    }
  };
  return (
    <View className="bg-white p-2 flex flex-col items-center justify-center">
      <View className="mb-2">
        <Text>Review about item</Text>
      </View>
      <View>
        <Rating
          baseColor="#D1D1D6"
          fillColor="#FF952D"
          size={30}
          rating={rating}
          onChange={handleChange}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="py-2 px-4 bg-main rounded-xl mt-2"
      >
        <View>
          <Text className="text-white">Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Comments;
