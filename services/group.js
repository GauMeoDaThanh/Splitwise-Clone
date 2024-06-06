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

  async listenToGroupDetail(groupId, callback) {
    const groupRef = doc(db, GROUP_COLLECTION, groupId);
    const unsubscribe = onSnapshot(groupRef, (groupInfo) => {
      let group = groupInfo.data();
      if (group) {
        group["id"] = groupInfo.id;
        group["createAt"] = group["createAt"].toDate().toDateString();
        callback(group);
      }
    });

    return () => unsubscribe();
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
      console.log("Document written with ID: ", groupRef.id);
      ActivityService.getInstance().aCreateGroup(
        groupRef.id,
        group["name"],
        group["members"]
      );
    } catch (e) {
      console.log(e);
    }
  }

  async updateGroup(groupId, name, type, imgUri, members, navigation) {
    try {
      console.log("start update group");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      const groupSnap = await getDoc(groupRef);
      const currentName = groupSnap.data().name;

      if (name !== currentName) {
        await updateDoc(groupRef, { name, type }, { merge: true });
        ActivityService.getInstance().aEditGroupName(
          groupId,
          currentName,
          name,
          members
        );
      }

      if (imgUri) {
        await this.uploadAvatar(groupId, imgUri);
        ActivityService.getInstance().aEditGroupAvatar(
          groupId,
          currentName,
          members
        );
      }

      Alert.alert("Success", "Group updated successfully", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("DetailGroups", { groupInfo: groupId }),
        },
      ]);
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

  async getGroupMembers(groupId) {
    try {
      console.log("start get group members");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      const groupSnap = await getDoc(groupRef);
      const members = groupSnap.data().members;
      return members;
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

  async setGroupInformation(groupId, groupName, groupInfomation, members) {
    try {
      console.log("start set group information");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await setDoc(groupRef, { information: groupInfomation }, { merge: true });
      console.log(
        `Document with ID ${groupId} updated with username ${auth.currentUser.uid}`
      );
      // Add activity
      ActivityService.getInstance().aEditWhiteboard(
        groupId,
        groupName,
        members
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

  async addGroupMembers(groupId, groupName, currentMembers, newMembers) {
    try {
      console.log("start add new members to group");
      const groupRef = doc(db, GROUP_COLLECTION, groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(...newMembers),
      });

      // Add activity
      ActivityService.getInstance().aAddMember(
        groupId,
        groupName,
        currentMembers,
        newMembers
      );

      console.log("add members successfully");
    } catch (e) {
      console.log(e);
    }
  }

  removeGroupMembers(
    groupId,
    groupName,
    currentMembers,
    membersId,
    navigation
  ) {
    try {
      Alert.alert("Warning", "Are you sure you want to delete this member?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            console.log("start remove members of group");
            const groupRef = doc(db, GROUP_COLLECTION, groupId);
            await updateDoc(groupRef, {
              members: arrayRemove(...membersId),
            });

            //Add activity
            ActivityService.getInstance().aDeteleMember(
              groupId,
              groupName,
              currentMembers,
              membersId
            );
            Alert.alert("Success", "Delete group members successfully", [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  removeGroup(groupId, navigation) {
    try {
      Alert.alert("Warning", "Are you sure you want to delete this group?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            console.log("start delete groups");
            const groupRef = doc(db, GROUP_COLLECTION, groupId);
            await deleteDoc(groupRef);
            navigation.navigate("Groups");
            Alert.alert("Success", "Group deleted successfully", [
              {
                text: "OK",
              },
            ]);
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  async getGroupOfIdAcc(idAcc) {
    const myGroup = [];
    for (const group of await this.getAllGroup()) {
      if (group.members.includes(idAcc) || group.createBy.includes(idAcc)) {
        myGroup.push(group);
      }
    }
    return myGroup;
  }

  async getAllGroup() {
    const groupList = [];
    const querySnapshot = await getDocs(collection(db, GROUP_COLLECTION));
    querySnapshot.forEach((doc) => {
      groupList.push({ id: doc.id, ...doc.data() });
    });
    return groupList;
  }
}
export default GroupService;
