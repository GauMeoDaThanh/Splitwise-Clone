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
import ActivityService from "./activity";

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

  async listenToFriendDetail(friendId, callback) {
    const friendRef = doc(db, USER_COLLECTION, friendId);
    const unsubscribe = onSnapshot(friendRef, (friendInfo) => {
      let friendData = friendInfo.data();
      callback(friendData);
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

        // Add activity
        ActivityService.getInstance().aAddFriend(friendUid);
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

  deleteFriend(friendUid, navigation) {
    //warning box
    Alert.alert("Warning", "Are you sure to delete this friend?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const uid = auth.currentUser.uid;
          const userRef = doc(db, USER_COLLECTION, uid);
          const friendRef = doc(db, USER_COLLECTION, friendUid);
          try {
            await updateDoc(userRef, {
              friends: arrayRemove(friendUid),
            });
            await updateDoc(friendRef, {
              friends: arrayRemove(uid),
            });

            ActivityService.getInstance().aDeleteFriend(friendUid);

            Alert.alert("Success", "Remove friend successfully", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Friends"),
              },
            ]);
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  }

  async getFriendAvatar(friendUid) {
    const friendRef = doc(db, USER_COLLECTION, friendUid);
    const friendSnap = await getDoc(friendRef);
    return friendSnap.data().avatarUrl;
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

  async getFriendListInGroup(groupId) {
    const uid = auth.currentUser.uid;
    const groupRef = doc(db, GROUP_COLLECTION, groupId);
    const groupSnap = await getDoc(groupRef);
    const groupMembers = groupSnap.data().members;
    const friendList = await this.getFriendsAvatarAndName(uid);

    return friendList.filter((friend) => groupMembers.includes(friend.id));
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
