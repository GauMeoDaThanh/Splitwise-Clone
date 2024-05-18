import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView} from "react-native";
import { Picker } from '@react-native-picker/picker';

const TotalsScreen = () => {
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState("thisMonth");
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
                    Group spending summary
                </Text>
            </View>
            <View className = 'flex-row mx-4 p-4'>
                <Text
                    className = 'text-gray-800'
                    style={{
                        fontSize: 18,
                        fontWeight: 400
                    }}
                >
                    Group name
                </Text>
            </View>
            <View 
                className = 'w-40 items-center mx-9 my-6'
                style = {{
                    borderBottomWidth: 1,
                    borderColor: 'rgb(209 213 219)',
                }}
            >
                <Picker
                    style = {{  
                        width: 162,
                        height: 40    
                    }} 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item style = {{fontSize:13, color: 'rgb(31 41 55)', fontWeight: 500}} label="THIS MONTH" value="thisMonth" />
                    <Picker.Item style = {{fontSize:13, color: 'rgb(31 41 55)', fontWeight: 500}} label="LAST MONTH" value="lastMonth" />
                    <Picker.Item style = {{fontSize:13, color: 'rgb(31 41 55)', fontWeight: 500}} label="ALL TIME" value="allTime" />
                </Picker>
            </View>
            <View className = 'flex-col mx-4 space-y-4 px-4'>
                <View className = 'flex-col'>
                    <Text
                        className = 'text-gray-700'
                        style={{
                            fontSize: 13,
                            fontWeight: 400
                        }}
                    >
                        TOTAL GROUP SPENDING
                    </Text>
                    <Text
                        className = 'text-gray-800'
                        style={{
                            fontSize: 19,
                            fontWeight: 500
                        }}
                    >
                        200.000vnđ
                    </Text>
                </View>
                <View className = 'flex-col'>
                    <Text
                        className = 'text-gray-700'
                        style={{
                            fontSize: 13,
                            fontWeight: 400
                        }}
                    >
                        TOTAL YOU PAID FOR
                    </Text>
                    <Text
                        className = 'text-gray-800'
                        style={{
                            fontSize: 19,
                            fontWeight: 500
                        }}
                    >
                        400.000vnđ
                    </Text>
                </View>
                <View className = 'flex-col'>
                    <Text
                        className = 'text-gray-700'
                        style={{
                            fontSize: 13,
                            fontWeight: 400
                        }}
                    >
                        YOUR TOTAL SHARE
                    </Text>
                    <Text
                        className = 'text-gray-800'
                        style={{
                            fontSize: 19,
                            fontWeight: 500
                        }}
                    >
                        600.000vnđ
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default TotalsScreen