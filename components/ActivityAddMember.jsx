import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { auth } from "../firebaseConfig";

const ActivityAddMember = ({ data }) => {
  const dateTime = data.createAt.split(", ");
  let membersString = "";
  if (data.additionalInfo.newMembersName?.length > 1) {
    membersString = data.additionalInfo.newMembersName.join(", ");
  } else {
    membersString = data.additionalInfo.newMembersName;
  }
  return (
    <View
      className="flex-row bg-white px-2 py-2 items-center space-x-2 border-b border-gray-300"
      style={{
        width: "100%",
      }}
    >
      <View className="relative">
        <Image
          source={require("../assets/icons/group.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
        <Image
          source={
            data.createByAvatar
              ? { uri: data.createByAvatar }
              : require("../assets/images/avatar_image.jpg")
          }
          style={{
            width: 20,
            height: 20,
            left: 32,
            top: 35,
            borderRadius: 10,
            position: "absolute",
            borderColor: "white",
            borderWidth: 2,
          }}
        />
      </View>
      <View className="flex-col px-2 space-y-1" style={{ flex: 1 }}>
        <View className="flex-row items-center" style={{ flexWrap: "wrap" }}>
          <Text
            className="text-gray-700 mr-1"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {data.createBy === auth.currentUser.uid ? "You" : data.createByName}
          </Text>
          <Text className="mr-1">have added</Text>
          <Text
            className="text-gray-700 mr-1"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {membersString}
          </Text>
          <Text className="mr-1">to the group</Text>
          <Text
            className="text-gray-700"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {data.additionalInfo.groupName}
          </Text>
        </View>
        <View className="flex-row">
          <Text
            className="text-gray-400"
            style={{
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {dateTime[0]} at {dateTime[1]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityAddMember;
