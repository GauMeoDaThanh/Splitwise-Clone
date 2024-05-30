import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonAddExpense from "../components/ButtonAddExpense";
import FriendService from "../services/friend";

const DetailFriendsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { friendId } = route.params;
  const [friendInfo, setFriendInfo] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);

  useEffect(() => {
    FriendService.getInstance().listenToFriendDetail(friendId, (friendInfo) => {
      setFriendInfo(friendInfo);
    });
  }, []);

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };

  const handleRemoveFriend = () => {
    FriendService.getInstance().deleteFriend(friendId, navigation);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="relative">
        <SafeAreaView
          className="flex-row"
          style={{
            width: "100%",
            height: 120,
          }}
        >
          <Image
            source={require("../assets/images/background.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          ></Image>
        </SafeAreaView>
        <View
          className="flex-row px-4 space-x-72"
          style={{
            top: -90,
          }}
        >
          <TouchableOpacity
            className="flex-row justify-items-start"
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/icons/back_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-items-end"
            onPress={toggleEditOptions}
          >
            <Image
              source={require("../assets/icons/setting_icon.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        <View
          className="flex-col space-y-1"
          style={{
            top: -60,
            left: 50,
          }}
        >
          <Image
            source={
              friendInfo.avatarUrl
                ? { uri: friendInfo.avatarUrl }
                : require("../assets/images/avatar_image.jpg")
            }
            style={{
              borderRadius: 15,
              borderColor: "white",
              borderWidth: 3,
              marginBottom: 5,
              width: 80,
              height: 80,
            }}
          ></Image>
          <Text
            style={{
              color: "rgb(75 85 99)",
              fontWeight: 500,
              fontSize: 17,
            }}
          >
            {friendInfo?.username}
          </Text>
          <View className="flex-row space-x-1">
            <Text className="text-gray-600">Chau N. owes you</Text>
            <Text
              style={{
                color: "#0B9D7E",
                fontWeight: 400,
              }}
            >
              3.000.000vnđ
            </Text>
          </View>
        </View>
      </View>

      {/* Viết code vô Flastlist */}
      {/* <View className = 'flex-col space-y-6 px-1'>
                <FlatList>
                    <View className = 'flex-col px-2 space-y-3'>
                        <Text className = 'text-gray-700 px-1'
                            style = {{
                                fontSize: 13,
                                fontWeight: 500
                            }}
                        >
                            Tháng 5 2024
                        </Text>
                        <View className = 'flex-row'>
                            <TouchableOpacity flex-row space-x-5 px-1 items-center>
                                <View className = 'flex-col items-center'>
                                    <Text 
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Th5
                                    </Text>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 17,
                                            fontWeight: 500
                                        }}
                                    >
                                        11
                                    </Text>
                                </View>
                                <View className = 'flex-row p-2 items-center border border-gray-400 bg-gray-200'>
                                    <Image
                                        source={require('../assets/icons/icon_bill.png')}
                                        style = {{
                                            width: 22,
                                            height: 22
                                        }} 
                                    >
                                    </Image>
                                </View>
                                <View className='flex-col items-start'>
                                    <Text
                                        className = 'text-gray-600'
                                        style = {{
                                            fontSize: 16,
                                            fontWeight: 500
                                        }}
                                    >
                                        bill share1
                                    </Text>
                                    <Text
                                        className = 'text-gray-500'
                                        style = {{
                                            fontSize: 12
                                        }}
                                    >
                                        Nhung paid 200.000vnđ
                                    </Text>
                                </View>
                                <View className='flex-col items-end'>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 12,
                                            fontWeight: 500
                                        }}
                                    >
                                        you borrowed
                                    </Text>
                                    <Text
                                        className = 'text-red-600'
                                        style = {{
                                            fontSize: 13,
                                            fontWeight: 500
                                        }}
                                    >
                                    200.000vnđ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </FlatList> 
            </View> */}

      <View className="flex-col space-y-6 px-1">
        <View className="flex-col px-2 space-y-3">
          <Text
            className="text-gray-700 px-1"
            style={{
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Tháng 5 2024
          </Text>
          <View className="flex-row ">
            <TouchableOpacity className="flex-row space-x-5 px-1 items-center">
              <View className="flex-col items-center">
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Th5
                </Text>
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                  }}
                >
                  11
                </Text>
              </View>
              <View className="flex-row p-2 items-center border border-gray-400 bg-gray-200">
                <Image
                  source={require("../assets/icons/icon_bill.png")}
                  style={{
                    width: 22,
                    height: 22,
                  }}
                ></Image>
              </View>
              <View className="flex-col items-start">
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  bill share1
                </Text>
                <Text
                  className="text-gray-500"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Nhung paid 200.000vnđ
                </Text>
              </View>
              <View className="flex-col items-end">
                <Text
                  className="text-red-600"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  you borrowed
                </Text>
                <Text
                  className="text-red-600"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  200.000vnđ
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-col px-2 space-y-3">
          <Text
            className="text-gray-700 px-1"
            style={{
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Tháng 6 2024
          </Text>
          <View className="flex-row">
            <TouchableOpacity className="flex-row space-x-5 px-1 items-center">
              <View className="flex-col items-center">
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Th6
                </Text>
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                  }}
                >
                  15
                </Text>
              </View>
              <View className="flex-row p-2 items-center">
                <Image
                  source={require("../assets/icons/money_icon.png")}
                  style={{
                    width: 23,
                    height: 23,
                  }}
                ></Image>
              </View>
              <Text
                className="text-gray-600"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Dat V. paid Nhung 200.000vnđ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        className="flex-row"
        style={{
          position: "absolute",
          top: 530,
          left: 190,
        }}
      >
        <ButtonAddExpense />
      </View>
      {showEditOptions && (
        <View
          className="flex-col border-2 border-gray-300 space-y-2 p-3"
          style={{
            position: "absolute",
            top: 53,
            right: 5,
            backgroundColor: "white",
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleRemoveFriend}
          >
            <Text
              className="text-red-500"
              style={{
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Remove friend
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default DetailFriendsScreen;
