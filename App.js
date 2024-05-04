import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AppNavigation from "./navigation/appNavigation";

export default function App() {
    return <AppNavigation></AppNavigation>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


// ios: 1081554393645-dtvkagcj2tsfnsgm7l3nvpdfnoi3t7ar.apps.googleusercontent.com
// android: 1081554393645-aia1nst3m97gj8i08vfeln593lr3ref2.apps.googleusercontent.com
