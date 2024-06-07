import { Text, TouchableOpacity, StyleSheet, View, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DetailsToolBar = (props) => {
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: "#EEEEEE", borderBottomWidth: 1 },
      ]}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          source={require("../assets/icons/back.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      <Text style={{ fontWeight: "500", fontSize: 16, marginStart: 50 }}>Details</Text>
      <View style={{ flexDirection: 'row'}}>
       {/* <TouchableOpacity>
       <Image
           source={require("../assets/icons/edit.png")}
          style={{ width: 20, height: 20, marginHorizontal: 5 }}
        />
        </TouchableOpacity> */}
         <TouchableOpacity
          onPress={props.onPress}
        >
        <Image
          source={require("../assets/icons/delete.png")}
          style={{ width: 20, height: 20, marginHorizontal: 10, }}
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
