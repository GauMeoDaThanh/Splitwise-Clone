import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import AppBar from "../../components/AppBar";
import AddToolBar from "../../components/AddToolBar";
import ButtonAddExpense from "../../components/ButtonAddExpense";
import GroupService from "../../services/group";

const GroupsScreen = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    GroupService.getInstance().listenToGroupList((groups) => {
      setGroups(groups);
    });
  }, []);

  return (
    <View className="flex-1 py-5 bg-white">
      <View
        className="flex-row border-gray-300"
        style={{
          borderBottomWidth: 1.5,
        }}
      >
        <AppBar></AppBar>
      </View>
      <View className="flex-cols px-3">
        <View className="flex-row space-x-40">
          <View className="flex-col py-4">
            <Text className="font-bold text-xl">Groups owe you</Text>
            <Text
              className="font-bold"
              style={{
                color: "#0B9D7E",
                fontSize: 17,
              }}
            >
              3.500.00vnđ
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/icons/filter_icon.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "#0B9D7E",
              }}
            ></Image>
          </View>
        </View>
        <View className="flex-row mb-3">
          <Text
            style={{
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            Showing only groups that owe you
          </Text>
        </View>
        <View className="flex-row" style={{ height: "75%" }}>
          {/* Viết code để lấy item bỏ vào FlatList */}
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => console.log(item.id)}>
                  <View className="flex-row space-x-4 items-center mb-3">
                    <Image
                      source={
                        item.imageuri
                          ? { uri: item.imageuri }
                          : require("../../assets/images/avatar_image.jpg")
                      }
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 10,
                      }}
                    ></Image>
                    <View className="flex-col py-3">
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "#0B9D7E",
                          fontWeight: 500,
                        }}
                      >
                        you are owed 3.000.000vnđ
                      </Text>
                      <View className="flex-row">
                        <Text>Đạt owes you </Text>
                        <Text
                          style={{
                            color: "#0B9D7E",
                            fontWeight: "500",
                          }}
                        >
                          200.00vnđ
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => (
              <View className="flex-row justify-center">
                <TouchableOpacity
                  className="flex-row items-center space-x-2 border py-1 px-3 rounded-md mt-3"
                  style={{
                    borderColor: "#0B9D7E",
                  }}
                  onPress={() => navigation.navigate("AddGroups")}
                >
                  <Image
                    source={require("../../assets/icons/addGroups_icon.png")}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: "#0B9D7E",
                    }}
                  ></Image>
                  <Text
                    style={{
                      color: "#0B9D7E",
                      fontWeight: "bold",
                    }}
                  >
                    Start a new group
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </View>

        <View
          className="flex-row"
          style={{
            position: "absolute",
            top: 450,
            left: 190,
          }}
        >
          <ButtonAddExpense />
        </View>
      </View>
    </View>
  );
};
export default GroupsScreen;
