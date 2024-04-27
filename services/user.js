import { db, storage } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { ref, getStorage, getDownloadURL, put } from "firebase/storage";

const initUser = {
  email: "",
  avatarUrl: "",
  friends: [],
  username: "",
  uid: "",
};

class UserService {
  constructor(user = null) {
    if (UserService.instace == null) {
      this.user = user || initUser;
      UserService.instace = this;
    }
    return UserService.instace;
  }
  static getInstance() {
    if (!UserService.instace) {
      UserService.instace = new UserService();
    }
    return UserService.instace;
  }
  async createUser(uid, username, email) {
    console.log("start add user");
    this.user = {
      ...this.user,
      username,
      email,
      uid,
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
  async getUser(uid) {
    console.log(`start get user ${uid}`);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  async setAvatarUrl(uid, uri) {
    console.log(`start set avatar url for ${uid}`);
    const storageRef = ref(storage, `avatars/${uid}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    try {
      await put(storageRef, blob);
    } catch (e) {
      console.error(e);
    }
  }
  async getAvatarUrl(uid) {
    console.log(`start get avatar url for ${uid}`);
    const storageRef = ref(storage, `avatars/${uid}`);
    const url = await getDownloadURL(storageRef);
    console.log("File available at", url);
  }
}

export default UserService;
