import { db } from "../firebaseConfig";
import UserService from "./user";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

class FriendService {
  constructor() {
    if (FriendService.instance == null) {
      FriendService.instance = this;
    }
    return FriendService.instance;
  }
  static getInstance() {
    if (!FriendService.instance) {
      FriendService.instance = new FriendService();
    }
    return FriendService.instance;
  }

  async addFriend(uid, fMail) {
    const friendUid = await UserService.getInstance().getUserIDWithMail(fMail);
    if (friendUid) {
      const userRef = doc(db, "users", uid);
      try {
        await updateDoc(userRef, {
          friends: arrayUnion(friendUid),
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      return;
    }
  }

  async deleteFriend(uid, friendUid) {
    const userRef = doc(db, "users", uid);
    try {
      await updateDoc(userRef, {
        friends: arrayRemove(friendUid),
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default FriendService;
