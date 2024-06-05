import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useState, useMemo, useEffect } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppBar from "../../components/AppBar";
import AddToolBar from "../../components/AddToolBar";
import ButtonAddExpense from "../../components/ButtonAddExpense";
import GroupService from "../../services/group";
import RadioButtons from "react-native-radio-buttons";
import { auth } from "../../firebaseConfig";
import ExpenseService from "../../services/expense";

const GroupsScreen = () => {
  console.warn = () => {};
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedId, setSelectedId] = useState("All groups");
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [totalAmount, setTotalAmount] = useState(0);
  const [yourExpenseByGroup, setYourExpenseByGroup] = useState([]);

  const radioButtons = [
    "All groups",
    "Groups you owe",
    "Groups that owe you",
    "Trip",
    "Home",
    "Couple",
    "Friend",
    "Other",
  ];
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setSelectedId("All groups");
      setShowFilterOptions(false);
      setSearchTerm("");
    }
  }, [isFocused]);

  // use FocusEffect to get all the expense when focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchExpenses = async () => {
        try {
          //  Tìm các hoá đơn theo group
          expensesList = [];
          let differenceList = [];
          for (group of groups) {
            const expensesByGr =
              await ExpenseService.getInstance().getExpensesByGroupId(group.id);
            expensesList.push(expensesByGr);
            let sumByGr = 0;
            let yourOwe = 0;
            let yourLent = 0;
            for (expense of expensesByGr) {
              sumByGr =
                sumByGr +
                parseFloat(
                  expense.participants
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(0)
                );
              for (par of expense.participants) {
                if (par.userId === auth.currentUser.uid) {
                  yourOwe += parseFloat(par.amount);
                }
              }
              // Khoản bạn đã trả trong group đó
              if (expense.paidBy === auth.currentUser.uid) {
                yourLent += parseFloat(expense.amounts);
              }
            }
            differenceList.push((yourLent - yourOwe).toFixed(0));
          }
          const numberArray = differenceList.map(parseFloat);
          const totalDifference = numberArray.reduce(
            (sum, current) => sum + current,
            0
          );
          setTotalAmount(totalDifference);
          setYourExpenseByGroup(differenceList);
          // add amount owned property to each group
          for (let i = 0; i < groups.length; i++) {
            groups[i].amountOwned = differenceList[i];
          }
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };
      fetchExpenses();
    }, [groups])
  );

  useEffect(() => {
    GroupService.getInstance().listenToGroupList((groups) => {
      setGroups(groups);
    });
  }, [userId]);

  return (
    <TouchableWithoutFeedback onPress={() => setShowFilterOptions(false)}>
      <View className="flex-1 py-5 bg-white">
        <View
          className="flex-row border-gray-300"
          style={{
            borderBottomWidth: 1.5,
          }}
        >
          <AppBar
            onSearchSubmit={(text) => {
              setSearchTerm(text);
            }}
          ></AppBar>
        </View>
        <View className="flex-cols px-3">
          <View className="flex-row space-x-40">
            <View className="flex-col py-4">
              {totalAmount > 0 ? (
                <>
                  <Text className="font-bold text-xl">Groups owe you</Text>
                  <Text
                    className="font-bold"
                    style={{
                      color: "#0B9D7E",
                      fontSize: 17,
                    }}
                  >
                    {Math.abs(totalAmount).toLocaleString("de-DE")} vnd
                  </Text>
                </>
              ) : (
                <>
                  <Text className="font-bold text-xl">You owe groups</Text>
                  <Text
                    className="font-bold"
                    style={{
                      color: "#990000",
                      fontSize: 17,
                    }}
                  >
                    {Math.abs(totalAmount).toLocaleString("de-DE")} vnd
                  </Text>
                </>
              )}
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={toggleFilterOptions}
              >
                <Image
                  source={require("../../assets/icons/filter_icon.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#0B9D7E",
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row" style={{ height: "75%" }}>
            <FlatList
              data={groups.filter(
                (group) =>
                  (selectedId === "All groups" ||
                    (selectedId === "Groups you owe" &&
                      group.amountOwned < 0) ||
                    (selectedId === "Groups that owe you" &&
                      group.amountOwned > 0) ||
                    group.type.toLowerCase() === selectedId.toLowerCase()) &&
                  group.name
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      navigation.navigate("DetailGroups", {
                        groupInfo: item.id,
                      });
                    }}
                  >
                    <View className="flex-row space-x-4 items-center mb-3">
                      <Image
                        source={
                          item.imageuri
                            ? { uri: item.imageuri }
                            : require("../../assets/images/avatar_image.jpg")
                        }
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 10,
                        }}
                      ></Image>
                      <View className="flex-col py-3">
                        <Text
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color:
                              yourExpenseByGroup[index] >= 0
                                ? "#0B9D7E"
                                : "#990000",
                            fontWeight: 500,
                          }}
                        >
                          {yourExpenseByGroup[index] > 0
                            ? "You lent " +
                              Math.abs(
                                yourExpenseByGroup[index]
                              ).toLocaleString("de-DE") +
                              " vnd"
                            : yourExpenseByGroup[index] == 0
                            ? "settled up"
                            : "You owed " +
                              Math.abs(
                                yourExpenseByGroup[index]
                              ).toLocaleString("de-De") +
                              " vnd"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => (
                <View className="flex-row justify-center">
                  <TouchableOpacity
                    className="flex-row items-center space-x-2 border py-1 px-3 rounded-md mt-3"
                    style={{
                      borderColor: "#0B9D7E",
                    }}
                    onPress={() => navigation.navigate("AddGroups")}
                  >
                    <Image
                      source={require("../../assets/icons/addGroups_icon.png")}
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
                      Start a new group
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 200 }}
              showsVerticalScrollIndicator={false}
            ></FlatList>
          </View>

          <View
            className="flex-row"
            style={{
              position: "absolute",
              top: 450,
              left: 190,
            }}
          >
            <ButtonAddExpense />
          </View>
        </View>
        {showFilterOptions && (
          <View
            className="border-2 border-gray-300 "
            style={{
              position: "absolute",
              top: 130,
              right: 5,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              zIndex: 1,
              borderRadius: 10,
            }}
          >
            <RadioButtons
              options={radioButtons}
              onSelection={(option) => {
                setSelectedId(option);
              }}
              selectedOption={selectedId}
              renderOption={(option, selected, onSelect, index) => (
                <TouchableOpacity key={index} onPress={onSelect}>
                  <View className="flex-row items-center py-1 space-x-2">
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        marginRight: 8,
                        borderColor: selected ? "#0B9D7E" : "rgb(75, 85, 99)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selected && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#0B9D7E",
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        color: "rgb(75, 85, 99)",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default GroupsScreen;
