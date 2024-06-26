import React, { useRef, useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  LogBox,
} from "react-native";
import DetailsToolBar from "../components/DetailsToolBar";
import { useNavigation } from "@react-navigation/native";
import ExpenseService from "../services/expense";
import UserService from "../services/user";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebaseConfig";
import ExpenseImage from "./ImageExpense";
import { Alert } from "react-native";
const DetailsExpense = (props) => {
  const navigation = useNavigation();
  const { expenseId } = props.route.params;
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [paidByUser, setPaidByUser] = useState(); // New state to store user information
  const [debt, setDebt] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [user, setUser] = useState();
  LogBox.ignoreAllLogs(true);
  useEffect(() => {
    ExpenseService.getInstance().listenToFriendDetail(
      expenseId,
      async (expenseInfo) => {
        setExpenseInfo(expenseInfo);
        // Get ra nguoi tra
        const paidById = expenseInfo.paidBy;
        try {
          const user = await UserService.getInstance().getUserById(paidById);
          setUser(user);
          setPaidByUser(user);
          setParticipants(expenseInfo.participants);
          setDebt(
            await ExpenseService.getInstance().getDebtInfo(
              expenseId,
              user.username
            )
          );
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    );
  }, [expenseId]);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      await ExpenseService.getInstance().uploadImgExpense(
        expenseId,
        result.assets[0].uri
      );
      console.log("Successfully");
    }
  };

  const handlePayment = async (userId) => {
    await ExpenseService.getInstance().handlePayment(expenseId, userId);
    alert("You settled up successfully");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            ExpenseService.getInstance().deleteExpense(expenseId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]} className="py-5">
      <View style={[{ flex: 7 }]}>
        <DetailsToolBar
          navigation={props.navigation}
          onPress={handleDelete}
          expenseInfo={expenseInfo}
        ></DetailsToolBar>
      </View>
      <View style={{ flex: 76, flexDirection: "column" }}>
        <ScrollView>
          <View
            style={[
              {
                flex: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EEEEEE",
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 16,
                position: "relative",
              },
            ]}
          >
            <Image
              source={require("../assets/icons/icon_bill.png")}
              //     style={{ width: 60, height: 60 }}
              //   />
              //   <View
              //     style={[
              //       {
              //         flex: 30,
              //         flexDirection: "row",
              //         justifyContent: "flex-start",
              //         alignItems: "center",
              //         backgroundColor: "#EEEEEE",
              //         borderBottomColor: "#EEEEEE",
              //         borderBottomWidth: 1,
              //         paddingHorizontal: 12,
              //         paddingVertical: 16,
              //         position: "relative",
              //       },
              //     ]}
              //   >
              //     <Text
              //       style={{ fontSize: 18, fontWeight: "400", marginVertical: 2 }}
              //     >
              //       {expenseInfo?.description}
              //     </Text>
              //     <Text
              //       style={{ fontSize: 20, fontWeight: "500", marginVertical: 5 }}
              //     >
              //       {expenseInfo.amounts} vnd
              //     </Text>
              //     <Text
              //       style={{
              //         fontSize: 14,
              //         fontWeight: "400",
              //         marginVertical: 8,
              //         width: 250,
              //       }}
              //     >
              //       Added by {paidByUser?.username}{" "}
              //       {expenseInfo?.createAt
              //         ? "on " +
              //           new Date(
              //             expenseInfo.createAt.seconds * 1000 +
              //               expenseInfo.createAt.nanoseconds / 1000000
              //           ).toLocaleDateString("en-GB")
              //         : ""}
              //     </Text>
              //   </View>
              // </View>
              // <View
              //   style={[
              //     {
              //       flex: 30,
              //       flexDirection: "column",
              //       justifyContent: "flex-start",
              //       alignItems: "flex-start",
              //       padding: 12,
              //     },
              //   ]}
              // >
              //   <View style={{ flexDirection: "row", alignItems: "center" }}>
              //     <Image
              //       source={require("../assets/icons/bill6.png")}
              style={{ width: 60, height: 60 }}
            />
            <View
              style={[
                {
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginStart: 10,
                  marginEnd: 10,
                },
              ]}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "400", marginVertical: 2 }}
              >
                {expenseInfo.description}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "500", marginVertical: 5 }}
              >
                {Math.abs(expenseInfo.amounts?.toFixed(0)).toLocaleString(
                  "de-De"
                )}{" "}
                vnd
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginVertical: 8,
                  width: 250,
                }}
              >
                Added by {paidByUser?.username}{" "}
                {expenseInfo?.createAt
                  ? "on " +
                    new Date(
                      expenseInfo.createAt.seconds * 1000 +
                        expenseInfo.createAt.nanoseconds / 1000000
                    ).toLocaleDateString("en-GB")
                  : ""}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                position: "absolute",
                right: 12,
              }}
              onPress={chooseImage}
            >
              <Image
                source={require("../assets/icons/photo.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                flex: 30,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: 12,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={
                  user?.avatarUrl
                    ? { uri: user.avatarUrl }
                    : require("../assets/icons/account.png")
                }
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <View style={{ paddingHorizontal: 20, width: "68%" }}>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {debt[0]}
                </Text>
              </View>
            </View>
            <View style={{ paddingStart: 60, marginTop: 10 }}>
              {debt.slice(1).map((debt, index) => (
                <View key={index}>
                  <Text
                    style={{
                      justifyContent: "center",
                      textAlign: "left",
                      paddingVertical: 6,
                      color: "#777777",
                    }}
                  >
                    {debt}
                  </Text>
                  {participants[index + 1]?.userId === auth.currentUser?.uid &&
                    participants[index + 1].settleUp === false && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#43CD80",
                          borderColor: "#00CD66",
                          borderWidth: 1,
                          borderRadius: 12,
                          padding: 4,
                          width: 90,
                        }}
                        onPress={() =>
                          handlePayment(participants[index + 1]?.userId)
                        }
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            textAlign: "center",
                            color: "#fff",
                          }}
                        >
                          Settle Up
                        </Text>
                      </TouchableOpacity>
                    )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <ExpenseImage expenseInfo={expenseInfo} onPress={chooseImage} />
      </View>
    </View>
  );
};

export default DetailsExpense;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "column",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  commentContainerYou: {
    alignSelf: "flex-end",
    backgroundColor: "#C1FFC1",
    alignItems: "flex-end",
  },
  commentContainerOther: {
    alignSelf: "flex-start",
    backgroundColor: "#B4EEB4",
    alignItems: "flex-start",
  },
  commentName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  commentNameYou: {
    // color: "#33FFFF",
  },
  commentContent: {
    fontSize: 14,
    marginTop: 2,
  },
});
