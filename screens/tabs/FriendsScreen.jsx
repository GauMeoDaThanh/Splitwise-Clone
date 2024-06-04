import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import AppBar from "../../components/AppBar";
import CardFriend from "../../components/CardFriend";
import ButtonAddExpense from "../../components/ButtonAddExpense";
import { auth } from "../../firebaseConfig";
// import UserService from "../services/UserService";
import FriendService from "../../services/friend";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const FriendsScreen = () => {
  const isForcused = useIsFocused();
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = React.useState(null);
  const [listFriends, setListFriends] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userId, setUserId] = React.useState(auth.currentUser.uid);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    FriendService.getInstance().listenToFriendList((friends) => {
      setListFriends(friends);
    });
  }, [userId]);

  React.useEffect(() => {
    if (isForcused) {
      setSearchTerm("");
    }
  }, [isForcused]);

  return (
    <View
      style={[
        styles.container,
        { flex: 100, backgroundColor: "white", position: "relative" },
      ]}
      className="py-5"
    >
      <View
        style={{ flex: 7, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}
      >
        <AppBar
          onSearchSubmit={(text) => {
            setSearchTerm(text);
          }}
        ></AppBar>
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
            source={require("../../assets/icons/filter.png")}
            style={{ width: 26, height: 20, marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
      {/* Danh sách bạn bè */}
      <View style={{ flex: 70, position: "relative" }}>
        <FlatList
          data={listFriends?.filter((friend) => {
            return friend.name
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase());
          })}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CardFriend
                name={item.name}
                avatar={item.avatar}
                onPress={() => {
                  navigation.navigate("FriendDetail", { friendId: item.id });
                }}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        className="flex-row"
        style={{
          position: "absolute",
          top: 530,
          left: 190,
        }}
      >
        <ButtonAddExpense />
      </View>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {},
});
