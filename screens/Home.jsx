import * as React from "react";
import { Text, View, Button } from "react-native";
import AuthenticateService from "../services/authentication";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import UserService from "../services/user";
import ActivityService from "../services/activity";
import GroupService from "../services/group";

const Home = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigation = useNavigation();
  const authenticateService = new AuthenticateService();

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      const userInfo = await UserService.getInstance().getUser(user.uid);
      setUserInfo(userInfo.username);
    };

    fetchUserInfo();
  }, []);

  const handleLogOut = () => {
    authenticateService.handleSignOut(navigation);
  };

  const handleAction = () => {
    const listUserId = ["abc", "lkdfasjlfka"];
    // GroupService.getInstance().addGroup(
    //   "kinh phi cho pbl",
    //   listUserId,
    //   "hoc tap"
    // );
    ActivityService.getInstance().getUserActivities();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className=" text-blue-700">{userInfo}</Text>
      <Button
        className="bg-purple-600"
        title="Action"
        onPress={handleAction}
      ></Button>
      <Button title="Log out" onPress={handleLogOut}></Button>
    </View>
  );
};
export default Home;
