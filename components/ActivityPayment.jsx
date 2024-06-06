import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView, FlatList} from "react-native";

const ActivityPayment = () => {
    return(
        <View 
            className="flex-row bg-white px-2 py-2 items-center space-x-2 border-b border-gray-300"
            style={{ 
                width: '100%',
            }}
        >
            <View className="relative">
                <Image
                    source={require("../assets/icons/payment_icon.png")}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                    }}
                />
                <Image
                    source={require("../assets/images/avatar_image.jpg")}
                    style={{
                        width: 20,
                        height: 20,
                        left: 32,
                        top: 35,
                        borderRadius: 10,
                        position: 'absolute',
                        borderColor: 'white',
                        borderWidth: 2
                    }}
                />
            </View>
            <View className="flex-col px-2" style={{ flex: 1 }}>
                <View className="flex-row items-center" style={{ flexWrap: 'wrap' }}>
                    <Text
                        className="text-gray-700 mr-1"
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                        }}
                    >
                        You
                    </Text>
                    <Text>have paid the bill in the group</Text>
                    <Text
                        className="text-gray-700 ml-1"
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                        }}
                    >
                        "Aa".
                    </Text>
                </View>
                <View className="flex-row">
                    <Text
                        className="text-gray-400"
                        style={{
                            fontSize: 12,
                            fontWeight: '500',
                        }}
                    >
                        18 tháng 5 2024 at 15:35
                    </Text>
                </View>
            </View>
      </View>
      
    );
}

export default ActivityPayment;

