import * as React from "react";
import { TextInput, Button, SafeAreaView, View } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        console.log("Signed in successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setMail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </SafeAreaView>
  );
};

export default Register;
