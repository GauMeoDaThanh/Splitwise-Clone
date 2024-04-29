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
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

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
      this.user = initUser;
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
    return querySnapshot.docs[0].data();
  }
  async uploadAvatar(uid, imgUri) {
    try {
      console.log("start upload avatar");
      const storageRef = ref(storage, `avatars/${uid}`);
      const fetchReponse = await fetch(imgUri);
      const blob = await fetchReponse.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          const userRef = doc(db, "users", uid);
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDoc(userRef, { avatarUrl: downloadURL }, { merge: true });
          });
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  async getAvatar(uid) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data().avatarUrl;
    } catch (e) {
      console.error(e);
    }
  }

  async setUsername(uid, username) {
    console.log("start update username");
    const userRef = doc(db, "users", uid);
    try {
      await setDoc(userRef, { username }, { merge: true });
      console.log(`Document with ID ${uid} updated with username ${username}`);
    } catch (e) {
      console.error(e);
    }
  }
}

export default UserService;
