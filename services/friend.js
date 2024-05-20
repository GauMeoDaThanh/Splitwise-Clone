import { db, USER_COLLECTION, auth, GROUP_COLLECTION } from "../firebaseConfig";
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
import { Alert } from "react-native";

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

  async addFriend(fMail, navigation) {
    const uid = auth.currentUser.uid;
    const friendUid = await UserService.getInstance().getUserIDWithMail(fMail);
    const friends = await this.getFriendList(uid);

    if (friends.includes(friendUid)) {
      alert("User already in friend list");
      return;
    }

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
        Alert.alert("Success", "Add friend successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Friends"),
          },
        ]);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("User not found");
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

  async getFriendListNotInGroup(groupId) {
    const uid = auth.currentUser.uid;
    const groupRef = doc(db, GROUP_COLLECTION, groupId);
    const groupSnap = await getDoc(groupRef);
    const groupMembers = groupSnap.data().members;
    const friendList = await this.getFriendsAvatarAndName(uid);

    return friendList.filter((friend) => !groupMembers.includes(friend.id));
  }
}

export default FriendService;
