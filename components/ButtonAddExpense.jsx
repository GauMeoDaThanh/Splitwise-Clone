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
    <TouchableOpacity onPress={handleAddExpensePress} style={[styles.addButtonContainer,{ flexDirection: "row", alignItems: "center", justifyContent: 'center', padding: 10, backgroundColor:'#00CC99', width: '44%', borderRadius: 30}]}>
      <Image
        source={require("../assets/icons/bill5.png")}
        style={{ width: 34, height: 34 }}
      ></Image>
      <Text style={{paddingHorizontal: 10, color: 'white', fontSize: 16, fontWeight: 400}}>Add expense</Text>
    </TouchableOpacity>
  );
};
export default ButtonAddExpense;
const styles = StyleSheet.create({
  container: {
    
  },
  addButtonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 1,
  },
});