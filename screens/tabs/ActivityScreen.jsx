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
} from "react-native";
import ActivityService from "../../services/activity";

const ActivityScreen = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    ActivityService.getInstance().listenActivity((data) => {
      setActivityData(data);
    });
  }, []);

  return (
    <View>
      <Text>Activity Screen</Text>
    </View>
  );
};
export default ActivityScreen;
