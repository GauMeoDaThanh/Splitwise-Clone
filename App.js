import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import UserService from "./services/user";
import FriendService from "./services/friend";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const uid = "lkdfasjlfka";

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const handlePress = async () => {
    // const username = "test7";
    // UserService.getInstance().setUsername(uid, username);
    // UserService.getInstance().getAvatar(uid);
    // UserService.getInstance().createUser("abc", "Huyen", "huyen1@gmail.com");

    // await FriendService.getInstance().addFriend(uid, "ddat828@gmail.com");
    await FriendService.getInstance().getFriendsAvatarAndName(uid);
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
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-900">Test User</Text>
      <Button title="Click me check user" onPress={handlePress}></Button>
      <Button title="Choose Image" onPress={chooseImage}></Button>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
