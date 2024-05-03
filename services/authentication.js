import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, signInWithRedirect} from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig"
class AuthenticateService {
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

    // async handleSignInWithGoogle() {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         await signInWithRedirect(auth, provider);
    //         // Không cần log gì ở đây vì sẽ không có kết quả trả về ngay khi sử dụng signInWithRedirect

    //         // Bạn có thể log thông điệp chờ đợi ở đây nếu cần
    //         console.log("Chuyển hướng đến trang đăng nhập của Google...");
    //     } catch (error) {
    //         // Xử lý lỗi
    //         console.error("Lỗi đăng nhập:", error.message);
    //     }
    // }

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