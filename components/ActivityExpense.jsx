import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { auth } from "../firebaseConfig";

const ActivityExpense = ({ data }) => {
  const dateTime = data.createAt.split(", ");
  const participants = data.additionalInfo.participants;
  let totalAmount = 0;
  let userAmount = 0;
  let userId = "";
  if (data.createBy === auth.currentUser.uid) {
    totalAmount = participants
      .filter((participant) => participant.userId !== auth.currentUser.uid)
      .reduce((sum, participant) => sum + participant.amount, 0)
      .toFixed(0);
  } else {
    userAmount = participants.filter(
      (item) => item.userId === auth.currentUser.uid
    );
    userId = userAmount[0].userId;
    userAmount = userAmount.length > 0 ? userAmount[0].amount.toFixed(0) : 0;
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
          source={require("../assets/icons/expense_icon.png")}
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
          <Text>
            created an expense
            {data.additionalInfo.groupId !== "" ? " in the group" : ` with`}
          </Text>
          <Text
            className="text-gray-700 ml-1"
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {data.additionalInfo.groupId !== ""
              ? data.additionalInfo.groupName
              : userId === auth.currentUser.uid
              ? "You"
              : data.additionalInfo.friendName}
          </Text>
        </View>
        {data.createBy === auth.currentUser.uid ? (
          <View className="flex-row">
            <Text
              className="text-green-600"
              style={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              you lend {Math.abs(totalAmount).toLocaleString("de-De")} vnd
            </Text>
          </View>
        ) : (
          <View className="flex-row">
            <Text
              className="text-red-600"
              style={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              you owe {Math.abs(userAmount).toLocaleString("de-De")} vnd
            </Text>
          </View>
        )}

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

export default ActivityExpense;
