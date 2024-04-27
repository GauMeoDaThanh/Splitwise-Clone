import * as React from "react";
import { TextInput, Button, SafeAreaView, View } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
    const [email, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSignin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                console.log("Signin successfully!")
            })
            .catch((error) => {
                console.error("Signin failed:", error.message);
            });
    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <TextInput
                placeholder="Username"
                onChangeText={setMail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleSignin} />
        </SafeAreaView>
    );
};

export default Signin;