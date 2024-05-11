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
import FriendsScreen from '../screens/tabs/FriendsScreen';
import GroupsScreen from '../screens/tabs/GroupsScreen';
import ActivityScreen from '../screens/tabs/ActivityScreen';

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
                name="Friends"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Friends'
            screenOptions={{
                tabBarStyle:{
                    position:'absolute',
                    borderRadius: 15,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    height: 50,
                    elevation: 10,
                    padding: 4
                },
                tabBarLabelStyle: {
                    marginBottom: 3,
                    fontWeight: 'bold'
                },
                tabBarInactiveTintColor: 'gray', 
                tabBarActiveTintColor: '#0B9D7E',
            }}
        >
            <Tab.Screen
                name='Groups'
                component={GroupsScreen}
                options={{
                    title: 'Groups',
                    tabBarIcon: ({ focused }) => {
                        return <Image source={require('../assets/icons/groups_icon.png')} style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray' }} />;
                    }
                }}
            />
            <Tab.Screen
                name='Friends'
                component={FriendsScreen}
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ focused }) => {
                        return <Image source={require('../assets/icons/friend_icon.png')} style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray' }} />;
                    }
                }}
            />
            <Tab.Screen
                name='Activity'
                component={ActivityScreen}
                options={{
                    title: 'Activity',
                    tabBarIcon: ({ focused }) => {
                        return <Image source={require('../assets/icons/activity_icon.png')} style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray'}} />;
                    }
                }}
            />
            <Tab.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    title: 'Account',
                    tabBarIcon: ({ focused }) => {
                        return <Image source={require('../assets/icons/account_icon.png')} style={{ width: 25, height: 25, borderRadius:25}} />;
                    }
                }}
            />
        </Tab.Navigator>
    );
};


export default AppNavigation;

