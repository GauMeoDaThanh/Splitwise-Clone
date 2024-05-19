import { auth, db } from "../firebaseConfig";
import { collection, addDoc, doc, setDoc, query, getDoc, updateDoc } from "firebase/firestore";
import FriendService from "./friend";
import AuthenticateService from "./authentication";
import UserService from "./user";
import GroupService from "./group";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage} from "../firebaseConfig";
import { useRef } from "react";


const friendService = FriendService.getInstance();
const authenticateService = AuthenticateService.getInstance();
const userService = UserService.getInstance();
const groupService = GroupService.getInstance();
const initExpense = {
    createBy:"",
    createAt: new Date(),
    groupId: [],
    imgUrl: "",
    isSettle: false,
    amounts: 0,
    paidBy:"",
    description: "",
    participants: [],
    comments: {},
};
class ExpenseService {
    static expenseId = ""
    constructor(expense = null) {
        if (ExpenseService.instance == null) {
            ExpenseService.instance = this;
        }
        return ExpenseService.instance;
    }

    static getInstance() {
        if (!ExpenseService.instance) {
            ExpenseService.instance = new ExpenseService();
        }
        return ExpenseService.instance;
    }

    async createExpense(createAt, amounts, groupId, description, participants) {
        expense = {
            ...initExpense,
            createBy: auth.currentUser.uid,
            paidBy: auth.currentUser.uid,
            createAt,
            groupId,
            amounts,
            description,
            participants,
        };
        try {
            const docRef = await addDoc(
                collection(db, "expenses"),
                expense
            );
            console.log("Add expense successfully with ID: ", docRef.id);
            expenseId = docRef.id;
            console.log("ID Exp", this.expenseId)
        } catch (e) {
            console.error("Error adding expense ", e);
        }
    }

    async getParticipants(selectedParticipants) {
    const uniqueMembers = new Set(); 
    const members = []
    const participants = []
    for (const participant of selectedParticipants) {
        if (participant.groupId) {
        const group = await groupService.getGroupInfo(participant.groupId);
        const membersId = group.members;
        for (const id of membersId) {
            if (!uniqueMembers.has(id)) {
            uniqueMembers.add(id);
            members.push({ userId: id });
            }
        }
    } else {
      if (!uniqueMembers.has(participant.userId)) {
        uniqueMembers.add(participant.userId);
        members.push({ userId: participant.userId });
      }
    }
    }
    for (member of members) {
        participants.push(await userService.getUserById(member.userId))
        }
        return participants;
}
    get expenseId() {
        return expenseId;
    }

    // Handle input friend or group to share bill
    async handleInputParticipants(text) {
        const idFr = await friendService.getFriendList(auth.currentUser?.uid);
        const users = [];
        for (id of idFr) {
            users.push(await userService.getUserById(id));
        }
        groupList = await groupService.getGroupOfIdAcc(
            auth.currentUser?.uid
        );
        // console.log("Group", groupList);
        const searchTerm = text.toLowerCase().trim();

        // Filter users based on search term
        const filteredUsers = users.filter((user) => {
            return (
                user.email?.toLowerCase().includes(searchTerm) ||
                user.username?.toLowerCase().includes(searchTerm)
            );
        });

        // Filter groups based on search term
        const filteredGroups = groupList.filter((group) => {
            return group.name?.toLowerCase().includes(searchTerm);
        });

        if (text == "") return [];
        const filteredSuggestions = [...filteredUsers, ...filteredGroups];
        return filteredSuggestions;
    }

    async deleteExpense(expenseId) {
        try {
            console.log("start delete expense");
            const groupRef = doc(db, "expenses", expenseId);
            await deleteDoc(groupRef);
            console.log("delete expense successfully");
        } catch (e) {
            console.error(e);
        }
    }

