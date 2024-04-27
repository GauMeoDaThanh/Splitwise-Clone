import { StyleSheet, Text, View } from "react-native";
import Register from "./screens/registerForm";
import Login from "./screens/signinForm";

export default function App() {
  return <Login></Login>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});