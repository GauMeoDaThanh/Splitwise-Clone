import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonAddExpense from "../components/ButtonAddExpense";
import FriendService from "../services/friend";
import ExpenseService from "../services/expense";
import { auth } from "../firebaseConfig";
import UserService from "../services/user";
const DetailFriendsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { friendId } = route.params;
  const [friendInfo, setFriendInfo] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [expenses, setExpenses] = useState([])
  const [surplus, setSurplus] = useState([])
  const [createBy, setCreateBy] = useState([])

    useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        FriendService.getInstance().listenToFriendDetail(friendId, async (friendInfo) => {
          setFriendInfo(friendInfo);
          try {
            const expenseList =
              await ExpenseService.getInstance().getExpensesByFriendId(friendId);
            setExpenses(expenseList); // Cập nhật state với dữ liệu thực
            let paidUsers = [];
            for (expense of expenseList) {
              paidUsers.push(
                await UserService.getInstance().getUserById(expense.createBy)
              );
            }
            setSurplus(await ExpenseService.getInstance().calculateSurplusAmounts(expenseList));
            setCreateBy(paidUsers);
          } catch (error) {
            console.log("Error to fetch data, ", error);
          }
        })
      };
      fetchData();
    }, [])
  );

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };

  const handleRemoveFriend = () => {
    FriendService.getInstance().deleteFriend(friendId, navigation);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="relative">
        <SafeAreaView
          className="flex-row"
          style={{
            width: "100%",
            height: 120,
          }}
        >
          <Image
            source={require("../assets/images/background.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          ></Image>
        </SafeAreaView>
        <View
          className="flex-row px-4 space-x-72"
          style={{
            top: -90,
          }}
        >
          <TouchableOpacity
            className="flex-row justify-items-start"
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/icons/back_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-items-end"
            onPress={toggleEditOptions}
          >
            <Image
              source={require("../assets/icons/setting_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View
          className="flex-col space-y-1"
          style={{
            top: -60,
            left: 50,
          }}
        >
          <Image
            source={
              friendInfo.avatarUrl
                ? { uri: friendInfo.avatarUrl }
                : require("../assets/images/avatar_image.jpg")
            }
            style={{
              borderRadius: 15,
              borderColor: "white",
              borderWidth: 3,
              marginBottom: 5,
              width: 80,
              height: 80,
            }}
          ></Image>
          <Text
            style={{
              color: "rgb(75 85 99)",
              fontWeight: 500,
              fontSize: 17,
            }}
          >
            {friendInfo?.username}
          </Text>
          <View className="flex-row space-x-1">
            <Text className="text-gray-600">Chau N. owes you</Text>
            <Text
              style={{
                color: "#0B9D7E",
                fontWeight: 400,
              }}
            >
              3.000.000vnđ
            </Text>
          </View>
        </View>
      </View>
         <View className="flex-col space-y-6 px-1">
        <View className="flex-col px-2 space-y-3">
          { expenses.map((expense, index) => (
            <View key={index} className="flex-row ">
              <TouchableOpacity className="flex-row space-x-5 px-1 items-center" onPress={() => navigation.navigate("DetailExpense",{expenseId:expense.id})}>
                <View className="flex-col items-center">
                  <Text
                    className="text-gray-600"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {"T" +
                      (new Date(
                        expense.createAt.seconds * 1000 +
                          expense.createAt.nanoseconds / 1000000
                      ).getMonth() +
                        1) +
                      "/" +
                      new Date(
                        expense.createAt.seconds * 1000 +
                          expense.createAt.nanoseconds / 1000000
                      ).getFullYear()}
                  </Text>
                  <Text
                    className="text-gray-600"
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                    }}
                  >
                    {new Date(
                      expense.createAt.seconds * 1000 +
                        expense.createAt.nanoseconds / 1000000
                    ).getDate()}
                  </Text>
                </View>
                <View className="flex-row p-2 items-center border border-gray-400 bg-gray-200">
                  <Image
                    source={require("../assets/icons/icon_bill.png")}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  ></Image>
                </View>
                <View className="flex-col items-start">
                  <Text
                    className="text-gray-600"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {expense.description}
                  </Text>
                  <Text
                    className="text-gray-500"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {createBy[index]?.uid
                      ? createBy[index]?.uid == auth.currentUser.uid
                        ? `you paid ${Math.abs(expense.amounts).toLocaleString(
                            "de-De"
                          )}`
                        : `${createBy[index]?.username} paid ${Math.abs(
                            expense.amounts
                          ).toLocaleString("de-De")}`
                      : ""}
                  </Text>
                </View>
                <View className="flex-col items-end">
                  <Text
                    className={
                      createBy[index]?.uid == auth.currentUser.uid
                        ? "text-green-600"
                        : "text-red-600"
                    }
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {
                      surplus[index] === '0'?'':((createBy[index]?.uid
                      ? createBy[index]?.uid == auth.currentUser.uid
                        ? "you lent"
                        : `${createBy[index]?.username} lent`
                      : ""))
                    }
                  </Text>
                  <Text
                    className={
                      createBy[index]?.uid == auth.currentUser.uid
                        ? "text-green-600"
                        : "text-red-600"
                    }
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                 {
                   surplus[index] === '0' ? '' : surplus[index] + " vnd"
                 }
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
      {showEditOptions && (
        <View
          className="flex-col border-2 border-gray-300 space-y-2 p-3"
          style={{
            position: "absolute",
            top: 53,
            right: 5,
            backgroundColor: "white",
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleRemoveFriend}
          >
            <Text
              className="text-red-500"
              style={{
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Remove friend
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default DetailFriendsScreen;
