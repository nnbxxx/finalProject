import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image as I,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { imgProductDefault } from "../utils/imageDefault";

type Props = {
  index: number;
  x: SharedValue<number>;
  item: string;
};

const Image = ({ index, x, item }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View
      style={[styles.itemContainer, { width: SCREEN_WIDTH }]}
      className="p-[50px]"
    >
      <Animated.View style={lottieAnimationStyle}>
        <I source={{ uri: imgProductDefault.uri }} style={[styles.image]} />
      </Animated.View>
      {/* <Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text> */}
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    margin: 40,
    padding: 20,
    width: 250,
    height: 380,
    borderRadius: 20,
  },
});
