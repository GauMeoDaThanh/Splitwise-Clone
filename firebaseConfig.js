// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCumR4jFC6esLU9T0mZIeFqTFH4rrZB9QU",
  authDomain: "splitwise-clone-88678.firebaseapp.com",
  projectId: "splitwise-clone-88678",
  storageBucket: "splitwise-clone-88678.appspot.com",
  messagingSenderId: "516039420727",
  appId: "1:516039420727:web:eb5fb065317fcfca7248b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const GROUP_COLLECTION = "groups";
const USER_COLLECTION = "users";

export { db, storage, auth, USER_COLLECTION, GROUP_COLLECTION };
