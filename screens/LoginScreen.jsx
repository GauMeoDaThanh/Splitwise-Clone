import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import {Text, TextInput, SafeAreaView, View,TouchableOpacity, Image, ScrollView} from "react-native";
const LoginScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(
        <ScrollView>
            <View className ="flex-1 bg-white" style={{backgroundColor: "#ACE4D6"}}>
                <SafeAreaView className = "flex">
                    <View className = "flex-row justify-center">
                        <Image source={require('../assets/images/Splitwise_logo.png')}
                                style={{width: 210, height: 210,backgroundColor: "#ACE4D6"}} 
                                resizeMode="cover"
                        ></Image>
                    </View>
                </SafeAreaView>
                <View className ="flex-1 bg-white px-8 pt-8"
                        style = {{borderTopLeftRadius:50, borderTopRightRadius:50}}>
                    <View className="form space-y-2">
                        <Text className = "text-gray-700 ">Email Address</Text>
                        <TextInput 
                            className = "p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder="Enter Email"
                        >
                        </TextInput>
                        <Text className = "text-gray-700 ">Password</Text>
                        <View className="relative">
                            <TextInput 
                                className = "p-2 bg-gray-100 text-gray-700 rounded-2xl"
                                secureTextEntry={!showPassword}
                                placeholder="Enter Password"
                            />
                            <TouchableOpacity onPress={toggleShowPassword}
                                            style={{position: 'absolute', top: 10, right: 10}}>
                                <Image source={showPassword ? require('../assets/icons/eye-close_icon.png') : require('../assets/icons/eye-show_icon.png')}
                                        style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            className = "flex items-end mb-5"
                            onPress={()=>navigation.navigate("ForgotPassword")}
                        >
                            <Text className = "text-gray-700 ml-4">Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className = "py-3 rounded-xl" style={{backgroundColor: "#1DC29F"}}
                            onPress={()=>navigation.navigate('Account')}
                        >
                            <Text className = "font-xl font-bold text-center text-gray-700 ml-4">Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl text-gray-700 font-bold text-center py-5">
                        Or
                    </Text>
                    <View className = "flex-row justify-center space-x-2">
                        <TouchableOpacity className = "p-2 bg-gray-100 rounded-2xl mr-6">
                            <Image source={require('../assets/icons/google_icon.png')}
                                style={{width: 30, height: 30}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className = "p-2 bg-gray-100 rounded-2xl mr-6">
                            <Image source={require('../assets/icons/apple_icon.png')}
                                style={{width: 30, height: 30}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className = "p-2 bg-gray-100 rounded-2xl ">
                            <Image source={require('../assets/icons/facebook_icon.png')}
                                style={{width: 30, height: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className = "flex-row justify-center mt-7">
                        <Text className = "text-gray-500 font-semibold mr-1 mb-3"> Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                                <Text className = "font-xl font-bold text-center"
                                style={{color: "#0B9D7E"}}
                            >Sign Up?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
       
    );
};
export default LoginScreen;

