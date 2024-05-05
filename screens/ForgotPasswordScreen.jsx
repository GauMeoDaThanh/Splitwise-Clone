import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { Text, TextInput, SafeAreaView, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AuthenticateService from "../services/authentication";
authenticateService = AuthenticateService.getInstance();
const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const sendPasswordResetEmail = async() => {
         console.log("Email", email)
         authenticateService.handleSendPasswordReset(email);
     };
    return (
        <ScrollView className="bg-white">
            <View
                className="flex-1 bg-white"
                style={{ backgroundColor: "#ACE4D6" }}
            >
                <SafeAreaView className="flex-1">
                    <View className="flex-row justify-center">
                        <Image
                            source={require("../assets/images/Splitwise_logo.png")}
                            style={{
                                width: 210,
                                height: 210,
                                backgroundColor: "#ACE4D6",
                            }}
                            resizeMode="cover"
                        ></Image>
                    </View>
                </SafeAreaView>
                <View
                    className="flex-1 bg-white px-8 pt-8"
                    style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                    }}
                >
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ">Email Address</Text>
                        <TextInput
                            className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder="Enter Email"
                            onChangeText={setEmail}
                        ></TextInput>
                        <TouchableOpacity
                            className="py-3 rounded-xl"
                            style={{ backgroundColor: "#1DC29F" }}
                            onPress={sendPasswordResetEmail}
                        >
                            <Text className="font-xl font-bold text-center text-gray-700 ml-4">
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mt-7">
                        <Text className="text-gray-500 font-semibold mr-1 mb-3">
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text
                                className="font-xl font-bold text-center"
                                style={{ color: "#0B9D7E" }}
                            >
                                Login?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
export default ForgotPasswordScreen;

