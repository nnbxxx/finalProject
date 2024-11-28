import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "react-native-paper";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { Address } from "../types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { callCreateNewUserAddress, callGetListProvince } from "../api/api";

type Params = {
  type?: string;
};
const ManageAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const route = useRoute();
  const { type } = route.params as Params;
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dataQuery, setDataQuery] = useState({
    districts: null,
    province: null,
    wards: null,
  });
  const [address, setAddress] = useState({
    user: type === "Add" ? " " : "",
    phone: "",
    receiver: "",
    specific: "",
    districts: "",
    province: "",
    wards: "",
  });
  const [userId, setUserId] = useState("");

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handleChange = (feild: string, value: string) => {
    setAddress((prev) => ({ ...prev, [feild]: value }));
  };
  const handleChangeQuery = (feild: string, value: string) => {
    setDataQuery((prev) => ({ ...prev, [feild]: value }));
  };

  const handleCreate = async () => {
    const re = await callCreateNewUserAddress({
      user: userId,
      receiver: address.receiver,
      phone: address.phone,
      districts: address.districts,
      province: address.districts,
      wards: address.wards,
      specific: address.specific,
      isDefault: isSwitchOn,
    });
    if (re && re.data) {
      Toast.show({
        type: "success",
        text1: "Create Address Success",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Have Error",
      });
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObject = JSON.parse(user);
        setUserId(userObject._id);
      }
    };
    const getProvince = async () => {
      const re = (await callGetListProvince("/province")) as any;
      if (re && re.data) {
        setProvinces(re.data);
      }
    };

    getProfile();
    getProvince();
  }, []);
  const getDistrict = async (idProvince: string) => {
    const re = (await callGetListProvince(
      `/district?idProvince=${idProvince}`
    )) as any;
    if (re && re.data) {
      setDistricts(re.data);
    }
  };
  const getWards = async (idProvince: string, idDistrict: string) => {
    const re = (await callGetListProvince(
      `/ward?provinceId=${idProvince}&districtId=${idDistrict}`
    )) as any;
    if (re && re.data) {
      setWards(re.data);
    }
  };
  useEffect(() => {
    if (dataQuery.province && address.province) {
      getDistrict(dataQuery.province);
      if (dataQuery.districts && address.districts) {
        getWards(dataQuery.province, dataQuery.districts);
      }
    }
  }, [dataQuery]);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-screen relative p-10 bg-background"
      >
        <View className="relative flex flex-row items-center justify-center">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={24} color={"#000000"} />
          </TouchableOpacity>
          {type === "Add" ? (
            <Text className="font-medium text-xl">Add New Address</Text>
          ) : (
            <Text className="font-medium text-xl">Update Address</Text>
          )}
        </View>
        <View className="flex flex-col gap-10 px-[10px] mt-10">
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">Receiver</Text>
            <TextInput
              value={address.receiver}
              onChangeText={(e) => handleChange("receiver", e)}
            />
          </View>
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">Phone Number</Text>
            <TextInput
              value={address.phone}
              onChangeText={(e) => handleChange("phone", e)}
            />
          </View>
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">Province / City</Text>

            <Picker
              selectedValue={provinces.find((p: any) => {
                return p.Name === address.province;
              })}
              onValueChange={(itemValue: any) => {
                handleChange("province", itemValue.Name);
                handleChangeQuery("province", itemValue.Id);
              }}
              style={{ height: 50 }}
            >
              <Picker.Item label="Select a Province" value="" />
              {provinces.map((province: any) => (
                <Picker.Item
                  key={province.id}
                  label={province.Name}
                  value={province}
                />
              ))}
            </Picker>
          </View>
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">District</Text>
            <Picker
              selectedValue={districts.find((p: any) => {
                return p.Name === address.districts;
              })}
              onValueChange={(itemValue: any) => {
                handleChange("districts", itemValue.Name);
                handleChangeQuery("districts", itemValue.Id);
              }}
              style={{ height: 50 }}
            >
              <Picker.Item label="Select a District" value="" />
              {districts.map((district: any) => (
                <Picker.Item
                  key={district.id}
                  label={district.Name}
                  value={district}
                />
              ))}
            </Picker>
          </View>
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">Wards</Text>
            <Picker
              selectedValue={wards.find((p: any) => {
                return p.Name === address.wards;
              })}
              onValueChange={(itemValue: any) => {
                handleChange("wards", itemValue.Name);
                handleChangeQuery("wards", itemValue.Id);
              }}
              style={{ height: 50 }}
            >
              <Picker.Item label="Select a Ward" value="" />
              {wards.map((ward: any) => (
                <Picker.Item key={ward.id} label={ward.Name} value={ward} />
              ))}
            </Picker>
          </View>
          <View className="pb-[5px] border-b">
            <Text className="text-gray1">Specific</Text>
            <TextInput
              value={address.specific}
              onChangeText={(e) => handleChange("specific", e)}
            />
          </View>
        </View>
        <View className="mt-[30px] w-full flex flex-row items-center justify-between">
          <Text className="text-base">Default</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <View className="w-full mt-[140px] mb-20">
          <TouchableOpacity
            className="w-full h-[60px] px-[10px] rounded-[10px] bg-main flex items-center justify-center"
            onPress={handleCreate}
          >
            <Text className="font-bold text-xl tracking-widest text-white">
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageAddressScreen;
