import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text, StyleSheet
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const ButtonAddExpense = (props) => {
  const navigation = useNavigation();
  const handleAddExpensePress = () => {
    navigation.navigate('AddExpenseScreen');
  };
  return (
    <TouchableOpacity 
      onPress={handleAddExpensePress}
      className = 'flex-row items-center space-x-2 px-5 py-1.5 rounded-2xl'
      style = {{
        backgroundColor: '#0B9D7E',
        elevation: 10
      }}
    >
      <Image
        source={require("../assets/icons/icon_bill.png")}
        style={{ 
          width: 25, 
          height: 25,
          tintColor: 'white'
        }}
      ></Image>
      <Text className = 'text-white font-semibold'>Add expense</Text>
    </TouchableOpacity>
  );
};
export default ButtonAddExpense;
