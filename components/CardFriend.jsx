import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

const renderColoredText = (text) => {
  const parts = text.split(/(\s+)/); // Phân tách chuỗi thành các từ và khoảng trắng
  return (
    <Text>
      {parts.map((part, index) => {
        if (part === "owes") {
          return (
            <Text key={index} style={{ color: "green" }}>
              {part}
            </Text>
          );
        } else if (part === "owe") {
          return (
            <Text key={index} style={{ color: "red" }}>
              {part}
            </Text>
          );
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
      onPress={props.onPress}
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={
            props.avatar
              ? { uri: props.avatar }
              : require("../assets/images/avatar_image.jpg")
          }
          style={{ width: 60, height: 60, borderRadius: 20 }}
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
              color: props.data >= 0 ? "#0B9D7E" : "#990000",
            }}
          >
            {renderColoredText(
              props.data > 0
                ? "You lent "
                : props.data == 0
                ? "Settled up"
                : "You owed "
            )}
          </Text>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "right",
              color: props.data >= 0 ? "#0B9D7E" : "#990000",
              fontWeight: 500,
            }}
          >
            {renderColoredText(
              props.data > 0
                ? Math.abs(props.data).toLocaleString("de-DE") + " vnd"
                : props.data == 0
                ? ""
                : Math.abs(props.data).toLocaleString("de-De") + " vnd"
            )}
          </Text>
        </View>
      </View>
      <View style={{ paddingStart: 60, marginTop: 0 }}>
        <Text
          style={{
            justifyContent: "center",
            textAlign: "left",
            paddingVertical: 0,
            color: "#777777",
          }}
        ></Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
});
