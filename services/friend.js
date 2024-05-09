import { db, USER_COLLECTION } from "../firebaseConfig";
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
      const userRef = doc(db, USER_COLLECTION, uid);
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
    const userRef = doc(db, USER_COLLECTION, uid);
    try {
      await updateDoc(userRef, {
        friends: arrayRemove(friendUid),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getFriendsAvatarAndName(uid) {
    const friendsList = await this.getFriendList(uid);
    if (friendsList) {
      const friendsData = await Promise.all(
        friendsList.map(async (friendUid) => {
          const friendRef = doc(db, USER_COLLECTION, friendUid);
          const friendSnap = await getDoc(friendRef);
          const friendData = friendSnap.data();
          return {
            avatar: friendData.avatarUrl,
            name: friendData.username,
          };
        })
      );
      return friendsData;
    }
  }

  async getFriendList(uid) {
    const userRef = doc(db, USER_COLLECTION, uid);
    try {
      const userSnap = await getDoc(userRef);
      return userSnap.data().friends;
    } catch (e) {
      console.log(e);
    }
  }
}

export default FriendService;
