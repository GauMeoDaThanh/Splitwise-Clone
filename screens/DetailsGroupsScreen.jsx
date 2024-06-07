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
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonAddExpense from "../components/ButtonAddExpense";
import GroupService from "../services/group";
import ExpenseService from "../services/expense";
import UserService from "../services/user";
import { auth } from "../firebaseConfig";

const DetailsGroupsScreen = ({ route }) => {
  LogBox.ignoreLogs([
    "Possible Unhandled Promise Rejection",
    "TypeError: Cannot read property 'indexOf' of undefined",
  ]);

  const navigation = useNavigation();
  const groupId = route.params?.groupInfo;
  const [group, setGroup] = useState(route.params?.groupInfo);
  const [expenses, setExpenses] = useState([]);
  const [createBy, setCreateBy] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [surplus, setSurplus] = useState([]);

  LogBox.ignoreLogs([
    "Possible Unhandled Promise Rejection",
    "TypeError: Cannot read property 'indexOf' of undefined",
  ]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const expenseList =
            await ExpenseService.getInstance().getExpensesByGroupId(groupId);
          let paidUsers = [];
          for (expense of expenseList) {
            paidUsers.push(
              await UserService.getInstance().getUserById(expense.createBy)
            );
          }
          setSurplus(
            await ExpenseService.getInstance().calculateSurplusAmounts(
              expenseList
            )
          );
          setExpenses(expenseList); // Cập nhật state với dữ liệu thực
          setCreateBy(paidUsers);
        } catch (error) {
          console.log("Error to fetch data, ", error);
        }
      };
      fetchData();
    }, [group])
  );

  useEffect(() => {
    GroupService.getInstance().listenToGroupDetail(groupId, (group) => {
      setGroup(group);
    });
  }, []);

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };
  const handleOptionPress = (screen) => {
    navigation.navigate(screen, { group: group });
    setShowEditOptions(false);
  };

  const handleRemoveGroup = () => {
    GroupService.getInstance().removeGroup(groupId, navigation);
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
            onPress={() => navigation.navigate("Groups")}
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
              group.imageuri
                ? { uri: group.imageuri }
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
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {group.name}
          </Text>
        </View>
      </View>
      <View
        className="flex-row justify-center space-x-3"
        style={{
          top: -35,
        }}
      >
        <TouchableOpacity
          className="flex-row border border-gray-400 rounded-md px-4 py-1.5"
          style={{
            borderBottomWidth: 3,
          }}
          onPress={() =>
            navigation.navigate("Whiteboard", {
              groupName: group.name,
              groupInfo: group.information,
              groupId: group.id,
              groupMembers: group.members,
            })
          }
        >
          <Text
            className="text-gray-700"
            style={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Whiteboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row border border-gray-400 rounded-md px-4 py-1.5"
          style={{
            borderBottomWidth: 3,
          }}
          onPress={() =>
            navigation.navigate("Totals", {
              groupName: group.name,
              expenseList: expenses,
            })
          }
        >
          <Text
            className="text-gray-700"
            style={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Totals
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className="flex-row justify-center mb-1"
        style={{
          top: -15,
        }}
      >
        <TouchableOpacity
          className="flex-row items-center space-x-2 border py-1 px-3 rounded-md"
          style={{
            borderColor: "#0B9D7E",
          }}
          onPress={() =>
            navigation.navigate("AddMemberGroupsScreen", {
              groupId: group.id,
              groupName: group.name,
              groupMembers: group.members,
            })
          }
        >
          <Image
            source={require("../assets/icons/addFriends_icon.png")}
            style={{
              width: 25,
              height: 25,
              tintColor: "#0B9D7E",
            }}
          ></Image>
          <Text
            style={{
              color: "#0B9D7E",
              fontWeight: "bold",
            }}
          >
            Add members
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col space-y-6 px-1 flex-1">
        {/* <View className="flex-row justify-center space-x-3"> */}
        <ScrollView
          className="flex-col px-2 space-y-3 flex-1"
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          {expenses.map((expense, index) => (
            <View key={index} className="flex-row ">
              <TouchableOpacity
                className="flex-row space-x-5 px-1 items-center"
                onPress={() =>
                  navigation.navigate("DetailExpense", {
                    expenseId: expense.id,
                  })
                }
              >
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
                <View
                  className="flex-col items-end"
                  style={{ alignItems: "flex-end" }}
                >
                  <Text
                    className={
                      surplus[index] === "settled up"
                        ? "text-green-600"
                        : createBy[index]?.uid == auth.currentUser.uid
                        ? "text-green-600"
                        : "text-red-600"
                    }
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {surplus[index] === 0
                      ? ""
                      : surplus[index] === "settled up"
                      ? "settled up"
                      : createBy[index]?.uid
                      ? createBy[index]?.uid == auth.currentUser.uid
                        ? "you lent"
                        : "you owes"
                      : ""}
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
                    {surplus[index] === 0
                      ? ""
                      : surplus[index] === "settled up"
                      ? ""
                      : Math.abs(surplus[index]).toLocaleString("de-De") +
                        " vnd"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
            onPress={() => handleOptionPress("EditGroups")}
          >
            <Text
              style={{
                color: "rgb(75, 85, 99)",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Edit group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => handleOptionPress("EditGroupMember")}
          >
            <Text
              style={{
                color: "rgb(75, 85, 99)",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Edit members group
            </Text>
          </TouchableOpacity>
          {group.createBy === auth.currentUser.uid ? (
            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleRemoveGroup}
            >
              <Text
                className="text-red-500"
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Remove group
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};
export default DetailsGroupsScreen;
