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
    "editGroup",
    "editWhiteboard",
    "deleteGroup",
    "addMember",
  ],
  friend: ["addFriend", , "settle expense friend"],
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
      const userId = auth.currentUser.uid;
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
              activity["createAt"] = formatDate(activity["createAt"].toDate());
              activity["createByAvatar"] =
                await UserService.getInstance().getAvatar(activity["createBy"]);
              return activity;
            }
          })
        );
        callback(activityData);
      });

      return () => unsubscribe();
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
