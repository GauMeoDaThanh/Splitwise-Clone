import React, { useState, useEffect, useRef } from "react";
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
  const navigation = useNavigation()
  const description = props.route.params.description;
  const amounts = props.route.params.money
  const [selectedButton, setSelectedButton] = useState(0);
  const [participants, setParticipants] = useState([]); 
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [action, setAction] = useState()
  
// use FocusEffect to get all the expense when focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchParticipants = async () => {
        try {
          const selectedPar = props.route.params.selectedParticipants;
          setSelectedParticipants(selectedPar);
          // Danh sách người chia hoá đơn
          const friendsList = []
          const participantsList = await expenseService.getParticipants(selectedPar);
          setParticipants(participantsList);
          for (participant of participantsList) {
            friendsList.push({ uid: participant.uid, name: participant.username, avatar: participant.avatarUrl })
          }
          setFriendsList(friendsList)
          setSelectedFriends(friendsList.map((friend) => friend))
          setSelectedParticipants(selectedPar);
        } catch (error) {
          console.error("Error fetching participants:", error);
        }
      };
      fetchParticipants();
    }, [selectedParticipants])
  );

 const handleFriendToggle = (item) => {
setSelectedFriends((prevSelectedFriends) =>
    prevSelectedFriends.includes(item)
    ? prevSelectedFriends.filter((friend) => friend.uid !== item.uid)
    : [...prevSelectedFriends, item]
);
};
  
  const checkInput = (valueInputs, fullNumber) => {
     // Kiểm tra chia không đủ
       let sum = 0;
      for (const [key, value] of Object.entries(valueInputs)) {
        if (isNaN(value)) {
          alert("Please fill in the complete division number");
          return;
        }
        sum += parseFloat(value);
      }
      if (sum != fullNumber) {
        alert('Invalid division number for invoice');
        return false;
      }
      return true;
    }
//Tạo hoá đơn
  const handleDoneSplit = async () => {
      let groupId = []
      let splitType = ""
      let splitParticipants = []
      switch (selectedButton) {
        case 0: splitType = 'equally'
                break;
        case 1: splitType = 'unequally'
                break;
        case 2: splitType = 'percent'
                break;
    }
      for (par of selectedParticipants) {
            if (par.groupId) {
               groupId.push(par.groupId)
           }
      }
            switch (splitType) {
              case "equally":
                    let isFirstFriend = true;
                    for (const friend of selectedFriends) {
                      splitParticipants.push({
                        userId: friend.uid,
                        amount: parseFloat((parseFloat(amounts) / selectedFriends.length).toFixed(0)),
                        settleUp: isFirstFriend
                      });
                      isFirstFriend = false; 
                    }
                    break;
              case "unequally":
                    if (!checkInput(valueInputs, amounts)) return;
                    isFirstFriend = true;
                    for (friend of friendsList) {
                        splitParticipants.push({
                            userId: friend.uid,
                            amount: parseFloat(parseFloat(valueInputs[friend.uid]).toFixed(0)),
                            settleUp: isFirstFriend
                        })
                      isFirstFriend = false; 
                    }
                    break;
              case "percent":
                    if (!checkInput(valueInputs, 100)) return;
                    isFirstFriend = true;
                    for (friend of friendsList) {
                        splitParticipants.push({
                            userId: friend.uid,
                            amount: parseFloat((parseFloat(valueInputs[friend.uid]) / 100 * amounts).toFixed(0)),
                            settleUp: false
                        })
                      isFirstFriend = false;
                  }
                    break;
            }
        try {
            await expenseService.createExpense(
            new Date(),
            parseFloat(amounts),
            groupId,
            description,
            splitParticipants
            );
            navigation.navigate('Friends');
        } catch (e) {
            console.error("Fail to add expense ", e);
        }
  };
  
  const allSelected = selectedFriends.length === friendsList.length;
  const [valueInputs, setValueInputs] = useState({});
  const handleValueInputChange = (friendId, value) => {
    setValueInputs((prevValueInputs) => ({
      ...prevValueInputs,
      [friendId]: value,
    }));
  };

  const handleButtonPress = (index) => {
  setSelectedButton(index); 
  };

const totalValueInput = Object.values(valueInputs).reduce(
  (total, value) => total + parseFloat(value || 0),
  0
);

const leftPercentage = 100 - totalValueInput;
const leftAmount = amounts - totalValueInput;
const amountOfPerson = (amounts / selectedFriends.length).toFixed(0);

const imageSource = () => {
  switch (selectedButton) {
    case 1:
    return require("../assets/icons/split2.png");
    case 2:
    return require("../assets/icons/split3.png");
    case 0:
    default:
    return require("../assets/icons/split1.png");
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
                  {totalValueInput} dong of {amounts} dong
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                  {leftAmount} dong left
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
                {totalValueInput}% of 100%
                </Text>
                 <Text style={{ fontSize: 14, fontWeight: 400, color: leftPercentage<0 ? 'red' : 'black' }}>{leftPercentage}% left</Text>
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
                        {amountOfPerson} Dong/person
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
                        friendsList.map((friend) => friend)
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
    <View style={[{ flex: 100, backgroundColor: "white" }]} className='py-5'>
      <View style={{ flex: 7 }}>
        <AddToolBar
          navigation= {props.navigation}
          title={"Split options"}
          action={"Done"}
          isDisabled={selectedFriends.length === 0 && selectedButton === 0}
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
              valueInput={valueInputs[friend.uid] || ""}
              setValueInput={(text) => handleValueInputChange(friend.uid, text)}
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
