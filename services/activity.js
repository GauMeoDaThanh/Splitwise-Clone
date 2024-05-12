import { auth, db, ACTIVITY_COLLECTION } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  or,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

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

  async getUserActivities() {
    try {
      const userId = auth.currentUser.uid;
      const activitiesRef = collection(db, ACTIVITY_COLLECTION);
      const q = query(
        activitiesRef,
        or(
          where("createBy", "==", userId),
          where("additionalInfo.members", "array-contains", userId)
        )
      );
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        querySnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async aCreateGroup(groupId, groupName, groupMembers) {
    try {
      const activity = {
        createBy: auth.currentUser.uid,
        createAt: serverTimestamp(),
        type: ACTIVITY_TYPES["group"][0],
        additionalInfo: {
          groupId: groupId,
          name: groupName,
          members: groupMembers,
        },
      };

      console.log("start add aCreateGroup");
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

const ACTIVITY_TYPES = {
  group: ["add group", "edit group", " create expense group"],
  friend: ["add friend", "create expense friend", "settle expense friend"],
};

export default ActivityService;
