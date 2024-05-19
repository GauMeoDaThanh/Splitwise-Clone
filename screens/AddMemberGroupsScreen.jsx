import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView, FlatList} from "react-native";

const AddMemberGroupsScreen = () => {
    const navigation = useNavigation();
    return(
        <View className = 'flex-1 bg-white py-5 space-y-2'>
            <View className = 'flex-row px-4 py-4 space-x-10 items-center mb-2'>
                <TouchableOpacity className = 'flex-row'
                    onPress={()=>navigation.navigate('ListFriends')} 
                >
                    <Image
                        source={require('../assets/icons/back_icon.png')}  
                        style = {{
                            width: 20,
                            height: 20
                        }}           
                    >
                    </Image>
                </TouchableOpacity>
                <Text
                    className = 'text-gray-700'
                    style={{
                        fontSize: 19,
                        fontWeight: 400
                    }}
                >
                    Add new contact
                </Text>
                <View className = 'flex-row px-12'>
                    <TouchableOpacity className = 'flex-row'>
                        <Text
                            className = 'text-gray-500'
                            style={{
                                fontSize: 14,
                                fontWeight: 500
                            }}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className = 'flex-col mx-4'>
                <Text
                    className = 'text-gray-700'
                    style={{
                        fontSize: 14,
                        fontWeight: 500
                    }}
                >
                    Name
                </Text>
                <TextInput
                    className=" text-gray-700"
                    style={{
                        borderBottomWidth: 2,
                        borderColor: '#0B9D7E',
                        textAlign: 'left'
                    }}
                />
            </View>
            <View className = 'flex-col mx-4 py-5'>
                <Text
                    className = 'text-gray-700'
                    style={{
                        fontSize: 14,
                        fontWeight: 500
                    }}
                >
                    Email address
                </Text>
                <TextInput
                    className=" text-gray-700"
                    style={{
                        borderBottomWidth: 2,
                        borderColor: '#0B9D7E',
                        textAlign: 'left'
                    }}
                />
            </View>
            <View className = 'flex-row mx-12'>
                <Text
                    className = 'text-gray-500'
                    style={{
                        fontSize: 12,
                        fontWeight: 500,
                        textAlign: 'center'
                    }}
                >
                    Don't worry, nothing sends just yet. You will have another chance to review before sending.
                </Text>
            </View>
        </View>
    );
}
export default AddMemberGroupsScreen;