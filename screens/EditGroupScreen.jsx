import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

const EditGroupsScreen = () => {
    const navigation = useNavigation();
    const [buttons, setButtons] = useState([
        { type: 'Trip', icon: require('../assets/icons/plane_icon.png'), selected: false },
        { type: 'Home', icon: require('../assets/icons/home_icon.png'), selected: false },
        { type: 'Couple', icon: require('../assets/icons/heart_icon.png'), selected: false },
        { type: 'Friend', icon: require('../assets/icons/friend_icon.png'), selected: false },
        { type: 'Other', icon: require('../assets/icons/other_icon.png'), selected: false },
    ]);
    const [selectedTypeText, setSelectedTypeText] = useState('');

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
    };

    const handleTypePress = (selectedType) => {
        setButtons(buttons.map(button =>
            button.type === selectedType
                ? { ...button, selected: !button.selected }
                : { ...button, selected: false }
        ));
        const selectedButton = buttons.find(button => button.type === selectedType);
        setSelectedTypeText(selectedButton?.type || '');
    };

    return (
        <View className='flex-1 py-5 bg-white'>
            <View className='flex-row p-4 space-x-20 items-center border-gray-300'
                style={{
                    borderBottomWidth: 1.5,
                }}
            >
                <View className='flex-row space-x-12 items-center'>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailGroups')}>
                        <Image
                            source={require('../assets/icons/close_icon.png')}
                            style={{
                                width: 14,
                                height: 14
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 19,
                            fontWeight: 400
                        }}
                    >
                        Edit group
                    </Text>
                </View>

                <TouchableOpacity className='flex-row items-center px-16'>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#0B9D7E'
                        }}
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            <View className='flex-col px-3 py-4'>
                <View className='flex-row space-x-4'>
                    <View className='relative items-center'>
                        <Image
                            // source={require('../assets/images/group_image.jpg')}
                            style={{
                                borderWidth: 1,
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                borderColor: 'rgb(107 114 128)'
                            }}
                            className='bg-gray-200'
                        />
                        <TouchableOpacity onPress={chooseImage}>
                            <Image
                                source={require('../assets/icons/cameraPlus_icon.png')}
                                style={{
                                    width: 22,
                                    height: 22,
                                    marginTop: -40
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-col'>
                        <Text
                            style={{
                                fontSize: 14,
                                color: 'rgb(75 85 99)',
                                fontWeight: 500
                            }}
                        >
                            Group name
                        </Text>
                        <View className='form'>
                            <TextInput
                                className="px-2 text-gray-700 w-60 h-10"
                                style={{
                                    borderBottomWidth: 2,
                                    borderColor: '#0B9D7E',
                                    textAlign: 'left'
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View className='flex-row mt-4 mb-4'>
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'gray',
                            fontWeight: 500
                        }}
                    >
                        Type
                    </Text>
                </View>
                <ScrollView horizontal={true}>
                    <View className='flex-row justify-center space-x-3'>
                        {buttons.map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTypePress(button.type)}
                                className='flex-row items-center px-3 py-2 border-gray-500 space-x-2'
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    backgroundColor: button.selected ? '#D3F8E2' : 'white',
                                    borderColor: button.selected ? '#0B9D7E' : 'gray'
                                }}
                            >
                                <Image
                                    source={button.icon}
                                    style={{
                                        width: 18,
                                        height: 18,
                                        tintColor: button.selected ? '#0B9D7E' : 'rgb(75 85 99)'
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: button.selected ? '#0B9D7E' : 'rgb(107 114 128)',
                                        fontWeight: 500
                                    }}
                                >
                                    {button.type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default EditGroupsScreen;
