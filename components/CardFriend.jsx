import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

const renderColoredText = (text) => {
  const parts = text.split(/(\s+)/); // Phân tách chuỗi thành các từ và khoảng trắng
  return (
    <Text>
      {parts.map((part, index) => {
        if (part === 'owes') {
          return <Text key={index} style={{ color: 'green' }}>{part}</Text>;
        } else if (part === 'owe') {
          return <Text key={index} style={{ color: 'red' }}>{part}</Text>;
        } else {
          return <Text key={index}>{part}</Text>;
        }
      })}
    </Text>
  );
};

const CardFriend = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/icons/account.png")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ paddingHorizontal: 20, width: "68%" }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>{props.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: "auto",
          }}
        >
          <Text
            style={{
              justifyContent: "center",
              textAlign: "right",
              color: "#33CCCC",
            }}
          >
            owes you
          </Text>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "right",
              color: "#33CCCC",
              fontWeight: 500,
            }}
          >
            35.000 đồng
          </Text>
          {/* <Text style={{ justifyContent: "center", textAlign: 'right', color: '#990000' }}>you owe</Text>
          <Text style={{ justifyContent: "center", textAlign: 'right', color: '#990000', fontWeight: 500 }}>35.000 đồng</Text> */}
        </View>
      </View>
      <View style={{ paddingStart: 60, marginTop: 10}}>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "left",
              paddingVertical: 6,
              color: "#777777",
            }}
          >
            {renderColoredText("Tan Dung owes you 35.000 đồng")}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "left",
              paddingVertical: 6,
              color: "#777777",
            }}
          >
            {renderColoredText("You owe Tan Dung 35.000 đồng")}
          </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
    // borderColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // height: 70,
  },
});
