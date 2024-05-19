import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import AddToolBar from "../components/AddToolBar";
import SelectFriend from "../components/SelectFriend";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ExpenseService from "../services/expense";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";
const expenseService = ExpenseService.getInstance();

const SplitExpenseScreen = (props) => {
const [selectedButton, setSelectedButton] = useState(0); // Track selected button 
const [participants, setParticipants] = useState([]); // Use state for participants
const description = props.route.params.description;
const money = props.route.params.money
console.log("description", description)
console.log("money", money)
// Khởi tạo tất cả bạn bè được chọn
const [selectedFriends, setSelectedFriends] = useState([]);
const [selectedParticipants, setSelectedParticipants] = useState([])
  const [splitType, setSplitType] = useState('equally'); 
  
  useEffect(() => {
    const handleGetParticipants = async () => {
      const selectedPar = props.route.params.selectedParticipants;
      setSelectedParticipants(selectedPar);
      try {
        const participantsList = await expenseService.getParticipants(selectedPar);
        setParticipants(participantsList); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    handleGetParticipants(); 
  }, []);

  // Danh sách người chia hoá đơn
  const friendsList = []
  for (participant of participants) {
     friendsList.push({uid: participant.uid, name: participant.username, avatar: participant.avatarUrl})
  }


  // console.log("Selected Friends: ",selectedFriends)
const handleButtonPress = (index) => {
setSelectedButton(index); // Update selected button state
};

const handleFriendToggle = (item) => {
  setSelectedFriends((prevSelectedFriends) =>
    prevSelectedFriends.filter((friend) => friend.uid !== item.uid)?[...prevSelectedFriends, item]:[...prevSelectedFriends]
);
  };
  // Xử lí chia hoàn thành
  const navigation = useNavigation()
  const handleDoneSplit = async () => {
  switch (selectedButton) {
    case 0:
      Alert.alert('Success', 'Split expense successfully!');
      setSplitType('equally')
      // navigation.popToTop(); // Quay về màn hình gốc
      await navigation.navigate("AddExpenseScreen", {
      selectedFriends: JSON.stringify(selectedFriends),
      selectedParticipants: JSON.stringify(selectedParticipants),
      splitType,
      description,
      money,
    });
      break;
    case 1:
      setSplitType("percent");
      
      break;
    case 2:
      setSplitType("unequally");

      break;
    }
        // Reset lại màn hình SplitScreen sau khi điều hướng tới AddExpenseScreen
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'SplitExpenseScreen' }]
    //   })
    // );
  }

const allSelected = selectedFriends.length === friendsList.length;

const imageSource = () => {
  switch (selectedButton) {
    case 0:
      
    case 1:

    case 2:

}
};

const renderTextContent = () => {
    switch (selectedButton) {
        case 1:
        return (
            <>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Split by exact amounts
            </Text>
            <Text style={{ fontSize: 15 }}>
                Specify exactly how much each person owes
            </Text>
            </>
        );
        case 2:
        return (
            <>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Split by percentage
            </Text>
            <Text style={{ fontSize: 15 }}>
                Enter the percentage split that's fair for your situation
            </Text>
            </>
        );
        case 0:
        default:
        return (
            <>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>Split equally</Text>
            <Text style={{ fontSize: 15 }}>
                Select which people owe an equal share.
            </Text>
            </>
        );
    }
};
const renderGeneral = () => {
    switch (selectedButton) {
        case 1:
        return (
            <>
            <View
                style={{
                flex: 80,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                ... dong of .... dong
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                ...dong left
                </Text>
            </View>
            </>
        );
        case 2:
        return (
            <>
            <View
                style={{
                flex: 80,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                ...% of 100%
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 400 }}>...% left</Text>
            </View>
            </>
        );
        case 0:
        default:
        return (
            <>
            {selectedFriends.length === 0 ? (
                <View
                style={{
                    flex: 80,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <Text style={{ fontSize: 12, fontWeight: 400, color: "red" }}>
                    You must select at least one person to split with
                </Text>
                </View>
            ) : (
                <View
                style={{
                    flex: 80,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                    ...Dong/person
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                    ({selectedFriends.length} person
                    {selectedFriends.length !== 1 ? "s" : ""})
                </Text>
                </View>
            )}
            <View
                style={{
                flex: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderLeftColor: "#EEEEEE",
                borderLeftWidth: 1,
                }}
            >
                <View style={{ width: "40%", marginStart: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>All</Text>
                </View>
                <View>
                <BouncyCheckbox
                    isChecked={allSelected}
                    textColor="#000"
                    fillColor="#228B22"
                    text=""
                    fontSize="1"
                    onPress={() => {
                    if (allSelected) {
                        setSelectedFriends([]);
                    } else {
                        setSelectedFriends(
                        friendsList.map((friend) => friend.name)
                        );
                    }
                    }}
                />
                </View>
            </View>
            </>
        );
    }
};
  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={{ flex: 7 }}>
        <AddToolBar
          navigation={props.navigation}
          title={"Split options"}
          action={"Done"}
          isDisabled={selectedFriends.length === 0}
          onPress={handleDoneSplit}
        ></AddToolBar>
      </View>
      <View
        style={{ flex: 20, backgroundColor: "white", position: "relative" }}
      >
        <Image
          source={imageSource()}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>
      <View
        style={{
          flex: 8,
          backgroundColor: "white",
          position: "relative",
          justifyContent: "center",
          backgroundColor: "#EEEEEE",
          alignItems: "center",
        }}
      >
        {renderTextContent()}
      </View>
      <View
        style={{
          flex: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              selectedButton === 0 && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(0)}
          >
            <Text
              style={[
                styles.textStyle,
                selectedButton === 0 && styles.selectedText,
              ]}
            >
              =
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              selectedButton === 1 && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <Text
              style={[
                styles.textStyle,
                selectedButton === 1 && styles.selectedText,
              ]}
            >
              1.23
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              selectedButton === 2 && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <Text
              style={[
                styles.textStyle,
                selectedButton === 2 && styles.selectedText,
              ]}
            >
              %
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Danh sách bạn bè */}
      <View
        style={{ flex: 50, backgroundColor: "white", position: "relative" }}
      >
        <ScrollView>
          {friendsList.map((friend, index) => (
            <SelectFriend
              key={index}
              name={friend.name}
              avatar={friend.avatar}
              isSelected={selectedFriends.includes(friend)}
              onToggle={() => handleFriendToggle(friend)}
              selectedButton={selectedButton}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 8,
          flexDirection: "row",
          backgroundColor: "white",
          position: "relative",
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        {renderGeneral()}
      </View>
    </View>
  );
};

export default SplitExpenseScreen;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    width: 50,
    height: 34,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#8FBC8F",
    padding: 3,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 26,
  },
  selectedButton: {
    backgroundColor: "#228B22",
    color: "white",
    fontWeight: 500,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 400,
  },
  selectedText: {
    color: "white",
    fontSize: 18,
    fontWeight: 500,
  },
});