import { useNavigation } from "@react-navigation/native";
import { UIImagePickerPreferredAssetRepresentationMode } from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  TextInput,
} from "react-native";
import UserService from "../services/user";
import AuthenticateService from "../services/authentication";

const EditAccountScreen = ({ route }) => {
  const navigation = useNavigation();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [editName, setEditName] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(route.params.userData);
  }, []);

  const handleEditNameClick = () => {
    setShowChangeName(true);
  };

  const handleEditPasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleSaveChanges = () => {
    setShowChangeName(false);
    setShowChangePassword(false);

    if (showChangeName && editName) {
      UserService.getInstance().setUsername(editName);
      setUserData({ ...userData, username: editName });
    }
    if (showChangePassword && oldPassword && newPassword) {
      AuthenticateService.getInstance().updatePassword(
        oldPassword,
        newPassword
      );
    }
  };
  return (
    <View className="flex-1 bg-white p-1 py-5">
      <View className="flex-row ml-1 mr-1 space-x-4 items-center border-b-2 border-gray-600 py-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Account", { userData })}
        >
          <Image
            source={require("../assets/icons/back_icon.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Text className="text-xl">Account settings</Text>
      </View>
      <ScrollView>
        <View className="flex-1 p-3">
          <View className="flex-col">
            <Text>Full name</Text>
            {showChangeName ? (
              <View className="flex p-2">
                <TextInput
                  className="p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
                  placeholder="Full Name"
                  onChangeText={(value) => setEditName(value)}
                ></TextInput>
              </View>
            ) : (
              <View className="flex-row space-x-2 items-center mb-3">
                <Text className="font-bold">{userData?.username}</Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={handleEditNameClick}
                >
                  <Image
                    source={require("../assets/icons/edit_icon.png")}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: "rgb(59 130 246)",
                    }}
                  />
                  <Text className="text-blue-500">Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="flex-col">
            <Text>Email Address</Text>
            <View className="flex-row space-x-2 items-center mb-3">
              <Text className="font-bold">{userData?.email}</Text>
            </View>
          </View>
          <View className="flex-col">
            <Text>Password</Text>
            {showChangePassword ? (
              <View className="form space-y-1 p-2">
                <TextInput
                  className="p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
                  placeholder="Your current password"
                  onChangeText={(value) => setOldPassword(value)}
                  secureTextEntry={true}
                ></TextInput>
                <TextInput
                  className="p-1 bg-gray-100 text-gray-700 rounded-xl mb-1 border"
                  placeholder="Create a new password"
                  onChangeText={(value) => setNewPassword(value)}
                  secureTextEntry={true}
                ></TextInput>
              </View>
            ) : (
              <View className="flex-row space-x-2 items-center mb-3">
                <Text className="font-bold">
                  {"*".repeat("Huỳnh Tứ".length)}
                </Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={handleEditPasswordClick}
                >
                  <Image
                    source={require("../assets/icons/edit_icon.png")}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: "rgb(59 130 246)",
                    }}
                  />
                  <Text className="text-blue-500">Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="flex-col mb-3">
            <Text>Time zone</Text>
            <Text className="font-bold">(GMT+07:00) Hanoi</Text>
          </View>
          <View className="flex-col mb-3">
            <Text>Default currency</Text>
            <Text className="font-bold">VNĐ</Text>
          </View>
          <View className="flex-row mb-3">
            <TouchableOpacity
              className="flex-row items-center border p-2 rounded-xl bg-orange-200"
              onPress={handleSaveChanges}
            >
              <Text>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAccountScreen;
