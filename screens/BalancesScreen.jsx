import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView} from "react-native";

const BalancesScreen = () => {
    const navigation = useNavigation();
    return(
        <View className = 'flex-1 py-5 bg-white'>
            <View className = 'flex-row px-4 py-3 space-x-8 items-center'>
                <TouchableOpacity className = 'flex-row'
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
                    Balances
                </Text>
            </View>
            <View className ='flex-col px-4 py-4'>
                <View className ='flex-col space-y-5'>
                    <Image
                        source={require('../assets/images/avatar_image.jpg')}
                        style = {{
                            borderRadius: 25,
                            width: 50,
                            height: 50
                        }}
                    >
                    </Image>
                    <Image
                        source={require('../assets/images/avatar_image.jpg')}
                        style = {{
                            borderRadius: 25,
                            width: 50,
                            height: 50
                        }}
                    >
                    </Image>
                </View>
            </View>
        </View>
    );
}
export default BalancesScreen;