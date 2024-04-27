import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"
class AuthenticateService {
    async handleSignUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Add db user
        } catch (error) {
            console.log(error);
        }
    }

    async handleSignIn(email, password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Login successfully!")
                    // Chuyển sang home

                })
                .catch((error) => {
                    console.error("Login failed:", error.message);
                });   
    }
}

export default AuthenticateService;