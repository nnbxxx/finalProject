import { View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Rating } from "@kolking/react-native-rating";

import { ICartItem, ItemCart } from "../types/type";
import Toast from "react-native-toast-message";
import { callCreateNewReviewProduct } from "../api/api";
import { TextInput } from "react-native-paper";
type Props = {
  setForm: Dispatch<SetStateAction<boolean>>;
  user: string;
  product: ICartItem;
};
const Comments = ({ setForm, user, product }: Props) => {
  const [comment, setComment] = useState<string>(""); // Thêm state để lưu comment

  const [rating, setRating] = useState<number>(0);
  const handleChange = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);
  const createNewReviewProduct = async (data: any) => {
    const re = await callCreateNewReviewProduct(data);
    return re;
  };
  const handleSubmit = async () => {
    const data = {
      userId: user,
      productId: product.product,
      rating: rating.toString(),
      comment: comment,
    };

    const re = (await createNewReviewProduct(data)) as any;
    if (re && re.data) {
      Toast.show({ type: "success", text1: "Review Success" });
      setForm(false); // Đóng form sau khi submit
    } else {
      Toast.show({ type: "error", text1: "Has Error" });
    }
  };
  return (
    <View className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-[10px]">
      <View className=" p-2 flex flex-col items-center justify-center ">
        <View className="mb-2">
          <Text>Review about {product.name}</Text>
          <TextInput
            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 text-base"
            placeholder="Write your comment here..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
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
    </View>
  );
};
export default Comments;
