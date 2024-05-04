import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from "react-native";
import UserService from "./services/user";
import FriendService from "./services/friend";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FriendsScreen from "./screens/FriendsScreen";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AppNavigation from "./navigation/appNavigation";
// import './output.css';
// import { View, Text } from 'react-native-tailwindcss';

const uid = "lkdfasjlfka";

import { tw } from "tailwind-rn";
export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const handlePress = async () => {
    // const username = "test7";
    // UserService.getInstance().setUsername(uid, username);
    // UserService.getInstance().getAvatar(uid);
    // UserService.getInstance().createUser("abc", "Huyen", "huyen1@gmail.com");
    // await FriendService.getInstance().addFriend(uid, "ddat828@gmail.com");
    const friendsData =
      await FriendService.getInstance().getFriendsAvatarAndName(uid);
    console.log(friendsData[1]["name"]);
    // FriendService.getInstance().deleteFriend(uid, "abc");
    // UserService.getInstance().getUser(uid);
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      UserService.getInstance().uploadAvatar(uid, result.assets[0].uri);
    }
  };

  return (
    // <View className="flex-1 items-center justify-center">
    //   <Text className="text-red-900">Test User</Text>
    //   <Button title="Click me check user" onPress={handlePress}></Button>
    //   <Button title="Choose Image" onPress={chooseImage}></Button>
    //   {imageUri && (
    //     <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
    //   )}
    // </View>
    <AppNavigation></AppNavigation>
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.container}>
    //     <FriendsScreen></FriendsScreen>
    //   </View>
    // </SafeAreaView>
    // <AppNavigation></AppNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
