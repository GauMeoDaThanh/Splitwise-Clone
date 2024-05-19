import { useNavigation } from "@react-navigation/native";
import React, { useState, useMemo, useEffect } from "react";
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
import RadioButtons from "react-native-radio-buttons";
const GroupsScreen = () => {
  console.warn = () => {};
  const navigation = useNavigation();

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedId, setSelectedId] = useState("All groups");
  const radioButtons = [
    "All groups",
    "Groups you owe",
    "Groups that owe you",
    "Trip",
    "Home",
    "Couple",
    "Friend",
    "Other",
  ];
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

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
          <View className="flex-row">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={toggleFilterOptions}
            >
              <Image
                source={require("../../assets/icons/filter_icon.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "#0B9D7E",
                }}
              ></Image>
            </TouchableOpacity>
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
        <View style={{ width: "100%", height: 270 }}>
          {/* Viết code để lấy item bỏ vào FlatList */}
          {/* <FlatList>
                        return(
                            <TouchableOpacity>
                                <View className = 'flex-row space-x-4 items-center mb-3'>
                                    <Image
                                        source={require('../../assets/images/avatar_image.jpg')}
                                        style = {{
                                            width: 90,
                                            height: 90,
                                            borderRadius: 10
                                        }}
                                    >
                                </Image>
                                    <View className='flex-col py-3'>
                                        <Text
                                            style={{
                                                fontWeight:'bold'
                                            }}
                                        >Name group</Text>
                                        <Text
                                            style={{
                                                color: '#0B9D7E',
                                                fontWeight: 500
                                            }}
                                        >
                                            you are owed 3.000.000vnđ
                                        </Text>
                                        <View className = 'flex-row'>
                                            <Text>Đạt owes you </Text>
                                            <Text
                                                style={{
                                                    color: '#0B9D7E',
                                                    fontWeight:'500'
                                                }}
                                            >200.00vnđ</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    </FlatList> */}
          <TouchableOpacity onPress={() => navigation.navigate("DetailGroups")}>
            <View className="flex-row space-x-4 items-center mb-3">
              <Image
                source={require("../../assets/images/avatar_image.jpg")}
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
                  Name group
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
          <TouchableOpacity>
            <View className="flex-row space-x-4 items-center mb-3">
              <Image
                source={require("../../assets/images/avatar_image.jpg")}
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
                  Name group
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontWeight: 500,
                  }}
                >
                  you owe 3.000.000vnđ
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
        </View>
        <View className="flex-row justify-center">
          <TouchableOpacity
            className="flex-row items-center space-x-2 border py-1 px-3 rounded-md"
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
      {/* Dropdown for filter options */}
      {showFilterOptions && (
        <View
          className="border-2 border-gray-300 "
          style={{
            position: "absolute",
            top: 130,
            right: 5,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            zIndex: 1,
            borderRadius: 10,
          }}
        >
          <RadioButtons
            options={radioButtons}
            onSelection={(option) => {
              setSelectedId(option);
            }}
            selectedOption={selectedId}
            renderOption={(option, selected, onSelect, index) => (
              <TouchableOpacity key={index} onPress={onSelect}>
                <View className="flex-row items-center py-1 space-x-2">
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      marginRight: 8,
                      borderColor: selected ? "#0B9D7E" : "rgb(75, 85, 99)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#0B9D7E",
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: "rgb(75, 85, 99)",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default GroupsScreen;
