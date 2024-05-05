import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; 
import AccountScreen from '../screens/tabs/AccountScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {Text, TextInput, SafeAreaView, View,TouchableOpacity, Image, ScrollView} from "react-native";

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    title: 'Account',
                    tabBarIcon: ({focused}) =>{
                        <Image source={require('../assets/icons/account.png')} style={{width:30, height:30}}></Image>
                    }
                }}
            >

            </Tab.Screen>
        </Tab.Navigator>
    ); 
}

export default AppNavigation;

