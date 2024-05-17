import React, { useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppBar from "../components/AppBar";
import BottomAppBar from "../components/BottomAppBar";
import CardFriend from "../components/CardFriend";
import ButtonAddExpense from "../components/ButtonAddExpense";
import { auth } from "../firebaseConfig";
// import UserService from "../services/UserService";
import FriendService from "../services/friend";
import { useFocusEffect } from "@react-navigation/native";

const FriendsScreen = ({ route }) => {
  const [userAvatar, setUserAvatar] = React.useState(null);
  const [listFriends, setListFriends] = React.useState(null);

  const getUserFriends = async () => {
    const user = auth.currentUser;
    const userFriends =
      await FriendService.getInstance().getFriendsAvatarAndName(user.uid);
    setListFriends(userFriends);
  };

  useEffect(() => {
    FriendService.getInstance().listenToFriendList((friends) => {
      setListFriends(friends);
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        { flex: 100, backgroundColor: "white", position: "relative" },
      ]}
    >
      <View
        style={{ flex: 7, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}
      >
        <AppBar></AppBar>
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEE",
          paddingStart: 10,
          flexDirection: "row",
          flex: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginRight: 14,
            width: "82%",
          }}
        >
          <Text
            style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: "bold" }}
          >
            Overall, you are ...
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              color: "#00CC99",
              paddingTop: 5,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            210.000 đồng
          </Text>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "flex-end" }}
        >
          <Image
            source={require("../assets/icons/filter.png")}
            style={{ width: 26, height: 20, marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
      {/* Danh sách bạn bè */}
      <View style={{ flex: 70, position: "relative" }}>
        <ScrollView>
          {listFriends &&
            listFriends.map((friend, index) => (
              <CardFriend
                key={index}
                name={friend.name}
                avatar={friend.avatar}
              />
            ))}
        </ScrollView>

        {/* <TouchableOpacity > */}
        <ButtonAddExpense></ButtonAddExpense>
        {/* </TouchableOpacity> */}
      </View>
      <View style={{ flex: 10, borderTopColor: "#CCCCCC", borderTopWidth: 1 }}>
        <BottomAppBar />
      </View>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {},
});
