import * as React from "react";
import { TextInput, Button, SafeAreaView, View } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signup successfully!");

        } catch (error) {
            console.error("Signup failed:", error.message);

        }
    };

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
            <Button title="Register" onPress={handleSignup} />
        </SafeAreaView>
    );
};

export default Signup;