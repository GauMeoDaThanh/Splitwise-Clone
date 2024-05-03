import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

const AppBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchPress = () => {
    setShowSearchInput(true);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    // Xử lý tìm kiếm dựa trên searchText
    console.log("Searching for:", searchText);
    // Reset searchText và ẩn input sau khi tìm kiếm
    setSearchText("");
    setShowSearchInput(false);
  };

  const handleBlur = () => {
    setShowSearchInput(false);
  };

  const navigation = useNavigation();
  const handleAddFriendPress = () => {
    navigation.navigate('AddFriendScreen');
  };

  return (
    <View style={[
      styles.container,
      {
        flexDirection: 'row',
        padding: 10,
      }
    ]}>
      <TouchableOpacity style={styles.item} onPress={handleSearchPress}>
        <Image
          source={require("../assets/icons/search.png")}
          style={{width: 20, height: 20, marginHorizontal: 10 }}
        />
      </TouchableOpacity>
      {showSearchInput && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={handleSearchTextChange}
          value={searchText}
          onSubmitEditing={handleSearchSubmit}
          autoFocus={true}
          onBlur={handleBlur}
        />
      )}
      <TouchableOpacity style={styles.item} onPress={handleAddFriendPress}>
        <Image
          source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/free-add-person-1780869-1514184.png',}}
          style={{width: 26, height: 20, marginHorizontal: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AppBar;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      height: 60,
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginLeft: 10,
      marginRight: 10,
    },
});
