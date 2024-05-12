import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AuthenticateService from "../../services/authentication";
import UserService from "../../services/user";

const AccountScreen = ({ route }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(route.params?.userData);
  }, [route.params?.userData]);

  const updateTabBarIcon = useCallback(() => {
    navigation.setOptions({
      tabBarIcon: () => (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 25, height: 25, borderRadius: 25 }}
        />
      ),
    });
  }, [imageUri, navigation]);

  useEffect(() => {
    updateTabBarIcon();
  }, [imageUri, updateTabBarIcon]);

  useEffect(() => {
    const getUserData = async () => {
      const user = await UserService.getInstance().getUser();
      setUserData(user);
      setImageUri(user.avatarUrl);
    };
    getUserData();
  }, []);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await UserService.getInstance().uploadAvatar(result.assets[0].uri);
    }
  };

  const handleSignOut = () => {
    AuthenticateService.getInstance().handleSignOut(navigation);
  };

  return (
    <ScrollView className=" bg-white">
      <View className="flex-1 bg-white py-5">
        <View className="flex-1 py-5 px-5">
          <Text className="font-bold text-3xl">Account</Text>
        </View>
        <View className="flex-row justify-center space-x-5">
          <View className="relative items-center">
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            ></Image>
            <TouchableOpacity onPress={chooseImage}>
              <Image
                source={require("../../assets/icons/camera_icon.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: -22,
                  opacity: 0.5,
                }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="flex-col justify-center">
            <Text className="font-bold text-xl">{userData?.username}</Text>
            <Text>{userData?.email}</Text>
          </View>
          <View className="flex-col justify-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditAccount", {
                  userData,
                })
              }
            >
              <Image
                source={require("../../assets/icons/edit_icon.png")}
                style={{
                  width: 22,
                  height: 22,
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-center border-b-2 border-gray-500 mt-5 ml-5 mr-5"></View>
        <View className="flex-row mt-5">
          <TouchableOpacity
            className="flex-row ml-5 space-x-2"
            onPress={handleSignOut}
          >
            <Image
              source={require("../../assets/icons/logout_icon.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: "rgb(220 38 38)",
              }}
            ></Image>
            <Text className="text-red-600">Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default AccountScreen;
