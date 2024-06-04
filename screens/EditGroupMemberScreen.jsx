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
} from "react-native";
import FriendService from "../services/friend";
import GroupService from "../services/group";

const EditGroupMemberScreen = ({ route }) => {
  const navigation = useNavigation();
  const { group } = route.params;
  const [membersInfo, setMembersInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteMembers, setDeleteMembers] = useState([]);

  useEffect(() => {
    const getMembersInfo = async () => {
      const members = await FriendService.getInstance().getFriendListInGroup(
        group.id
      );
      setMembersInfo(members);
    };
    getMembersInfo();
  }, []);

  const getDeleteMemberInfo = (id) => {
    setDeleteMembers([...deleteMembers, id]);
    setMembersInfo(membersInfo.filter((member) => member.id !== id));
  };

  const handleDeleteMember = () => {
    GroupService.getInstance().removeGroupMembers(
      group.id,
      group.name,
      group.members,
      deleteMembers,
      navigation
    );
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
          Edit members group
        </Text>
        <View className="flex-row px-9">
          <TouchableOpacity
            className="flex-row"
            onPress={handleDeleteMember}
            disabled={deleteMembers.length === 0}
          >
            <Text
              className={
                deleteMembers.length === 0 ? "text-gray-300" : "text-green-500"
              }
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
          onChangeText={(text) => setSearchTerm(text)}
        ></TextInput>
      </View>
      <View className="flex-row pb-2 px-4 border-b border-gray-300">
        <TouchableOpacity
          className="flex-row items-center space-x-4 py-1"
          onPress={() => navigation.navigate("AddMember")}
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
          Group Members
        </Text>
        <FlatList
          data={membersInfo.filter((member) => {
            return member.name
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase());
          })}
          renderItem={({ item }) => (
            <View className="flex-row py-4 items-center space-x-4">
              <View className="flex-row ">
                <TouchableOpacity
                  className="flex-row"
                  onPress={() => getDeleteMemberInfo(item.id)}
                >
                  <Image
                    source={require("../assets/icons/delete_icon.png")}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 20,
                    }}
                  ></Image>
                </TouchableOpacity>
              </View>
              <Image
                source={
                  item.avatar
                    ? { uri: item.avatar }
                    : require("../assets/images/Splitwise_logo.png")
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
          )}
        ></FlatList>
      </View>
    </View>
  );
};
export default EditGroupMemberScreen;
