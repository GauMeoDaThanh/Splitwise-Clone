import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import CheckBox from "react-native-check-box";
import FriendService from "../services/friend";
import GroupService from "../services/group";

const AddMemberGroupsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { groupId, groupMembers, groupName } = route.params;
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getFriendList = async () => {
      const FriendList =
        await FriendService.getInstance().getFriendListNotInGroup(groupId);
      setFriends(FriendList);
    };
    getFriendList();
  }, []);

  const handleAddMembers = async () => {
    const selectedFriendIds = Object.keys(selectedFriends).filter(
      (friendId) => selectedFriends[friendId]
    );
    await GroupService.getInstance().addGroupMembers(
      groupId,
      groupName,
      groupMembers,
      selectedFriendIds
    );
    Alert.alert("success", "Add members successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white py-5 space-y-2">
      <View className="flex-row px-4 py-2 space-x-8 items-center mb-2">
        <TouchableOpacity
          className="flex-row"
          onPress={() => navigation.navigate("DetailGroups")}
        >
          <Image
            source={require("../assets/icons/back_icon.png")}
            style={{
              width: 20,
              height: 20,
            }}
          ></Image>
        </TouchableOpacity>
        <Text
          className="text-gray-700"
          style={{
            fontSize: 19,
            fontWeight: 400,
          }}
        >
          Add group members
        </Text>
        <View className="flex-row px-9">
          <TouchableOpacity className="flex-row" onPress={handleAddMembers}>
            <Text
              className="text-gray-700"
              style={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="relative px-4 border-b border-gray-300">
        <Image
          source={require("../assets/icons/search_icon.png")}
          style={{
            width: 15,
            height: 15,
            left: 10,
            zIndex: 1,
          }}
        ></Image>
        <TextInput
          className="border border-gray-300 rounded-md px-8 bg-gray-100"
          style={{
            top: -24,
            height: 32,
          }}
          value={search}
          onChangeText={(text) => setSearch(text)}
        ></TextInput>
      </View>
      <View className="flex-row pb-2 px-4 border-b border-gray-300">
        <TouchableOpacity
          className="flex-row items-center space-x-4 py-1"
          onPress={() => navigation.navigate("AddFriendScreen")}
        >
          <Image
            source={require("../assets/icons/addFriends_icon.png")}
            style={{
              width: 25,
              height: 25,
            }}
          ></Image>
          <Text
            style={{
              color: "rgb(55 65 81)",
              fontWeight: "bold",
            }}
          >
            Add a new contact to Splitwise
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 mx-4 pt-3 space-x-2">
        <Text
          style={{
            color: "rgb(55 65 81)",
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          List Friend
        </Text>
        <FlatList
          data={friends.filter((friend) =>
            friend.name.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View className="flex-row py-3 items-center space-x-4 border-b border-gray-300">
                <View className="flex-row ">
                  <CheckBox
                    isChecked={selectedFriends[item.id]}
                    onClick={() => {
                      setSelectedFriends({
                        ...selectedFriends,
                        [item.id]: !selectedFriends[item.id],
                      });
                    }}
                    checkBoxColor="#0B9D7E"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 20,
                    }}
                  ></CheckBox>
                </View>
                <Image
                  source={
                    item.avatar
                      ? { uri: item.avatar }
                      : require("../assets/images/avatar_image.jpg")
                  }
                  style={{
                    borderRadius: 25,
                    width: 50,
                    height: 50,
                  }}
                ></Image>
                <Text
                  style={{
                    color: "rgb(75 85 99)",
                    fontWeight: 500,
                    fontSize: 17,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};
export default AddMemberGroupsScreen;
