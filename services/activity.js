import { auth, db, ACTIVITY_COLLECTION } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import UserService from "./user";

const ACTIVITY_TYPES = {
  group: [
    "addGroup",
    "editGroupName",
    "editGroupAvatar",
    "editWhiteboard",
    "deleteMember",
    "addMember",
  ],
  friend: ["addFriend", "deleteFriend"],
  expense: ["addExpense", "addPayment"],
};

class ActivityService {
  constructor() {
    if (ActivityService.instance == null) {
      ActivityService.instance = this;
    }
    return ActivityService.instance;
  }
  static getInstance() {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService();
    }
    return ActivityService.instance;
  }

  async listenActivity(callback) {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const activitiesRef = collection(db, ACTIVITY_COLLECTION);
        const q = query(
          activitiesRef,
          or(
            where("createBy", "==", userId),
            where("additionalInfo.members", "array-contains", userId)
          ),
          orderBy("createAt", "desc"),
          limit(30)
        );
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          const activityData = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              let activity = doc.data();
              if (activity["createAt"]) {
                activity["createAt"] = formatDate(
                  activity["createAt"].toDate()
                );
                activity["createByAvatar"] =
                  await UserService.getInstance().getAvatar(
                    activity["createBy"]
                  );
                activity["createByName"] =
                  await UserService.getInstance().getUsername(
                    activity["createBy"]
                  );
                return activity;
              }
            })
          );
          callback(activityData);
        });

        return () => unsubscribe();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async aCreateGroup(groupId, groupName) {
    try {
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][0],
        additionalInfo: {
          groupId: groupId,
          name: groupName,
        },
      };

      console.log("start add create group log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aAddFriend(friendId) {
    try {
      const friendName = await UserService.getInstance().getUsername(friendId);
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["friend"][0],
        additionalInfo: {
          friendId: friendId,
          friendName: friendName,
        },
      };

      console.log("start add add friend log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aDeleteFriend(friendId) {
    try {
      const friendName = await UserService.getInstance().getUsername(friendId);
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["friend"][1],
        additionalInfo: {
          friendId: friendId,
          friendName: friendName,
        },
      };
      console.log("start add delete friend log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aEditGroupName(groupId, oldName, newName, members) {
    try {
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][1],
        additionalInfo: {
          groupId: groupId,
          oldName: oldName,
          newName: newName,
          members: members,
        },
      };
      console.log("start add edit group name log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aEditGroupAvatar(groupId, groupName, members) {
    try {
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][2],
        additionalInfo: {
          groupId: groupId,
          groupName: groupName,
          members: members,
        },
      };
      console.log("start add edit group avatar log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aEditWhiteboard(groupId, groupName, members) {
    try {
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][3],
        additionalInfo: {
          groupId: groupId,
          groupName: groupName,
          members: members,
        },
      };
      console.log("start add edit whiteboard log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aAddMember(groupId, groupName, members, newMembers) {
    try {
      const allMembers = members.concat(newMembers);

      //get member name from newMembers
      for (let i = 0; i < newMembers.length; i++) {
        newMembers[i] = await UserService.getInstance().getUsername(
          newMembers[i]
        );
      }

      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][4],
        additionalInfo: {
          groupId: groupId,
          groupName: groupName,
          members: allMembers,
          newMembersName: newMembers,
        },
      };
      console.log("start add add member log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aDeteleMember(groupId, groupName, members, deletedMembers) {
    try {
      // const allMembers = members.filter(
      //   (member) => !deletedMembers.includes(member)
      // );

      //get member name from deletedMembers
      for (let i = 0; i < deletedMembers.length; i++) {
        deletedMembers[i] = await UserService.getInstance().getUsername(
          deletedMembers[i]
        );
      }

      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][5],
        additionalInfo: {
          groupId: groupId,
          groupName: groupName,
          members: members,
          deletedMembersName: deletedMembers,
        },
      };
      console.log("start add delete member log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aAddExpense(
    groupId,
    groupName,
    createBy,
    participants,
    description,
    members
  ) {
    try {
      let friendName = [];
      if (groupId === "") {
        for (let i = 0; i < members.length; i++) {
          friendName[i] = await UserService.getInstance().getUsername(
            members[i]
          );
        }
      }

      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["expense"][0],
        additionalInfo: {
          groupId: groupId,
          groupName: groupName,
          createBy: createBy,
          participants: participants,
          description: description,
          members: members,
          friendName: friendName,
        },
      };
      console.log("start add add expense log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  async aSettleUp(expense, userId) {
    try {
      console.log(expense, userId);
      let members = [];
      members.push(userId);
      members.push(expense.paidBy);
      const userName = await UserService.getInstance().getUsername(userId);
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["expense"][1],
        additionalInfo: {
          expenseName: expense.description,
          members: members,
          userPaidName: userName,
          userPaidId: userId,
        },
      };
      console.log("start add add payment log");
      const activityRef = await addDoc(
        collection(db, ACTIVITY_COLLECTION),
        activity
      );
      console.log("Document written with ID: ", activityRef.id);
    } catch (e) {
      console.error(e);
    }
  }
}

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options);
};

export default ActivityService;
