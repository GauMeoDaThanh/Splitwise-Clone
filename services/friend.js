import { db, USER_COLLECTION, auth } from "../firebaseConfig";
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
  onSnapshot,
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

  async listenToFriendList(callback) {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, USER_COLLECTION, uid);
    const unsubscribe = onSnapshot(userRef, () => {
      this.getFriendsAvatarAndName(uid).then((friends) => callback(friends));
    });

    return () => unsubscribe();
  }

  async addFriend(fMail) {
    const uid = auth.currentUser.uid;
    const friendUid = await UserService.getInstance().getUserIDWithMail(fMail);
    if (friendUid) {
      const userRef = doc(db, USER_COLLECTION, uid);
      const friendRef = doc(db, USER_COLLECTION, friendUid);
      try {
        await updateDoc(userRef, {
          friends: arrayUnion(friendUid),
        });
        await updateDoc(friendRef, {
          friends: arrayUnion(uid),
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      return;
    }
  }

  async deleteFriend(friendUid) {
    const uid = auth.currentUser.uid;
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
            id: friendUid,
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