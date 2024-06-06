import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    StyleSheet,
    FlatList,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import AddToolBar from "../components/AddToolBar";
import ExpenseService from "../services/expense";


const expenseService = ExpenseService.getInstance();
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebaseConfig";
const AddExpenseScreen = (props) => {
    const textInputRef = useRef(null);
    const navigation = useNavigation();
    const [description, setDescription] = useState("");
    const [money, setMoney] = useState("");
    const [isFocused, setIsFocused] = useState(0);
    const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
    
    useEffect(() => {
        // Focus vào TextInput khi mở trang
        textInputRef.current.focus();
    }, []); // Chỉ chạy một lần sau khi mở trang

    // Làm Gợi ý khi nhận mail hoặc tên user
    const [suggestions, setSuggestions] = useState([]);
    let [selectedParticipants, setSelectedParticipants] = useState([{userId: auth.currentUser.uid}]);
    useEffect(() => {
        setIsBothFieldsFilled(description !== "" && money !== "" && selectedParticipants.length > 1);
        if (props.route.params) {
            setDescription(props.route.params.description);
            setMoney(props.route.params.amounts);
        }
    }, [description, money, selectedParticipants]);

    handleInputParticipants = async (text) => {
        const filteredSuggestions = await expenseService.handleInputParticipants(text);
        setSuggestions(filteredSuggestions);    
    };
    // Xử lí nhấn chọn tên user
    const handleSuggestionSelect = (item) => {
        const isExist = selectedParticipants.some(
            (participant) => {
                if (participant.userId) {
                    return participant.userId === item.uid
                }
                return participant.groupId === item.id
            }
        );
        if (!isExist) {
            setSelectedParticipants((prevSelectedPaticipants) => [
                ...prevSelectedPaticipants,
                item.uid?{userId: item.uid}:{groupId: item.id},
            ]);
        } else {
            console.log("Friend or group is already selected!");
        }
    };
    // Chia hoá đơn
    const handleSplitExpense = () => {
        navigation.navigate('SplitExpenseScreen', { selectedParticipants:selectedParticipants, description:description, money:money });
        setSelectedParticipants([{userId: auth.currentUser.uid}])
    };
    // Tạo hoá đơn
    const handleCreateExpense = async () => {
        let groupId = [];
      for (par of selectedParticipants) {
            if (par.groupId) {
               groupId.push(par.groupId)
           }
        }
        let splitParticipants = []
        const participantsList = await expenseService.getParticipants(selectedParticipants);
        let isFirstFriend = true;
        for (const participant of participantsList) {
            splitParticipants.push({
            userId: participant.uid,
            amount: parseFloat((parseFloat(money) / participantsList.length).toFixed(0)),
            settleUp: isFirstFriend
            });
            isFirstFriend = false; 
        }
        try {
            await expenseService.createExpense(
            new Date(),
            parseFloat(money),
            groupId,
            description,
            splitParticipants
            );
            navigation.navigate('Friends');
        } catch (e) {
            console.error("Fail to add expense ", e);
        }
  };
    return (
        <View style={[{ flex: 100, backgroundColor: "white" }]} className="py-5">
            <View style={[{ flex: 7 }]}>
                <AddToolBar
                    navigation={props.navigation}
                    title={"Add an expense"}
                    action={"Save"}
                    isDisabled={!isBothFieldsFilled}
                    disabled={!isBothFieldsFilled}
                    onPress={handleCreateExpense}
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
                {/* <Text style={{fontWeight: 600, fontSize: 16}}> you </Text> */}
                <Text style={{ fontSize: 16 }}> you </Text>
                <Text style={{ marginEnd: 10 }}>and:</Text>

                {/* TextInput */}
                <TextInput
                    placeholder="Enter email, name or group"
                    ref={textInputRef} // Ref cho TextInput
                    style={{
                        width: "70%",
                        fontSize: 16,
                        height: "60%",
                    }}
                    onChangeText={(text) => handleInputParticipants(text)}
                />
            </View>
            <View style={{ position: "fixed" }}>
                {suggestions.length > 0 ? (
                    <FlatList
                        data={suggestions} // Truyền trạng thái gợi ý cập nhật
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key = {index}
                                onPress={() => handleSuggestionSelect(item)}
                            >
                                <Text>{item.type?item.name:item.username}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.uid}
                        style={{
                            height: 100,
                            borderColor: "gray",
                            borderWidth: 1,
                        }}
                        // Thêm chỉ báo tải trong khi lấy gợi ý (tùy chọn)
                        ListEmptyComponent={() => (
                            <View style={{ alignItems: "center", padding: 10 }}>
                                <Text>Không tìm thấy kết quả.</Text>
                                <TouchableOpacity
                                    onPress={() => handleInviteAddFriend()}
                                >
                                    <Text style={{ color: "blue" }}>
                                        Thêm bạn bè
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <View style={{ alignItems: "center", padding: 10 }}>
                        <Text>Add new friends!</Text>
                    </View>
                )}
            </View>

            <View
                style={[
                    {
                        flex: 43,
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
                        style={[
                            styles.textInputStyle,
                            {
                                borderBottomColor:
                                    isFocused === 1 ? "#009966" : "#999999",
                            },
                        ]}
                        value={description}
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
                        style={[
                            styles.textInputStyle,
                            {
                                borderBottomColor:
                                    isFocused === 2 ? "#009966" : "#999999",
                            },
                        ]}
                        value={money}
                        onChangeText={(text) => setMoney(text)}
                        onFocus={() => setIsFocused(2)}
                        onBlur={() => setIsFocused(0)}
                    ></TextInput>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        alignItems: "center",
                    }}
                >
                    <Text>Paid by </Text>
                    <TouchableOpacity style={[styles.buttonStyle]}>
                        <Text> you </Text>
                    </TouchableOpacity>
                    <Text> and split </Text>
                      <TouchableOpacity style={[styles.buttonStyle]} onPress={handleSplitExpense} disabled={!isBothFieldsFilled}>
                        <Text>equally</Text>
                    </TouchableOpacity>
                </View>
            </View>

             <View
        style={[{ flex: 10, borderTopColor: "#EEEEEE", borderTopWidth: 1 }]}
      >
        {/* <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-end' }} onPress={handleAddImageExpense}>
       
          <Image
            source={require("../assets/icons/camera.png")}
            style={{ width: 60, height: 60 }}
          />
  
        </TouchableOpacity> */}
      </View>
      {/* <View style={[{ isFocused === 2 ? flex: 50 : flex: 36 }]}>
        <KeyboardAvoidingView
          // style={{ flex: 1 }}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        ></KeyboardAvoidingView>
      </View> */}
      {isFocused === 2 && (
        <View style={{ flex: 36 }}>{<KeyboardAvoidingView></KeyboardAvoidingView>}</View>
      )}

      {isFocused !== 2 && (
        <View style={{ flex: 50 }}>{<KeyboardAvoidingView></KeyboardAvoidingView>}</View>
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
    // fontWeight: 600,
  },
  buttonStyle: {
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 6,
    padding: 3,
  },
});


