import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import FriendService from "./friend";
import AuthenticateService from "./authentication";
import UserService from "./user";
import GroupService from "./group";

const friendService = FriendService.getInstance();
const authenticateService = AuthenticateService.getInstance();
const userService = UserService.getInstance();
const groupService = GroupService.getInstance();
const initUser = {
    // uid: "",
    createBy: authenticateService.idAcc,
    createAt: new Date(),
    groupId: [],
    imgUrl: "",
    isSettle: false,
    amounts: 0,
    paidBy: authenticateService.idAcc,
    description: "",
    participants: [],
    comments: {},
};
class ExpenseService {
    constructor(expense = null) {
        if (ExpenseService.instance == null) {
            this.expense = initUser;
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

    async createExpense(createAt, imgUrl, amounts, description, participants) {
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
        this.expense = {
            ...this.expense,
            createAt,
            groupId,
            imgUrl,
            amounts,
            description,
            participants,
        };
        console.log("Expense: ", this.expense);
        try {
            const docRef = await addDoc(
                collection(db, "expenses"),
                this.expense
            );
            console.log("Add expense successfully with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding expense ", e);
        }
    }

    // Handle input friend or group to share bill
    async handleInputParticipants(text) {
        const idFr = await friendService.getFriendList(
            authenticateService.idAcc
        );
        const users = [];
        for (id of idFr) {
            users.push(await userService.getUser(id));
        }
        groupList = await groupService.getGroupOfIdAcc(
            authenticateService.idAcc
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
        this.expense = {
            ...this.expense,
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
    await setDoc(groupRef, { ...this.expense }, { merge: true });
    console.log(
      `Document with ID ${groupId} updated with username ${auth.currentUser.uid}`
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
                    const userRef = doc(db, "expenses", uid);
                    getDownloadURL(storageRef).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setDoc(
                            userRef,
                            { avatarUrl: downloadURL },
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
}

export default ExpenseService;
