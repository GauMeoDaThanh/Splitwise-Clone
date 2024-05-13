import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import UserService from "./user";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  async handleSignUpAndCreateUser(email, password, userName, navigation) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      Alert.alert(
        "Alert",
        "Check your authentication email to log in with your registered account"
      );
      await UserService.getInstance().createUser(
        user.uid,
        userName,
        user.email
      );
      navigation.navigate("Login");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          alert(`Email address ${email} already in use.`);
          break;
        case "auth/invalid-email":
          alert(`Email address ${email} is invalid.`);
          break;
        case "auth/operation-not-allowed":
          alert(`Error during sign up.`);
          break;
        case "auth/weak-password":
          alert(
            "Password is not strong enough. Add additional characters including special characters and numbers."
          );
          break;
        default:
          alert(e.message);
          break;
      }
    }
  }

  async handleSignIn(email, password, navigation) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        //   Đến home
        // navigation.navigate("FriendsScreen");
        navigation.navigate("TabNavigator");
        console.log("Login successfully!");
      } else {
        // Email chưa được xác nhận
        alert(
          "Email has not been verified yet. Please verify your email before logging in."
        );
      }
    } catch (error) {
      console.log("Login failed: ", error);
      alert("Login failed");
    }
  }

  // async handleSignInWithGoogle() {
  //     try {
  //         const provider = new GoogleAuthProvider();
  //         console.log(provider);
  //     const result = await signInWithPopup(auth, provider);
  //     // Xử lý đăng nhập thành công
  //     console.log('Người dùng đã đăng nhập thành công:', result.user);
  // } catch (error) {
  //     // Xử lý lỗi
  //     console.error('Lỗi đăng nhập:', error.message);
  // }
  // }

  async handleSendPasswordReset(email, navigation) {
    try {
      userId = await UserService.getInstance().getUserIDWithMail(email);
      if (userId != null) {
        await sendPasswordResetEmail(auth, email);
        alert("Check your email to reset your password");
      } else {
        alert("Email does not exist ");
      }
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async handleSignOut(navigate) {
    try {
      await auth.signOut();
      navigate.navigate("Login");
      console.log("Sign out successfully!");
    } catch (error) {
      console.log("Sign out failed: ", error);
    }
  }

  async updatePassword(oldPassword, newPassword) {
    try {
      const user = auth.currentUser;
      await this.reAuthenticateUser(oldPassword);
      await updatePassword(user, newPassword);
      alert("Password updated successfully");
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-credential":
          alert("Invalid password");
          break;
        case "auth/weak-password":
          alert(
            "Password is not strong enough. At least 6 characters are required."
          );
          break;
        default:
          alert(e.message);
          break;
      }
    }
  }

  async reAuthenticateUser(currentPassword) {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  }
}
export default AuthenticateService;
