import AddToolBar from "../components/AddToolBar";
import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";

const AddFriendScreen = (props) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isFocused, setIsFocused] = useState(0);

  const clearName = () => {
    setName("");
  };

  const clearContact = () => {
    setContact("");
  };
  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={{ flex: 7 }}>
        <AddToolBar
          navigation={props.navigation}
          title={"Add new contact"}
          action={"Add"}
        ></AddToolBar>
      </View>
      <View style={{ flex: 93, backgroundColor: "white", }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Name</Text>
          <View style={{ flexDirection: "row", alignItems: "center", borderBottomColor: isFocused === 2 ? "#009966" : "black",
                borderBottomWidth: 1, }}>
            <TextInput
              style={{
                marginTop: 5,
                marginBottom: 1,
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: 300,
                width: '96%',
              }}
              value={name}
              onChangeText={(text) => setName(text)}
              onFocus={() => setIsFocused(2)}
              onBlur={() => setIsFocused(0)}
            >
            </TextInput>
            {name !== "" && (
              <TouchableOpacity onPress={clearName} style={{width: 15,}}>
                <Text name="clear" style={{fontSize: 18, color: "#666666", }} >x</Text>
              </TouchableOpacity>
            )} 
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Phone number or email address</Text>
          <View style={{ flexDirection: "row", alignItems: "center",  borderBottomColor: isFocused == 1 ? "#009966" : "black",
                borderBottomWidth: 1, }}>
            <TextInput
              style={{
                marginTop: 5,
                marginBottom: 1,
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: 300,
                width: '96%',
              }}
              value={contact}
              onChangeText={(text) => setContact(text)}
              onFocus={() => setIsFocused(1)}
              onBlur={() => setIsFocused(0)}
            >
            </TextInput>
            {contact !== "" && (
              <TouchableOpacity onPress={clearContact} style={{width: 15,}}>
                <Text name="clear" style={{fontSize: 18, color: "#666666", }} >x</Text>
              </TouchableOpacity>
            )} 
          </View>
        </View>
        
        <View style={{ padding: 40 }}>
          <Text style={{ fontSize: 14, fontWeight: 300, textAlign: "center" }}>
            Don't worry, nothing sends just yet. You will have another chance to
            review before sending.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddFriendScreen;
