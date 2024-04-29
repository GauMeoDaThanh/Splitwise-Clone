import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import UserService from "./services/user";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const uid = "lkdfasjlfka";

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const handlePress = async () => {
    // const username = "test8";
    // UserService.getInstance().setUsername(uid, username);
    UserService.getInstance().getAvatar(uid);
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
      <Button title="Click me to add new user" onPress={handlePress}></Button>
      <Button title="Choose Image" onPress={chooseImage}></Button>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
