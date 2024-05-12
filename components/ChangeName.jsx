import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
const ChangeName = () => {
  return (
    <View className="flex p-2">
      <TextInput
        className="p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
        placeholder="Full Name"
      ></TextInput>
    </View>
  );
};
export default ChangeName;
