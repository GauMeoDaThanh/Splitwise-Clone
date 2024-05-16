import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppBar from '../components/AppBar';
import AddFriendScreen from '../screens/AddFriendScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddImageExpense from '../screens/AddImageExpense';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FriendsScreen">       
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} options={{ headerShown: false,}}/>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} options={{ headerShown: false,}}/>
        <Stack.Screen name="AddImageExpense" component={AddImageExpense} options={{ headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
