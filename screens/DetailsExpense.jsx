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
} from "react-native";
import DetailsToolBar from "../components/DetailsToolBar";
// import BottomAppBar from "../components/BottomAppBar";
import { useNavigation } from "@react-navigation/native";
import ExpenseService from "../services/expense";
import UserService from "../services/user";
import * as ImagePicker from "expo-image-picker";

const DetailsExpense = ({ route }) => {
  const comments = [
    { name: "You", content: "This is your comment." },
    { name: "Tan Dung", content: "This is a comment from Tan Dung." },
    { name: "Nhung", content: "Another comment from Nhung." },
  ];
  const navigation = useNavigation();
  const { expenseId } = route.params;
  const [expenseInfo, setExpenseInfo] = useState([])
const [paidByUser, setPaidByUser] = useState(); // New state to store user information

useEffect(() => {
  ExpenseService.getInstance().listenToFriendDetail(expenseId, async (expenseInfo) => {
    setExpenseInfo(expenseInfo);
    const paidById = expenseInfo.paidBy;
    try {
      const user = await UserService.getInstance().getUserById(paidById);
      setPaidByUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  });
}, []);
  
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // await UserService.getInstance().uploadAvatar(result.assets[0].uri);
    }
  };
  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={[{ flex: 7 }]}>
        <DetailsToolBar></DetailsToolBar>
      </View>
      <View style={{ flex: 76, flexDirection: "column" }}>
      <ScrollView >
        <View
          style={[
            {
              flex: 30,
              flexDirection: "row",
              justifyContent: "flex-start",
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
            source={require("../assets/icons/bill6.png")}
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
            {expenseInfo.amounts} vnd
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                marginVertical: 8,
                width: 250,
              }}
              >
                Add {paidByUser?.username}  {expenseInfo?.createAt? 'on ' + new Date(expenseInfo.createAt.seconds * 1000 + expenseInfo.createAt.nanoseconds / 1000000).toLocaleDateString('en-GB'):''}

            </Text>
          </View>
          <TouchableOpacity style={{ width: 60, height: 60, position: "absolute", right: 12 }} onPress={chooseImage}>
          <Image
            source={require("../assets/icons/photo.png")}
            style={{ width: 60, height: 60}}
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
              source={require("../assets/icons/account.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View style={{ paddingHorizontal: 20, width: "68%" }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Nhung paid 1000 dong</Text>
            </View>
            <TouchableOpacity style={{backgroundColor: '#43CD80', borderColor: '#00CD66', borderWidth: 1, borderRadius: 20, padding: 10, }}>
           <Text style={{fontSize: 16, fontWeight: 400}}>
            Settle up
           </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingStart: 60, marginTop: 10 }}>
            <Text
              style={{
                justifyContent: "center",
                textAlign: "left",
                paddingVertical: 6,
                color: "#777777",
              }}
            >
              Tan Dung owes you 35.000 đồng
            </Text>
            <Text
              style={{
                justifyContent: "center",
                textAlign: "left",
                paddingVertical: 6,
                color: "#777777",
              }}
            >
              You owe Tan Dung 35.000 đồng
            </Text>
            <Text
              style={{
                justifyContent: "center",
                textAlign: "left",
                paddingVertical: 6,
                color: "#777777",
              }}
            >
              You owe Tan Dung 35.000 đồng
            </Text>
            
          </View>
        </View>
        {/* <View
          style={[
            {
              flex: 23,
              flexDirection: "column",
              borderTopColor: "#EEEEEE",
              borderTopWidth: 1,
              padding: 12,
            },
          ]}
        > */}
          {/* <Text style={{ fontSize: 15, fontWeight: "500" }}>Comments</Text>
          {comments.map((comment, index) => (
            <View
              key={index}
              style={[
                styles.commentContainer,
                comment.name === "You"
                  ? styles.commentContainerYou
                  : styles.commentContainerOther,
              ]}
            > */}
              {/* <Text
                style={[
                  styles.commentName,
                  comment.name === "You" ? styles.commentNameYou : null,
                ]}
              >
                {comment.name}
              </Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View> */}
          {/* ))} */}
        {/* </View> */}
      </ScrollView>
      {/* </View>
      <View style={{ flex: 7, flexDirection:'row', borderTopColor: "#EEEEEE", borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
        style={{fontSize: 16,paddingVertical: 7, paddingHorizontal: 10, borderRadius: 30, borderColor: '#548B54', borderWidth: 1, width: 360, height: 32, }}
        placeholder="Viết bình luận..."
        ></TextInput>
        <Image
           source={require("../assets/icons/send.png")}
          style={{ width: 26, height: 24, margin: 5, tintColor: '#32CD32' }}
        />
      </View> */}
      {/* <View style={{ flex: 10, borderTopColor: "#CCCCCC", borderTopWidth: 1 }}> */}
        {/* <BottomAppBar /> */}
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
