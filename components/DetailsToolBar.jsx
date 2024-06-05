import { Text, TouchableOpacity, StyleSheet, View, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DetailsToolBar = (props) => {
  const navigation = useNavigation();
    const handleDelete = () => {
        Alert.alert(
          "Delete Expense",
          "Are you sure you want to delete this expense?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      };
    
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: "#EEEEEE", borderBottomWidth: 1 },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("DetailGroups")}>
        <Image
          source={require("../assets/icons/back.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "500", fontSize: 16, marginStart: 50 }}>Details</Text>
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleDelete}>
        <Image
          source={require("../assets/icons/delete.png")}
          style={{ width: 20, height: 20, marginHorizontal: 10, }}
        />
        </TouchableOpacity>
       <TouchableOpacity>
       <Image
           source={require("../assets/icons/edit.png")}
          style={{ width: 20, height: 20, marginHorizontal: 5 }}
        />
       </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailsToolBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
  },
});