    async updateExpenseInformation(
        expenseId,
        createAt,
        imgUrl,
        amounts,
        description,
        participants
    ) {
        members = [];
        groupId = [];
        // console.log("Participants: ", participants);
        for (participant of participants) {
            if (participant.type) {
                groupId.push(participant.id);
                const group = await groupService.getGroupInfo(participant.id);
                const membersId = group.members;
                for (id of membersId) {
                    members.push({ userId: id, amount: 50000 });
                }
            } else {
                // Share money for friends
                members.push({ userId: participant.uid, amount: 50000 });
            }
        }
        participants = [...members];
        expense = {
            ...initExpense,
            createAt,
            groupId,
            imgUrl,
            amounts,
            description,
            participants,
        };
         try {
    console.log("start set expense information");
    const groupRef = doc(db, "expenses", groupId);
    await setDoc(groupRef, { ...expense }, { merge: true });
    console.log(
      `Document with ID ${groupId} updated with username ${auth.currentUser?.uid}`
    );
  } catch (e) {
    console.log(e);
  }
}

    async getAllExpense() {
        const expenseList = [];
        const querySnapshot = await getDocs(collection(db, "expenses"));
        querySnapshot.forEach((doc) => {
            expenseList.push({ id: doc.id, ...doc.data() });
        });
        return expenseList;
    }

    // img for expense
    async uploadImgExpense(uid, imgUri) {
        try {
            console.log("start upload img expense");
            const storageRef = ref(storage, `expense/${uid}`);
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
                    const expenseRef = doc(db, "expenses", uid);
                    console.log("expense", expenseRef)
                    getDownloadURL(storageRef).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setDoc(
                            expenseRef,
                            { imgUrl: downloadURL },
                            { merge: true }
                        );
                    });
                }
            );
        } catch (e) {
            console.error(e);
        }
    }

    async getImgExpense(uid) {
        try {
            console.log("begin to get img expense");
            const q = query(
                collection(db, "expenses"),
                where("uid", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs[0].data().avatarUrl);
            return querySnapshot.docs[0].data().avatarUrl;
        } catch (e) {
            console.error(e);
        }
    }

    async getExpense(expenseId) {
        try {
            const q = query(
                collection(db, "expenses"),
                where("uid", "==",expenseId)
            )
            const expense = await getDoc(q);
            return expense;
        } catch (e) {
            console.log("Fail to get expense by Id")
        }
    }
    async getAmountByUserId(expenseId, userId) {
        try {
            const q = query(collection(db, "payments"),
                where("uid", "==", expenseId));
            const expense = await getDoc(q);
            console.log("Gia tien: ", expense['participants'][userId]);
            return expense['participants'][userId];
        } catch (e) {
            console.log();
        }
    }
    // Settle up
    async settleUp(expenseId, userId) {
        try {
            const docRef = await addDoc(collection(db, "payments"), {
                expenseId: expenseId,
                userId: userId,
                amount: this.getAmountByUserId(expenseId, userId),
                settleAt: new Date(),
            })
            console.log("Add payment successfully with ID", docRef.uid)
        } catch (e) {
            console.log("Settle up fail")
        }
    }
    // Split expense
    async splitExpense(expenseId, typeSplit, userSplits) {
        const amounts = this.getExpense(expenseId)['amounts']
        const participants = []
        switch (typeSplit) {
            case "equally":
                for (userSplit of userSplits) {
                    participants.push({
                        userId: userSplit.userId,
                        amount: amounts/length(userSplits)
                   })
                }
            case "unequally":
                participants = userSplits
            case "percent":
               for (userSplit of userSplits) {
                    participants.push({
                        userId: userSplit.userId,
                        amount: userSplit.amout * amounts
                   })
                }
        }
        const expenseRef = doc(db, "expenses", expenseId);
        // await setDoc(expenseRef, {participants}, { merge: true }); 
        await updateDoc(expenseRef, {
            participants: participants
        })
    }

    


}

export default ExpenseService;
