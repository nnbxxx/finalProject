import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPassScreen from "../screens/ForgotPassScreen";
import CodeScreen from "../screens/CodeScreen";
import RecoveryPasswordScreen from "../screens/RecoveryPasswordScreen ";
import Toast from "react-native-toast-message";
import SearchScreen from "../screens/SearchScreen";
import DetailScreen from "../screens/DetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import ChangePasswordScreen from "../screens/ChangePasswordSceen";
import ChangeProfileScreen from "../screens/ChangeProfileScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import FavoriteScreen from "../screens/FavouriteScreen";
import ListAddressScreen from "../screens/ListAddressScreen";
import ManageAddressScreen from "../screens/ManageAddressSceen";
import OrdersScreen from "../screens/OrderScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen name="Forgot" component={ForgotPassScreen}></Stack.Screen>
        <Stack.Screen name="Code" component={CodeScreen}></Stack.Screen>
        <Stack.Screen
          name="ChangePass"
          component={RecoveryPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ChangeProfile"
          component={ChangeProfileScreen}
        ></Stack.Screen>
        <Stack.Screen name="Checkout" component={CheckoutScreen}></Stack.Screen>
        <Stack.Screen name="Favorite" component={FavoriteScreen}></Stack.Screen>
        <Stack.Screen
          name="ListAddress"
          component={ListAddressScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ManageAddress"
          component={ManageAddressScreen}
        ></Stack.Screen>
        <Stack.Screen name="Order" component={OrdersScreen}></Stack.Screen>
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
        ></Stack.Screen>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AppNavigation;
