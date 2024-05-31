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
import ActivityAddGroup from "../../components/ActivityAddGroup";
import ActivityAddFriends from "../../components/ActivityAddFriends";
import ActivityDeleteGroup from "../../components/ActivityDeleteGroup";
import ActivityEditGroup from "../../components/ActivityEditGroup";
import ActivityDeleteMember from "../../components/ActivityDeleteMember";
import ActivityEditWhiteboard from "../../components/ActivityEditWhiteboard";
import ActivityAddMember from "../../components/ActivityAddMember";
import ActivityDeleteFriends from "../../components/ActivityDeleteFriends";
import ActivityService from "../../services/activity";

const ActivityScreen = () => {
  const navigation = useNavigation();
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    ActivityService.getInstance().listenActivity((data) => {
      setActivityData(data);
    });
  }, []);

  return (
    <View className="flex-1 bg-white py-5">
      <View className="flex-row mt-2 px-5 border-b py-2 border-gray-300">
        <Text
          className="text-gray-700"
          style={{
            fontSize: 17,
            fontWeight: 500,
          }}
        >
          Recent activity
        </Text>
      </View>
      <FlatList
        className="flex-col mb-10"
        showsVerticalScrollIndicator={false}
        data={activityData}
        renderItem={({ item }) => (
          <NotificationRender type={item.type} data={item} />
        )}
      />
      {/* <ActivityAddGroup></ActivityAddGroup>
        <ActivityDeleteGroup></ActivityDeleteGroup>
        <ActivityEditGroup></ActivityEditGroup>
        <ActivityAddMember></ActivityAddMember>
        <ActivityDeleteMember></ActivityDeleteMember>
        <ActivityEditWhiteboard></ActivityEditWhiteboard>
        <ActivityAddFriends></ActivityAddFriends>
        <ActivityDeleteFriends></ActivityDeleteFriends> */}
    </View>
  );
};

const notifycationMapping = {
  addGroup: ActivityAddGroup,
  deleteGroup: ActivityDeleteGroup,
  editGroup: ActivityEditGroup,
  addMember: ActivityAddMember,
  deleteMember: ActivityDeleteMember,
  editWhiteboard: ActivityEditWhiteboard,
  addFriends: ActivityAddFriends,
  deleteFriends: ActivityDeleteFriends,
};

const NotificationRender = ({ type, data }) => {
  const Component = notifycationMapping[type];
  return <Component data={data} />;
};

export default ActivityScreen;
