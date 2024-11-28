import { View, Text, StyleSheet, Image } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useEffect } from "react";

const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 3000);
  }, []);
  return (
    <View style={styles.appScreen}>
      <Image
        style={styles.samsungGalaxyA145g1}
        source={require("../../assets/backgroud.jpg")}
      />
      <Text style={[styles.version100b, styles.version100bFlexBox]}>
        Version: 1.0.0b
      </Text>
      <View style={styles.appScreenChild} />
      <Text style={[styles.portfolioQuang, styles.version100bFlexBox]}>
        Sắc
      </Text>
      <Image
        style={styles.appScreenItem}
        source={require("../../assets/app.png")}
      />
      <Image
        style={styles.welcomeBannerWithGoldenLea}
        source={require("../../assets/welcome.png")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  version100bFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  samsungGalaxyA145g1: {
    top: 0,
    left: 0,
    width: 420,
    height: 1010,
    position: "absolute",
  },
  version100b: {
    top: 900,
    left: 10,
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Roboto",
    color: "#fff",
    width: 170,
    height: 33,
  },
  appScreenChild: {
    top: 261,
    left: 50,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 30,
    backgroundColor: "rgba(218, 218, 218, 0.61)",
    width: 304,
    height: 366,
    position: "absolute",
  },
  portfolioQuang: {
    top: 452,
    left: 175,
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "Roboto",
    color: "#fffff",
    width: 272,
    height: 47,
  },
  appScreenItem: {
    top: 294,
    left: 130,
    borderRadius: 37,
    width: 150,
    height: 150,
    position: "absolute",
  },
  welcomeBannerWithGoldenLea: {
    top: 540,
    left: 90,
    width: 228,
    height: 81,
    position: "absolute",
  },
  appScreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 810,
    overflow: "hidden",
  },
});
export default WelcomeScreen;
