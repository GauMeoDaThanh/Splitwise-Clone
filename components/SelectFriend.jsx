import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from "react";

const SelectFriend = ({
  name,
  avatar,
  isSelected,
  onToggle,
  selectedButton,
}) => {
  const renderSplit = () => {
    switch (selectedButton) {
      case 1:
        return (
          <>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
              ...
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
              dong
            </Text>
          </>
        );
      case 2:
        return (
          <>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
              ...
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>
              %
            </Text>
          </>
        );
      case 0:
      default:
        return (
          <>
          <View style={{ flex: 1, alignItems: "flex-end", backgroundColor: 'yellow' }}>
            <BouncyCheckbox
              isChecked={isSelected}
              textColor="#000"
              fillColor="#228B22"
              text=""
              onPress={onToggle}
            /></View>
          </>
        );
    }
  };
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
        source={{uri: avatar}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "yellow",
        }}
      />
      <View style={{ paddingHorizontal: 20, width: selectedButton == 0 ? "94%" : selectedButton == 1 ? "76%" : "82%"}}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>{name}</Text>
      </View>
      {renderSplit()}
    </TouchableOpacity>
  );
};

export default SelectFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
  },
});
