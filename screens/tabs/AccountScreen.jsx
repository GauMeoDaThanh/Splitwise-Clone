import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, SafeAreaView, View,TouchableOpacity, Image, ScrollView} from "react-native";
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera } from 'react-native-image-picker';
let launchImageLibrary = _launchImageLibrary;

const AccountScreen = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const openImagePicker = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
        launchImageLibrary(options, handleResponse);
      };
      
  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };
    return(
        <ScrollView className =" bg-white">
            <View className ="flex-1 bg-white py-5" >
                <View className = 'flex-1 py-5 px-5'>
                    <Text className = 'font-bold text-3xl'>Account</Text>
                </View>
                <View className='flex-row justify-center space-x-5'>
                    <View className='relative items-center'>
                        <Image source={
                            require('../../assets/images/avatar_image.jpg')}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius:50
                            }}
                            ></Image>
                        <TouchableOpacity onPress={openImagePicker} >
                            <Image 
                                source={require('../../assets/icons/camera_icon.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginTop: -22,
                                    opacity: 0.5
                                }}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View className = 'flex-col justify-center'>
                        <Text className = 'font-bold text-xl'>Tứ Huỳnh</Text>
                        <Text>huynhtu012023@gmail.com</Text>
                    </View>
                    <View className = 'flex-col justify-center'>
                        <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
                            <Image 
                                source={require('../../assets/icons/edit_icon.png')}
                                    style={{
                                        width: 22,
                                        height: 22
                                }}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row justify-center border-b-2 border-gray-500 mt-5 ml-5 mr-5">
                </View>
                <View className='flex-row mt-5'>
                    <TouchableOpacity className='flex-row ml-5 space-x-2' onPress={() => navigation.navigate('Login')}>
                        <Image 
                            source={require('../../assets/icons/logout_icon.png')}
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: 'rgb(220 38 38)'
                                }}
                        ></Image>
                        <Text className='text-red-600'>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
export default AccountScreen;

