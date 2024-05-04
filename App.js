import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from 'react';
import AppNavigation from "./navigation/AppNavigation";
import { SafeAreaView, View, Dimensions } from 'react-native';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  // Lấy kích thước của màn hình thiết bị
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  // Tính toán các style dựa trên kích thước của màn hình
  const containerStyle = {
    flex: 1, // Đảm bảo view đầy đủ chiều cao và chiều rộng của màn hình
    width: screenWidth,
    height: screenHeight,
  };

  return (
    <SafeAreaView style={containerStyle}>
      <View style={containerStyle}>
        <AppNavigation />
      </View>
    </SafeAreaView>
  );
};

export default App;
