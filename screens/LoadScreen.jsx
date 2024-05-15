import { Image, Text, View } from "react-native";
import AuthenticateService from "../services/authentication";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const LoadScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      AuthenticateService.getInstance()
        .isLogin()
        .then((isLogin) => {
          if (isLogin) {
            navigation.navigate("TabNavigator");
          } else {
            navigation.navigate("Login");
          }
        });
    }, 2000); // 2000 milliseconds = 2 seconds
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <Image source={require("../assets/images/Splitwise_logo.png")}></Image>
    </View>
  );
};

export default LoadScreen;
