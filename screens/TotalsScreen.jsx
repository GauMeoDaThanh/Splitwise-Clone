import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../firebaseConfig";

const TotalsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { groupName, expenseList } = route.params;
  const [selectedValue, setSelectedValue] = useState("thisMonth");
  const [totalGroupSpending, setTotalGroupSpending] = useState(0);
  const [totalYouPaidFor, setTotalYouPaidFor] = useState(0);

  useEffect(() => {
    let filteredExpenses = expenseList;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adjusted month
    const currentYear = currentDate.getFullYear();

    if (selectedValue === "thisMonth") {
      filteredExpenses = expenseList.filter((expense) => {
        const expenseDate = new Date(
          expense.createAt.seconds * 1000 +
            expense.createAt.nanoseconds / 1000000
        );
        return (
          expenseDate.getMonth() + 1 === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      });
    } else if (selectedValue === "lastMonth") {
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const yearOfLastMonth =
        currentMonth === 1 ? currentYear - 1 : currentYear;
      filteredExpenses = expenseList.filter((expense) => {
        const expenseDate = new Date(
          expense.createAt.seconds * 1000 +
            expense.createAt.nanoseconds / 1000000
        );
        return (
          expenseDate.getMonth() + 1 === lastMonth &&
          expenseDate.getFullYear() === yearOfLastMonth
        );
      });
    }

    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amounts,
      0
    );
    const totalUserSpending = filteredExpenses.reduce((sum, expense) => {
      const userPayment = expense.participants.find(
        (participant) =>
          participant.userId === auth.currentUser.uid && participant.settleUp
      );
      return sum + (userPayment ? userPayment.amount : 0);
    }, 0);

    setTotalGroupSpending(total);
    setTotalYouPaidFor(totalUserSpending);
  }, [expenseList, selectedValue]);

  return (
    <View className="flex-1 bg-white py-5 space-y-2">
      <View className="flex-row px-4 py-4 space-x-8 items-center">
        <TouchableOpacity
          className="flex-row "
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
          Group spending summary
        </Text>
      </View>
      <View className="flex-row mx-4 p-4">
        <Text
          className="text-gray-800"
          style={{
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          {groupName}
        </Text>
      </View>
      <View
        className="w-40 items-center mx-9 my-6"
        style={{
          borderBottomWidth: 1,
          borderColor: "rgb(209 213 219)",
        }}
      >
        <Picker
          style={{
            width: 162,
            height: 40,
          }}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item
            style={{ fontSize: 13, color: "rgb(31 41 55)", fontWeight: 500 }}
            label="THIS MONTH"
            value="thisMonth"
          />
          <Picker.Item
            style={{ fontSize: 13, color: "rgb(31 41 55)", fontWeight: 500 }}
            label="LAST MONTH"
            value="lastMonth"
          />
          <Picker.Item
            style={{ fontSize: 13, color: "rgb(31 41 55)", fontWeight: 500 }}
            label="ALL TIME"
            value="allTime"
          />
        </Picker>
      </View>
      <View className="flex-col mx-4 space-y-4 px-4">
        <View className="flex-col">
          <Text
            className="text-gray-700"
            style={{
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            TOTAL GROUP SPENDING
          </Text>
          <Text
            className="text-gray-800"
            style={{
              fontSize: 19,
              fontWeight: 500,
            }}
          >
            {totalGroupSpending.toLocaleString("de-De")}vnd
          </Text>
        </View>
        <View className="flex-col">
          <Text
            className="text-gray-700"
            style={{
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            TOTAL YOU PAID FOR
          </Text>
          <Text
            className="text-gray-800"
            style={{
              fontSize: 19,
              fontWeight: 500,
            }}
          >
            {totalYouPaidFor.toLocaleString("de-De")}vnd
          </Text>
        </View>
        {/* <View className="flex-col">
          <Text
            className="text-gray-700"
            style={{
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            YOUR TOTAL SHARE
          </Text>
          <Text
            className="text-gray-800"
            style={{
              fontSize: 19,
              fontWeight: 500,
            }}
          >
            600.000vnđ
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default TotalsScreen;
