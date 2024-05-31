import { db, storage, USER_COLLECTION, auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
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
    if (UserService.instance == null) {
      this.user = initUser;
      UserService.instance = this;
    }
    return UserService.instance;
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async listenToUserInfo(callback) {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, USER_COLLECTION, uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      this.user = doc.data();
      callback(this.user);
    });

    return () => unsubscribe();
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
      const docRef = doc(collection(db, USER_COLLECTION), customRef);
      await setDoc(docRef, this.user);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getUser() {
    console.log(`start get user ${uid}`);
    const uid = auth.currentUser.uid;
    const userRef = doc(db, USER_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      console.log(userSnap.data());
      return userSnap.data();
    } else {
      console.log("Khong tim thay");
      return null;
    }
  }

  async uploadAvatar(imgUri) {
    try {
      console.log("start upload avatar");
      const uid = auth.currentUser.uid;
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
          const userRef = doc(db, USER_COLLECTION, uid);
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

  async getAvatar(uid = auth.currentUser.uid) {
    try {
      const q = query(collection(db, USER_COLLECTION), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data().avatarUrl;
    } catch (e) {
      console.error(e);
    }
  }

  async setUsername(username) {
    console.log("start update username");
    const uid = auth.currentUser.uid;
    const userRef = doc(db, USER_COLLECTION, uid);
    try {
      await setDoc(userRef, { username }, { merge: true });
      console.log(`Document with ID ${uid} updated with username ${username}`);
    } catch (e) {
      console.error(e);
    }
  }

  async getUsername(uid) {
    try {
      const q = query(collection(db, USER_COLLECTION), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data().username;
    } catch (e) {
      console.error(e);
    }
  }

  async getUserIDWithMail(mail) {
    try {
      console.log("start get user with mail");
      const q = query(
        collection(db, USER_COLLECTION),
        where("email", "==", mail)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        console.log("Khong tim thay User");
        return null;
      } else {
        return querySnapshot.docs[0].data().uid;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserService;
