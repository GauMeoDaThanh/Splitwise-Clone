import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Image, ScrollView } from "react-native";
const ChangePassword = () =>{
    return(
        <View className="form space-y-1 p-2">
            <TextInput 
                className = "p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
                placeholder="Your current password"
            ></TextInput>
            <TextInput 
                className = "p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
                placeholder="Create a new password"
            ></TextInput>
        </View>
    );
}
export default ChangePassword;