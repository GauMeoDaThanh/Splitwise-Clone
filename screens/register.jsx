import React from "react";
import { TextInput, Button, SafeAreaView, View } from "react-native";
import { withExpoSnack } from "nativewind";

const Register = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Button title="Register" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default withExpoSnack(Register);
