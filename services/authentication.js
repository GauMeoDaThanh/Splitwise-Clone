import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification} from "firebase/auth";
import { auth } from "../firebaseConfig";

class AuthenticateService {
    constructor() {
        if (AuthenticateService.instance == null) {
            AuthenticateService.instance = this;
        }
        return AuthenticateService.instance;
    }
    static getInstance() {
        if (!AuthenticateService.instance) {
            AuthenticateService.instance = new AuthenticateService();
        }
        return AuthenticateService.instance;
    }
    async handleSignUp(email, password) {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        // Gửi email xác thực
        await sendEmailVerification(user);
    }

    async handleSignIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            if (user.emailVerified) {
                //   Đến home
                console.log("Login successfully!");
            } else {
                // Email chưa được xác nhận
                alert(
                    "Email has not been verified yet. Please verify your email before logging in."
                );
            }
        } catch (error) {
            console.error("Login failed: ", error);
            alert("Login failed");
        }
    }

    async handleSendPasswordReset(email) {
        try {
            email = "hongnhung16052003@gmail.com";
            await sendPasswordResetEmail(auth, email);
            alert("Check your email to reset your password");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
}
export default AuthenticateService;