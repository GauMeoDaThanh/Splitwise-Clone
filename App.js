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
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { SafeAreaView, View, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 100,
    // backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
