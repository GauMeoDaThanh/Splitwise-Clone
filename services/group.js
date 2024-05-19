import {
  db,
  storage,
  auth,
  GROUP_COLLECTION,
  USER_COLLECTION,
} from "../firebaseConfig";
import { Alert } from "react-native";
import ActivityService from "./activity";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  toDate,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  query,
  where,
  or,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const initGroup = {
  name: "",
  createBy: "",
  createAt: null,
  information: "",
  members: [],
  type: "",
  imageuri: "",
};

class GroupService {
  constructor() {
    if (GroupService.instance == null) {
      GroupService.instance = this;
    }
    return GroupService.instance;
  }
  static getInstance() {
    if (!GroupService.instance) {
      GroupService.instance = new GroupService();
    }
    return GroupService.instance;
  }

  async listenToGroupList(callback) {
    try {
      console.log("start listen to group list");
      const groupsRef = collection(db, GROUP_COLLECTION);
      const uid = auth.currentUser.uid;
      const q = query(
        groupsRef,
        or(
          where("createBy", "==", uid),
          where("members", "array-contains", uid)
        ),
        orderBy("createAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let groups = [];
        querySnapshot.forEach((doc) => {
          let group = doc.data();
          if (group.createAt) {
            group["id"] = doc.id;
            group["createAt"] = group["createAt"].toDate().toDateString();
            group["imageuri"] = group["imageuri"] || null;
            groups.push(group);
          }
        });
        callback(groups);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  }

  async addGroup(name, type, imgUri, navigation) {
    const createAt = serverTimestamp();
    const createBy = auth.currentUser.uid;
    const group = {
      ...initGroup,
      name,
      createAt,
      createBy,
      type,
      members: [createBy],
    };

    console.log("start add group");
    try {
      const groupRef = await addDoc(collection(db, GROUP_COLLECTION), group);
      if (imgUri) {
        await this.uploadAvatar(groupRef.id, imgUri);
      }
      console.log("Document written with ID: ", groupRef.id);

      Alert.alert("Success", "Group created successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Groups"),
        },
      ]);

      // Add activity
      ActivityService.getInstance().aCreateGroup(groupRef.id, group["name"]);
    } catch (e) {
      console.log(e);
    }
  }

  async uploadAvatar(groupId, imgUri) {
    try {
      console.log("start upload avatar");
      const storageRef = ref(storage, `groups/${groupId}`);
      const fetchReponse = await fetch(imgUri);
      const blob = await fetchReponse.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          const groupRef = doc(db, GROUP_COLLECTION, groupId);
          getDownloadURL(storageRef).then((downloadURL) => {
            updateDoc(groupRef, { imageuri: downloadURL }, { merge: true });
          });
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  async getGroupInfo(groupId) {
    try {
      console.log("start get group infomation");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      const groupSnap = await getDoc(groupRef);

      let groupInfo = groupSnap.data();
      groupInfo["createAt"] = groupInfo["createAt"]?.toDate().toDateString();

      return groupInfo;
    } catch (e) {
      console.error(e);
    }
  }

  async setGroupInformation(groupId, groupInfomation) {
    try {
      console.log("start set group information");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await setDoc(groupRef, { information: groupInfomation }, { merge: true });
      console.log(
        `Document with ID ${groupId} updated with username ${auth.currentUser.uid}`
      );
    } catch (e) {
      console.log(e);
    }
  }

  async setGroupName(groupId, name) {
    try {
      console.log("start set group name");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await setDoc(groupRef, { name }, { merge: true });
      console.log("set group name successfully");
    } catch (e) {
      console.log(e);
    }
  }

  async addGroupMembers(groupId, members) {
    try {
      console.log("start add new members to group");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(...members),
      });
      console.log("add members successfully");
    } catch (e) {
      console.log(e);
    }
  }

  async removeGroupMembers(groupId, members) {
    try {
      console.log("start remove members of group");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await updateDoc(groupRef, {
        members: arrayRemove(...members),
      });
      console.log("remove members successfully");
    } catch (e) {
      console.log(e);
    }
  }

  async deleteGroup(groupId) {
    try {
      console.log("start delete groups");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await deleteDoc(groupRef);
      console.log("delete group successfully");
    } catch (e) {
      console.error(e);
    }
  }
}

export default GroupService;