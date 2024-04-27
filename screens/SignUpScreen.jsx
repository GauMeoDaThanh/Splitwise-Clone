import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AuthenticateService from "../services/authentication";
import { Alert } from 'react-native';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSignUp = () => {
        const authenticateService = new AuthenticateService();
        authenticateService.handleSignUp(email, password);
        Alert.alert(
            'Signup successfully',
            'Your account has been created successfully!',
            [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]
        );
}
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
                        />
                    </View>
                </SafeAreaView>
                <View className ="flex-1 bg-white px-8 pt-8"
                        style = {{borderTopLeftRadius:50, borderTopRightRadius:50}}>
                    <View className="form space-y-2">
                        <Text className = "text-gray-700 ">Name</Text>
                        <TextInput 
                            className = "p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder="Enter Name"
                            onChangeText={setName}

                        />
                        <Text className = "text-gray-700 ">Email Address</Text>
                        <TextInput 
                            className = "p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder="Enter Email"
                            onChangeText={setEmail}
                        />
                        <Text className = "text-gray-700 ">Password</Text>
                        <View className="relative">
                            <TextInput 
                                className = "p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                secureTextEntry={!showPassword}
                                placeholder="Enter Password"
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={toggleShowPassword}
                                            style={{position: 'absolute', top: 10, right: 10}}>
                                <Image source={showPassword ? require('../assets/icons/eye-close_icon.png') : require('../assets/icons/eye-show_icon.png')}
                                        style={{width: 24, height: 24}}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <Text className = "text-gray-700">Phone</Text>
                        <TextInput 
                            className = "p-2 bg-gray-100 text-gray-700 rounded-2xl mb-8"
                            placeholder="Enter Phone"
                        /> */}
                        <TouchableOpacity className = "py-3 rounded-xl" style={{backgroundColor: "#1DC29F"}} onPress={handleSignUp}>
                            <Text className = "font-xl font-bold text-center text-gray-700 ml-4">Sign Up</Text>
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
                        <Text className = "text-gray-500 font-semibold mr-1">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Text className = "font-xl font-bold text-center mb-3" style={{color: "#0B9D7E"}}>
                                Login?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
