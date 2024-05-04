import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();
import AppBar from '../components/AppBar';
import AddFriendScreen from '../screens/AddFriendScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

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
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} options={{ headerShown: false,}}/>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} options={{ headerShown: false,}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
