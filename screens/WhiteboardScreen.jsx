import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView} from "react-native";

const WhiteboardScreen = () => {
    const navigation = useNavigation();
    return(
        <View className = 'flex-1 bg-white py-5 space-y-2'>
            <View className = 'flex-row px-4 py-4 space-x-8 items-center'>
                <TouchableOpacity className = 'flex-row '
                    onPress={()=>navigation.navigate('DetailGroups')} 
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
                    Whiteboard
                </Text>
                <View className = 'flex-row px-28'>
                    <TouchableOpacity className = 'flex-row'>
                        <Text
                            className = 'text-gray-700'
                            style={{
                                fontSize: 14,
                                fontWeight: 500
                            }}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className = 'flex-row border-gray-300 mx-4 py-2'
                style = {{
                    borderBottomWidth: 1.5,
                }}
            >
                <Text
                    className = 'text-gray-700'
                    style={{
                        fontSize: 14,
                        fontWeight: 500
                    }}
                >
                        Group name
                </Text>
            </View>
            <View className = 'form bg-gray-200 mx-4'>
                <TextInput
                    className="border border-gray-300 text-gray-700"
                    multiline={true}
                    numberOfLines={10}
                    style={{ 
                        height:150, 
                        textAlignVertical: 'top',
                        fontSize: 15,
                        fontWeight: '500',
                    }}
                >
                </TextInput>
            </View>
            <View className = 'flex-row mx-4 py-1'>
                <Text
                    className = 'text-gray-600'
                    style={{
                        fontSize: 11.5,
                        fontWeight: 400,
                        textAlign: 'center'
                    }}
                >
                    Use the whiteboard to remember important info, like your landlord's address or emergency contact info. The whiteboard is visible to anyone who joins your group.
                </Text>
            </View>
        </View>
    );
}

export default WhiteboardScreen