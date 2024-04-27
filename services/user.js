import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const initUser = {
  email: "",
  avatarUrl: "",
  friends: [],
  username: "",
};

class UserService {
  constructor(user = null) {
    this.user = user || initUser;
  }
  async createUser(uid, username, email) {
    console.log("start add user");
    this.user = {
      ...this.user,
      username,
      email,
    };
    try {
      const customRef = uid;
      const docRef = doc(collection(db, "users"), customRef);
      await setDoc(docRef, this.user);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default UserService;
