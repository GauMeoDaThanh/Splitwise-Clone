import * as React from "react";
import { Text, View, Button } from "react-native";
import AuthenticateService from "../services/authentication";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import UserService from "../services/user";

const Home = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigation = useNavigation();
  const authenticateService = new AuthenticateService();

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      console.log(user.uid);
      const userInfo = await UserService.getInstance().getUser(user.uid);
      setUserInfo(userInfo.username);
    };

    fetchUserInfo();
  }, []);

  const handleLogOut = () => {
    authenticateService.handleSignOut(navigation);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className=" text-blue-700">{userInfo}</Text>
      <Button title="Log out" onPress={handleLogOut}></Button>
    </View>
  );
};
export default Home;
