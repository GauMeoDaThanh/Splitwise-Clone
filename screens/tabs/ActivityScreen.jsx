import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import ActivityEditGroupName from "../../components/ActivityEditGroupName";
import ActivityDeleteMember from "../../components/ActivityDeleteMember";
import ActivityEditWhiteboard from "../../components/ActivityEditWhiteboard";
import ActivityAddMember from "../../components/ActivityAddMember";
import ActivityEditGroupAvatar from "../../components/ActivityEditGroupAvatar";
import ActivityDeleteFriend from "../../components/ActivityDeleteFriend";
import ActivityService from "../../services/activity";
import { auth } from "../../firebaseConfig";
import ActivityExpense from "../../components/ActivityExpense";
import ActivityPayment from "../../components/ActivityPayment";

const ActivityScreen = () => {
  const navigation = useNavigation();
  const [activityData, setActivityData] = useState([]);
  const [userId, setUserId] = useState(auth?.currentUser?.uid);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userId) {
      ActivityService.getInstance().listenActivity((data) => {
        setActivityData(data);
      });
    }
  }, [userId]);

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
      {Array.isArray(activityData) && activityData.every((item) => item) && (
        <FlatList
          className="flex-col mb-10"
          showsVerticalScrollIndicator={false}
          data={activityData}
          renderItem={({ item }) => (
            <NotificationRender type={item.type} data={item} />
          )}
        />
      )}
      {/* <ActivityExpense></ActivityExpense>
      <ActivityPayment></ActivityPayment> */}
    </View>
  );
};

const notifycationMapping = {
  addGroup: ActivityAddGroup,
  editGroupName: ActivityEditGroupName,
  editGroupAvatar: ActivityEditGroupAvatar,
  addMember: ActivityAddMember,
  deleteMember: ActivityDeleteMember,
  editWhiteboard: ActivityEditWhiteboard,
  addFriend: ActivityAddFriends,
  deleteFriend: ActivityDeleteFriend,
  addExpense: ActivityExpense,
  addPayment: ActivityPayment,
};

const NotificationRender = ({ type, data }) => {
  const Component = notifycationMapping[type];

  if (!Component) {
    return null;
  }

  return <Component data={data} />;
};

export default ActivityScreen;
