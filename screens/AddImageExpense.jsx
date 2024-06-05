import AddToolBar from "../components/AddToolBar";
import ExpenseService from "../services/expense";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

const AddImageExpense = (props) => {
  const [imageUri, setImageUri] = useState("data:image/png;base64,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")

    const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  };
  const navigation = useNavigation()
  const handleAddImageExpense = async () => {
      // Alert.alert('Success', 'Image uploaded successfully!');
    // navigation.navigate('AddExpenseScreen', { imageUri });
    navigation.navigate('AddExpenseScreen')
  }
  return (
    <View style={[{ flex: 100, backgroundColor: "white" }]}>
      <View style={{ flex: 7 }}>
        <AddToolBar
          navigation={props.navigation}
          title={"Add image expense"}
          action={"Add"}
          onPress={handleAddImageExpense}
          // isDisabled="false"
        ></AddToolBar>
      </View>
      <View
        style={{ flex: 80, backgroundColor: "white", position: "flex", alignItems: 'center', justifyContent: 'center'}}
      >
        <Image
                source={{ uri: imageUri }}
                style={{ width: "100%", height: "50%", resizeMode: "cover", }}></Image>
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
        onPress={chooseImage}
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
