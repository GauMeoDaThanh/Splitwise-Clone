import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonAddExpense from "../components/ButtonAddExpense";

const DetailsGroupsScreen = () => {
    const navigation = useNavigation();
    return(
        <View className = 'flex-row bg-white'
            style ={{
                width: '100%',
                height: '100%'
            }}
        >
            <View className = 'relative'>
                <SafeAreaView className = 'flex-row'
                      style ={{
                        width: '100%',
                        height: 120
                    }}
                >
                    <Image
                        source={require('../assets/images/background.png')}
                        style ={{
                            width: '100%',
                            height: '100%'
                        }}
                        resizeMode="cover"
                    >
                    </Image>
                </SafeAreaView>
                <View className = 'flex-row px-4 space-x-72'
                    style ={{
                        top: -80,
                    }}
                >
                    <TouchableOpacity className = 'flex-row justify-items-start'
                           onPress={()=>navigation.navigate('Groups')} 
                    >
                        <Image
                            source={require('../assets/icons/back_icon.png')}  
                            style = {{
                                width: 20,
                                height: 20,
                                tintColor: 'white'
                            }} 
                            
                        >
                        </Image>
                    </TouchableOpacity>
                        <TouchableOpacity className = 'flex-row justify-items-end'>
                            <Image
                                source={require('../assets/icons/setting_icon.png')}  
                                style = {{
                                    width: 20,
                                    height: 20,
                                    tintColor: 'white'
                                }} 
                            >
                            </Image>
                        </TouchableOpacity>
                </View>
                <View className = 'flex-col space-y-2'
                        style ={{
                            top: -60,
                            left: 50
                        }}
                    >
                        <Image
                            source={require('../assets/images/avatar_image.jpg')}
                            style = {{
                                borderRadius: 15,
                                borderColor: 'white',
                                borderWidth: 3,
                                marginBottom: 5,
                                width: 80,
                                height: 80
                            }}
                        >
                        </Image>
                        <Text
                            style={{
                                color: 'rgb(75 85 99)',
                                fontWeight: 500,
                                fontSize: 17
                            }}
                        >
                            Group name
                        </Text>
                        <View className = 'flex-row space-x-1'>
                            <Text
                                className = 'text-gray-600'
                            >
                                Chau N. owes you
                            </Text>
                            <Text
                                style={{
                                    color: '#0B9D7E',
                                    fontWeight: 400
                                }}
                            >
                                3.000.000vnđ
                            </Text>
                        </View>
                    </View>
            </View>
            <View className = 'flex-row justify-center'>
                <TouchableOpacity 
                    className = 'flex-row p-2 border-gray-400 rounded-md'
                >
                    <Text
                        className='text-gray-600' 
                        style = {{
                            fontSize: 12
                        }}
                    >
                        Balances
                    </Text>
                </TouchableOpacity>
            </View>
            <View className='flex-row'
                    style={{
                        position: 'absolute',
                        top: 450,
                        left: 190
                    }}
                >
                    <ButtonAddExpense />
         
                </View>
        </View>
    );
};
export default DetailsGroupsScreen;