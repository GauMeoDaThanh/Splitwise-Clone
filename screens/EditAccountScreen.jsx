import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import ChangePassword from "../components/ChangePassword";
import ChangeName from "../components/ChangeName";
const EditAccountScreen = () => {
    const navigation = useNavigation();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeName, setShowChangeName] = useState(false);

    const handleEditNameClick = () => {
        setShowChangeName(true);
    };

    const handleEditPasswordClick = () => {
        setShowChangePassword(true);
    };

    const handleCancelEdit = () => {
        setShowChangeName(false);
        setShowChangePassword(false);
    };

    const handleSaveChanges = () => {
        setShowChangeName(false);
        setShowChangePassword(false);
    };
    return (
        <View className="flex-1 bg-white p-1 py-5">
        <View className="flex-row ml-1 mr-1 space-x-4 items-center border-b-2 border-gray-600 py-2">
            <TouchableOpacity onPress={()=>navigation.navigate('Account')}>
            <Image
                source={require('../assets/icons/back_icon.png')}
                style={{ width: 20, height: 20 }}
            />
            </TouchableOpacity>
            <Text className='text-xl'>Account settings</Text>
        </View>
        <ScrollView>
            <View className="flex-1 p-3">
                <View className="flex-col">
                    <Text>Full name</Text>
                    {showChangeName ? (
                            <ChangeName onCancelEdit={handleCancelEdit}></ChangeName>
                        ) : (
                            <View className="flex-row space-x-2 items-center mb-3">
                                <Text className='font-bold'>Huỳnh Tứ</Text>
                                <TouchableOpacity className='flex-row items-center' onPress={handleEditNameClick}>
                                    <Image
                                        source={require('../assets/icons/edit_icon.png')}
                                        style={{ width: 15, height: 15, tintColor: "rgb(59 130 246)" }}
                                    />
                                    <Text className='text-blue-500'>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </View>
                <View className="flex-col">
                    <Text>Email Address</Text>
                    <View className="flex-row space-x-2 items-center mb-3">
                    <Text className='font-bold'>huynhtu012023@gmail.com</Text>
                    </View>
                </View>
                <View className="flex-col">
                    <Text>Password</Text>
                    {showChangePassword ? (
                            <ChangePassword onCancelEdit={handleCancelEdit}></ChangePassword>
                        ) : (
                            <View className="flex-row space-x-2 items-center mb-3">
                                <Text className='font-bold'>{'*'.repeat('Huỳnh Tứ'.length)}</Text>
                                <TouchableOpacity className='flex-row items-center' onPress={handleEditPasswordClick}>
                                    <Image
                                        source={require('../assets/icons/edit_icon.png')}
                                        style={{ width: 15, height: 15, tintColor: "rgb(59 130 246)" }}
                                    />
                                    <Text className='text-blue-500'>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    
                </View>
                <View className="flex-col mb-3">
                    <Text>Time zone</Text>
                    <Text className='font-bold'>(GMT+07:00) Hanoi</Text>
                </View>
                <View className="flex-col mb-3">
                    <Text>Default currency</Text>
                    <Text className='font-bold'>VNĐ</Text>
                </View>
                <View className="flex-row mb-3">
                    <TouchableOpacity className='flex-row items-center border p-2 rounded-xl bg-orange-200' onPress={handleSaveChanges}>
                        <Text>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </View>
    );
};

export default EditAccountScreen;
