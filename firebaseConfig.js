// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);
export { auth };
export { db }
export {app}

// IOS:
// 1081554393645-v38dus4umgiv1qgnku7lu74v38pnmaks.apps.googleusercontent.com
// Android
// 1081554393645-e9jee40u5192mcva77aehflppjtdo3vj.apps.googleusercontent.com
