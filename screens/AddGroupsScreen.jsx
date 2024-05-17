import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import GroupService from "../services/group";

const AddGroupsScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = () => {
    GroupService.getInstance().addGroup(
      groupName,
      "trip",
      imageUri,
      navigation
    );
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 py-5 bg-white">
      <View
        className="flex-row p-4 space-x-20 items-center border-gray-300"
        style={{
          borderBottomWidth: 1.5,
        }}
      >
        <View className="flex-row space-x-12 items-center">
          <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
            <Image
              source={require("../assets/icons/close_icon.png")}
              style={{
                width: 14,
                height: 14,
              }}
            ></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 400,
            }}
          >
            Create new group
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleAddGroup}
          disabled={groupName === ""}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: groupName === "" ? "#ccc" : "#0B9D7E",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col px-3 py-4">
        <View className="flex-row space-x-4">
          <View className="flex-row">
            <TouchableOpacity
              className="bg-gray-300 border-gray-500"
              style={{
                borderWidth: 1,
                padding: 20,
                borderRadius: 10,
              }}
              onPress={chooseImage}
            >
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require("../assets/icons/cameraPlus_icon.png")
                }
                style={{
                  width: 22,
                  height: 22,
                }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="flex-col">
            <Text
              style={{
                fontSize: 14,
                color: "gray",
              }}
            >
              Group name
            </Text>
            <View className="form">
              <TextInput
                className="px-2 text-gray-700 w-60 h-10"
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#0B9D7E",
                  textAlign: "left",
                }}
                onChangeText={(text) => setGroupName(text)}
              ></TextInput>
            </View>
          </View>
        </View>
        <View className="flex-row mt-4 mb-4">
          <Text
            style={{
              fontSize: 14,
              color: "gray",
            }}
          >
            Type
          </Text>
        </View>
        <View className="flex-row justify-center space-x-3">
          <TouchableOpacity
            className="flex-row items-center border-gray-500 space-x-2"
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons/plane_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
            <Text
              style={{
                fontSize: 15,
                color: "gray",
              }}
            >
              Trip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center border-gray-500 space-x-2"
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons/home_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
            <Text
              style={{
                fontSize: 15,
                color: "gray",
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center border-gray-500 space-x-2"
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("../assets/icons/heart_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
            <Text
              style={{
                fontSize: 15,
                color: "gray",
              }}
            >
              Couple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AddGroupsScreen;
