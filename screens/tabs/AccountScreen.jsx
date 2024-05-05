import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, SafeAreaView, View,TouchableOpacity, Image, ScrollView} from "react-native";
const AccountScreen = () => {
    return(
        <ScrollView >
            <View className ="flex-1 bg-white" >
                <SafeAreaView className='flex-1'>
                    <View className = "flex-1 flex my-7">
                        <Text className='text-black font-bold text-2xl ml-5'>Account</Text>
                    </View>
                </SafeAreaView>
                <View className='flex-row justify-center space-x-2'>
                    <View className='relative'>
                        <Image source={require('../assets/images/avatar_image.jpg')}
                            style={{width: 50, height: 50}}
                            className='rounded-xl'
                        ></Image>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
export default AccountScreen;

