import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, SafeAreaView, View,TouchableOpacity, Image, ScrollView} from "react-native";

const AccountScreen = () => {
    return(
        <ScrollView >
            <View className ="flex-1 bg-white" >
                <View className='flex-row justify-center space-x-2'>
                    <View className='relative'>
                        <Image></Image>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
export default AccountScreen;

