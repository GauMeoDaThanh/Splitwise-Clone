import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from "react";

const SelectFriend = ({ name, avatar, isSelected, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
      onPress={onToggle}
    >
      <Image
        source={avatar}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "yellow",
        }}
      />
      <View style={{ paddingHorizontal: 20, width: "94%" }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>{name}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <BouncyCheckbox
          isChecked={isSelected}
          textColor="#000"
          fillColor="#228B22"
          text=""
          onPress={onToggle}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
