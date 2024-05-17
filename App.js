// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import FriendsScreen from "./screens/FriendsScreen";
// import React from 'react';
// // import './output.css';
// // import { View, Text } from 'react-native-tailwindcss';

// import { tw } from 'tailwind-rn';
// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <FriendsScreen></FriendsScreen>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 100,
//   },
//   innerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import AddExpenseScreen from './screens/AddExpenseScreen';
import SplitExpenseScreen from './screens/SplitExpenseScreen';

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
        {/* <SplitExpenseScreen></SplitExpenseScreen> */}
      </View>
    </SafeAreaView>
  );
};

export default App;
