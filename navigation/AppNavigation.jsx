import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AccountScreen from "../screens/tabs/AccountScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import FriendsScreen from "../screens/tabs/FriendsScreen";
import GroupsScreen from "../screens/tabs/GroupsScreen";
import ActivityScreen from "../screens/tabs/ActivityScreen";
import EditAccountScreen from "../screens/EditAccountScreen";
import UserService from "../services/user";
import AddFriendScreen from "../screens/AddFriendScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import AddGroupsScreen from "../screens/AddGroupsScreen";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFriendScreen"
          component={AddFriendScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddExpenseScreen"
          component={AddExpenseScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddGroups"
          component={AddGroupsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const TabNavigator = () => {
  const [imageUri, setImageUri] = React.useState(null);
  React.useEffect(() => {
    const getUserAvatar = async () => {
      const avatar = await UserService.getInstance().getAvatar();
      setImageUri(avatar);
    };
    getUserAvatar();
  }, []);

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
                elevation: 10
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
                    return(
                        <View style = {{
                            alignItems: 'center',
                            borderTopColor: focused ?  '#0B9D7E': 'white',
                            borderTopWidth: 3,
                            padding: 3

                        }}>
                            <Image 
                                source={require('../assets/icons/groups_icon.png')} 
                                style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray' }} 
                            />
                        </View> 
                    ); 
                },
                headerShown: false
            }}
        />
        <Tab.Screen
            name='Friends'
            component={FriendsScreen}
            options={{
                title: 'Friends',
                tabBarIcon: ({ focused }) => {
                    return(
                        <View style = {{
                            alignItems: 'center',
                            borderTopColor: focused ?  '#0B9D7E': 'white',
                            borderTopWidth: 3,  
                            padding: 3

                        }}>
                            <Image 
                                source={require('../assets/icons/friend_icon.png')} 
                                style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray' }} 
                            />
                        </View> 
                    );
                },
                headerShown: false
            }}
        />
        <Tab.Screen
            name='Activity'
            component={ActivityScreen}
            options={{
                title: 'Activity',
                tabBarIcon: ({ focused }) => {
                    return(
                        <View style = {{
                            alignItems: 'center',
                            borderTopColor: focused ?  '#0B9D7E': 'white',
                            borderTopWidth: 3,
                            padding: 3

                        }}>
                            <Image 
                                source={require('../assets/icons/activity_icon.png')} 
                                style={{ width: 25, height: 25, tintColor: focused ?  '#0B9D7E': 'gray' }} 
                            />
                        </View>  
                    );
                    
                },
                headerShown: false
            }}
        />
        <Tab.Screen
            name='Account'
            component={AccountScreen}
            options={{
                title: 'Account',
                tabBarIcon: ({ focused }) => {
                    return(
                        <View style = {{
                            alignItems: 'center',
                            borderTopColor: focused ?  '#0B9D7E': 'white',
                            borderTopWidth: 3,
                            padding: 3

                        }}>
                            <Image source={require('../assets/icons/account_icon.png')} 
                                    style={{ width: 25, height: 25, borderRadius:25}} 
                            />
                        </View> 
                        
                    ); 
                },
                headerShown: false
            }}
        />
    </Tab.Navigator>
  );
};

export default AppNavigation;

