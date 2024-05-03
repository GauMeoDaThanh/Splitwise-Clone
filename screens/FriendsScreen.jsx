import React from "react";
import { ScrollView, TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import AppBar from "../components/AppBar";
import BottomAppBar from "../components/BottomAppBar";
import CardFriend from "../components/CardFriend";

const FriendsScreen = (props) => {
   // Danh sách các bạn bè
   const friendsList = [
    { name: "Tấn Dũng", avatar: require("../assets/icons/account.png") },
    { name: "John Doe", avatar: require("../assets/icons/account.png") },
    { name: "Jane Doe", avatar: require("../assets/icons/account.png") },
    { name: "Tấn Dũng", avatar: require("../assets/icons/account.png") },
    { name: "John Doe", avatar: require("../assets/icons/account.png") },
    { name: "Jane Doe", avatar: require("../assets/icons/account.png") },
    { name: "Tấn Dũng", avatar: require("../assets/icons/account.png") },
    { name: "John Doe", avatar: require("../assets/icons/account.png") },
    { name: "Jane Doe", avatar: require("../assets/icons/account.png") },
  ];

  return (
    <View style={[styles.container, { flex: 100, backgroundColor:'white' }]}>
      <View style={{ flex: 7, borderBottomColor: "#CCCCCC", borderBottomWidth: 1}}>
        <AppBar></AppBar>
      </View>
      <View style={{ backgroundColor: "#EEEEEE", paddingStart: 10, flexDirection: "row" , flex: 10}}>
          <View style={{ flexDirection: "column", justifyContent: "center", marginRight: 14, width: '82%' }}>
            <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: "bold" }}>Overall, you are ...</Text>
            <Text style={{ paddingHorizontal: 10, color: "#00CC99", paddingTop: 5, fontSize: 18, fontWeight: "500" }}>210.000 đồng</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: 'flex-end' }}>
            <Image source={require("../assets/icons/filter.png")} style={{ width: 26, height: 20, marginHorizontal: 10 }} />
          </TouchableOpacity>
        </View>
      {/* Danh sách bạn bè */}
      <View style={{ flex: 70 }}>
        <ScrollView>
          {friendsList.map((friend, index) => (
            <CardFriend key={index} name={friend.name} avatar={friend.avatar} />
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 10, borderTopColor: "#CCCCCC", borderTopWidth: 1 }}>
        <BottomAppBar />
      </View>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    
  },
});
