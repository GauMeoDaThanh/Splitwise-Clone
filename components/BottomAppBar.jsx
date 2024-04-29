import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

const BottomAppBar = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const getButtonStyle = (buttonName) => {
    return selectedButton === buttonName ? styles.selectedButton : styles.item;
  };

  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: "stretch",
          flexDirection: "row",
        },
      ]}
    >
      <TouchableOpacity
        style={getButtonStyle("group")}
        onPress={() => handleButtonPress("group")}
      >
        {selectedButton === "group" && <View style={styles.elementWithBorder}></View>}
        <Image
          source={require("../assets/icons/group.png")}
          style={{ width: 28, height: 28 }}
        />
        <Text>Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle("person")}
        onPress={() => handleButtonPress("person")}
      >
        {selectedButton === "person" && <View style={styles.elementWithBorder}></View>}
        <Image
          source={require("../assets/icons/person.png")}
          style={{ width: 28, height: 28 }}
        />
        <Text>Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle("activity")}
        onPress={() => handleButtonPress("activity")}
      >
        {selectedButton === "activity" && <View style={styles.elementWithBorder}></View>}
        <Image
          source={require("../assets/icons/activity.png")}
          style={{ width: 28, height: 28 }}
        />
        <Text>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle("account")}
        onPress={() => handleButtonPress("account")}
      >
        {selectedButton === "account" && <View style={styles.elementWithBorder}></View>}
        <Image
          source={require("../assets/icons/account.png")}
          style={{ width: 28, height: 28, borderRadius: 20 }}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomAppBar;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative", 
  },
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
  },
  elementWithBorder: {
    position: "absolute", 
    top: 0, 
    width: 60, 
    borderColor: "#00CC99",
    borderWidth: 3,
  },
});
