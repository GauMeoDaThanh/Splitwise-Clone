import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonAddExpense from "../components/ButtonAddExpense";

const DetailsGroupsScreen = () => {
    const navigation = useNavigation();
    return(
        <View className = 'flex-1 bg-white'
            // style ={{
            //     width: '100%',
            //     height: '100%'
            // }}
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
                        top: -90,
                    }}
                >
                    <TouchableOpacity className = 'flex-row justify-items-start'
                           onPress={()=>navigation.navigate('Groups')} 
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
                        <TouchableOpacity className = 'flex-row justify-items-end'>
                            <Image
                                source={require('../assets/icons/setting_icon.png')}  
                                style = {{
                                    width: 20,
                                    height: 20
                                }} 
                            >
                            </Image>
                        </TouchableOpacity>
                </View>
                <View className = 'flex-col space-y-1'
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
            <View className = 'flex-row justify-center space-x-3'
                style = {{
                    top: -35
                }}
            >
                <TouchableOpacity 
                    className = 'flex-row border border-gray-400 rounded-md px-4 py-1.5'
                    style = {{
                        borderBottomWidth: 3
                    }}
                    onPress={()=>navigation.navigate('Balances')}
                >
                    <Text
                        className='text-gray-700' 
                        style = {{
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                        Balances
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className = 'flex-row border border-gray-400 rounded-md px-4 py-1.5'
                    style = {{
                        borderBottomWidth: 3
                    }}
                    onPress={() => navigation.navigate('Whiteboard')}
                >
                    <Text
                        className='text-gray-700' 
                        style = {{
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                        Whiteboard
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    className = 'flex-row border border-gray-400 rounded-md px-4 py-1.5'
                    style = {{
                        borderBottomWidth: 3
                    }}
                    onPress={() => navigation.navigate('Totals')}
                >
                    <Text
                        className='text-gray-700' 
                        style = {{
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                       Totals
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Viết code vô Flastlist */}
            {/* <View className = 'flex-col space-y-6 px-1'>
                <FlatList>
                    <View className = 'flex-col px-2 space-y-3'>
                        <Text className = 'text-gray-700 px-1'
                            style = {{
                                fontSize: 13,
                                fontWeight: 500
                            }}
                        >
                            Tháng 5 2024
                        </Text>
                        <View className = 'flex-row'>
                            <TouchableOpacity flex-row space-x-5 px-1 items-center>
                                <View className = 'flex-col items-center'>
                                    <Text 
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Th5
                                    </Text>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 17,
                                            fontWeight: 500
                                        }}
                                    >
                                        11
                                    </Text>
                                </View>
                                <View className = 'flex-row p-2 items-center border border-gray-400 bg-gray-200'>
                                    <Image
                                        source={require('../assets/icons/icon_bill.png')}
                                        style = {{
                                            width: 22,
                                            height: 22
                                        }} 
                                    >
                                    </Image>
                                </View>
                                <View className='flex-col items-start'>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 16,
                                            fontWeight: 500
                                        }}
                                    >
                                        bill share1
                                    </Text>
                                    <Text
                                        className = 'text-gray-500'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Nhung paid 200.000vnđ
                                    </Text>
                                </View>
                                <View className='flex-col items-end'>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 12,
                                            fontWeight: 500
                                        }}
                                    >
                                        you borrowed
                                    </Text>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: 500
                                        }}
                                    >
                                    200.000vnđ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </FlatList> 
            </View> */}
            
                <View className = 'flex-col space-y-6 px-1'>
                    <View className = 'flex-col px-2 space-y-3'>
                        <Text className = 'text-gray-700 px-1'
                            style = {{
                                fontSize: 13,
                                fontWeight: 500
                            }}
                        >
                            Tháng 5 2024
                        </Text>
                        <View className = 'flex-row '>
                            <TouchableOpacity className = 'flex-row space-x-5 px-1 items-center'>
                                <View className = 'flex-col items-center'>
                                    <Text 
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Th5
                                    </Text>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 17,
                                            fontWeight: 500
                                        }}
                                    >
                                        11
                                    </Text>
                                </View>
                                <View className = 'flex-row p-2 items-center border border-gray-400 bg-gray-200'>
                                    <Image
                                        source={require('../assets/icons/icon_bill.png')}
                                        style = {{
                                            width: 22,
                                            height: 22
                                        }} 
                                    >
                                    </Image>
                                </View>
                                <View className='flex-col items-start'>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 16,
                                            fontWeight: 500
                                        }}
                                    >
                                        bill share1
                                    </Text>
                                    <Text
                                        className = 'text-gray-500'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Nhung paid 200.000vnđ
                                    </Text>
                                </View>
                                <View className='flex-col items-end'>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 12,
                                            fontWeight: 500
                                        }}
                                    >
                                        you borrowed
                                    </Text>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: 500
                                        }}
                                    >
                                    200.000vnđ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className = 'flex-col px-2 space-y-3'>
                        <Text className = 'text-gray-700 px-1'
                            style = {{
                                fontSize: 13,
                                fontWeight: 500
                            }}
                        >
                            Tháng 6 2024
                        </Text>
                        <View className = 'flex-row'>
                            <TouchableOpacity className = 'flex-row space-x-5 px-1 items-center'>
                                <View className = 'flex-col items-center'>
                                    <Text 
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Th6
                                    </Text>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 17,
                                            fontWeight: 500
                                        }}
                                    >
                                        15
                                    </Text>
                                </View>
                                <View className = 'flex-row p-2 items-center'>
                                    <Image
                                        source={require('../assets/icons/money_icon.png')}
                                        style = {{
                                            width: 23,
                                            height: 23
                                        }} 
                                    >
                                    </Image>
                                </View>
                                <Text
                                    className = 'text-gray-600'
                                        style = {{
                                            fontSize: 12,
                                            fontWeight: 500
                                        }}
                                    >
                                        Dat V. paid Nhung 200.000vnđ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            
            <View className='flex-row'
                    style={{
                        position: 'absolute',
                        top: 530,
                        left: 190
                    }}
                >
                    <ButtonAddExpense />
            </View>
        </View>
    );
};
export default DetailsGroupsScreen;