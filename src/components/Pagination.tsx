import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import Dot from "./Dot";
type Props = {
  item: string[];
  x: SharedValue<number>;
};
const Pagination = ({ item, x }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {/* {item.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })} */}
      <Dot index={0} x={x} key={0} />
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
