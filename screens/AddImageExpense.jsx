import AddToolBar from "../components/AddToolBar";
import {
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const AddImageExpense = (props) => {
  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={{ flex: 7 }}>
        <AddToolBar
          navigation={props.navigation}
          title={"Add image expense"}
          action={"Add"}
          // isDisabled="false"
        ></AddToolBar>
      </View>
      <View
        style={{ flex: 80, backgroundColor: "white", position: "relative" }}
      >
        <Image source={require("../assets/icons/account.png")} style ={{width: "100%", height: "100%", resizeMode: "contain",}}></Image>
      </View>
      <TouchableOpacity
        style={{
            position: "absolute",
            bottom: 20,
            right: 20, 
            width: 60,
            height: 60,
            backgroundColor: "red",
            borderRadius: 30, 
            alignItems: "center",
            justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/icons/camera.png")}
          style={{ width: 60, height: 60,  borderRadius: 30, borderColor: '#009966' }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddImageExpense;
