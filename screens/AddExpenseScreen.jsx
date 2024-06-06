import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import AddToolBar from "../components/AddToolBar";
import { useNavigation } from "@react-navigation/native";
import BtnAddFriendToBill from "../components/BtnAddFriendToBill";
// Danh sách các bạn bè
const searchFriendsList = [
  { name: "Tấn Dũng", avatar: require("../assets/icons/account.png") },
  { name: "John Doe", avatar: require("../assets/icons/account.png") },
  {
    name: "Nguyễn Đoàn Bảo Châu",
    avatar: require("../assets/icons/account.png"),
  },
];
// Danh sách các bạn bè
const selectFriendsList = [
  { name: "Ái Lam", avatar: require("../assets/icons/account.png") },
];
const AddExpenseScreen = (props) => {
  const textInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const moneyInputRef = useRef(null);

  useEffect(() => {
    // Focus vào TextInput khi mở trang
    textInputRef.current.focus();
  }, []); // Chỉ chạy một lần sau khi mở trang

  const [description, setDescription] = useState("");
  const [money, setMoney] = useState("");
  const [isFocused, setIsFocused] = useState(0);

  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);

  useEffect(() => {
    setIsBothFieldsFilled(description !== "" && money !== "");
  }, [description, money]);

  const navigation = useNavigation();
  const handleAddImageExpense = () => {
    navigation.navigate("AddImageExpense");
  };

  const handleSplitExpense = () => {
    navigation.navigate("SplitExpenseScreen");
  };

  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={[{ flex: 7 }]}>
        <AddToolBar
          navigation={props.navigation}
          title={"Add an expense"}
          action={"Save"}
          isDisabled={!isBothFieldsFilled}
          disabled={!isBothFieldsFilled}
        ></AddToolBar>
      </View>
      <View
        style={[
          {
            flex: 7,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EEEEEE",
            borderBottomColor: "#AAAAAA",
            borderBottomWidth: 1,
          },
        ]}
      >
        <Text>With</Text>
        <Text style={{ fontWeight: 600, fontSize: 16 }}> you </Text>
        <Text style={{ marginEnd: 10 }}>and:</Text>
        <TextInput
          placeholder="Enter email, name or group"
          ref={textInputRef} // Ref cho TextInput
          style={{
            width: "70%",
            fontSize: 16,
            fontWeight: 400,
            height: "60%",
          }}
          onSubmitEditing={() => {
            descriptionInputRef.current.focus();
          }}
        ></TextInput>
      </View>
      <View style={styles.buttonListContainer}>
        {selectFriendsList.map((friend, index) => (
          <BtnAddFriendToBill
            name={friend.name}
            avatar={require("../assets/icons/account.png")}
            isSelected={true}
          ></BtnAddFriendToBill>
        ))}
        {searchFriendsList.map((friend, index) => (
          <BtnAddFriendToBill
            name={friend.name}
            avatar={require("../assets/icons/account.png")}
            isSelected={false} // Kiểm tra xem nút này có được chọn không
          ></BtnAddFriendToBill>
        ))}
      </View>
      <View
        style={[
          {
            flex: 56,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Image
              source={require("../assets/icons/Bill1.png")}
              style={{ width: 40, height: 40 }}
            ></Image>
          </TouchableOpacity>
          <TextInput
            placeholder="Enter a description"
            ref={descriptionInputRef}
            style={[
              styles.textInputStyle,
              { borderBottomColor: isFocused === 1 ? "#009966" : "#999999" },
            ]}
            value={description}
            onSubmitEditing={() => {
              moneyInputRef.current.focus();
            }}
            onChangeText={(text) => setDescription(text)}
            onFocus={() => setIsFocused(1)}
            onBlur={() => setIsFocused(0)}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Image
              source={require("../assets/icons/money.png")}
              style={{ width: 40, height: 40 }}
            ></Image>
          </TouchableOpacity>
          <TextInput
            placeholder="0 đồng"
            keyboardType="numeric"
            ref={moneyInputRef}
            style={[
              styles.textInputStyle,
              { borderBottomColor: isFocused === 2 ? "#009966" : "#999999" },
            ]}
            value={money}
            onChangeText={(text) => setMoney(text)}
            onFocus={() => setIsFocused(2)}
            onBlur={() => setIsFocused(0)}
          ></TextInput>
        </View>
        <View
          style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
        >
          <Text>Paid by </Text>
          <TouchableOpacity style={[styles.buttonStyle]}>
            <Text> you </Text>
          </TouchableOpacity>
          <Text> and split </Text>
          <TouchableOpacity
            style={[styles.buttonStyle]}
            onPress={handleSplitExpense}
            disabled={!isBothFieldsFilled}
          >
            <Text>equally</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[{ flex: 10, borderTopColor: "#EEEEEE", borderTopWidth: 1 }]}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          onPress={handleAddImageExpense}
        >
          <Image
            source={require("../assets/icons/camera.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={[{ isFocused === 2 ? flex: 50 : flex: 36 }]}>
        <KeyboardAvoidingView
          // style={{ flex: 1 }}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        ></KeyboardAvoidingView>
      </View> */}
      {isFocused === 2 && (
        <View style={{ flex: 36 }}>
          {<KeyboardAvoidingView></KeyboardAvoidingView>}
        </View>
      )}

      {isFocused !== 2 && (
        <View style={{ flex: 50 }}>
          {<KeyboardAvoidingView></KeyboardAvoidingView>}
        </View>
      )}
    </View>
  );
};
export default AddExpenseScreen;
const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    width: "60%",
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 600,
  },
  buttonStyle: {
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 6,
    padding: 3,
  },
  buttonListContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    flexWrap: "wrap", // Để các nút tự động xuống dòng khi hết chỗ
    marginTop: 10,
  },
});
