import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, View,TouchableOpacity, Image, ScrollView, FlatList} from "react-native";
import CheckBox from 'react-native-check-box';
const ListFriendsScreen = () => {
    const navigation = useNavigation();
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    return(
        <View className = 'flex-1 bg-white py-5 space-y-2'>
            <View className = 'flex-row px-4 py-2 space-x-8 items-center mb-2'>
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
                    Add group members
                </Text>
                <View className = 'flex-row px-9'>
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
            <View className = 'relative px-4 border-b border-gray-300'>
                <Image
                    source={require('../assets/icons/search_icon.png')}  
                    style = {{
                        width: 15,
                        height: 15,
                        left: 10,
                        zIndex: 1,
                    }}   
                > 
                </Image>
                <TextInput 
                    className ='border border-gray-300 rounded-md px-8 bg-gray-100'
                    style={{
                        top: -24,
                        height: 32
                    }}
                >
                </TextInput>
            </View>
            <View className = 'flex-row pb-2 px-4 border-b border-gray-300'>
                <TouchableOpacity 
                    className='flex-row items-center space-x-4 py-1'
                    onPress={() => navigation.navigate('AddMember')}
                >
                    <Image
                        source={require('../assets/icons/addFriends_icon.png')}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    >
                    </Image>
                    <Text 
                        style={{
                            color: 'rgb(55 65 81)',
                            fontWeight:'bold'
                        }}
                    >
                        Add a new contact to Splitwise
                    </Text>
                </TouchableOpacity>
            </View>
            <View className = 'flex-1 mx-4 pt-3 space-x-2'>
                <Text 
                    style={{
                        color: 'rgb(55 65 81)',
                        fontWeight:'bold',
                        fontSize: 13
                    }}
                >
                    List Friend
                </Text>
                {/* <FlatList></FlatList> */}
                <View className ='flex-row py-3 items-center space-x-4 border-b border-gray-300'>
                    <View className = 'flex-row '>
                        <CheckBox
                            isChecked={isChecked1}
                            onClick={() => setIsChecked1(!isChecked1)}
                            checkBoxColor="#0B9D7E"
                            style = {{
                                width: 20,
                                height: 20,
                                marginRight: 20
                            }}
                        ></CheckBox>
                    </View>
                    <Image
                        source={require('../assets/images/avatar_image.jpg')}
                        style = {{
                            borderRadius: 25,
                            width: 50,
                            height: 50
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
                            Huỳnh Tứ
                        </Text>
                </View>
                <View className ='flex-row py-4 items-center space-x-4'>
                    <View className = 'flex-row '>
                            <CheckBox
                                isChecked={isChecked2}
                                onClick={() => setIsChecked2(!isChecked2)}
                                checkBoxColor="#0B9D7E"
                                style = {{
                                    width: 20,
                                    height: 20,
                                    marginRight: 20
                                }}
                            ></CheckBox>
                    </View>
                    <Image
                        source={require('../assets/images/Splitwise_logo.png')}
                        style = {{
                            borderRadius: 25,
                            width: 50,
                            height: 50
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
                            Trần Văn Đạt
                        </Text>
                </View>
            </View>
        </View>
    );
}
export default ListFriendsScreen;