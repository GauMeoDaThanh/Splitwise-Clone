import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import UserService from "./services/user";

export default function App() {
  const handlePress = async () => {
    const uid = "lkdfasjlfka";
    const image = await pickImage();
    if (image) {
      UserService.getInstance().setAvatarUrl(uid, image.uri);
      UserService.getInstance().getAvatarUrl(uid);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-900">Test User</Text>
      <Button title="Click me to add new user" onPress={handlePress}></Button>
    </View>
  );
}
