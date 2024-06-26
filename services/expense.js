import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  getDoc,
  updateDoc,
  getDocs,
  where,
  orderBy,
  onSnapshot,
  limit,
  deleteDoc,
} from "firebase/firestore";
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
import { storage } from "../firebaseConfig";
import { useRef } from "react";
import ActivityService from "./activity";

const friendService = FriendService.getInstance();
const authenticateService = AuthenticateService.getInstance();
const userService = UserService.getInstance();
const groupService = GroupService.getInstance();
const initExpense = {
  createBy: "",
  createAt: new Date(),
  groupId: [],
  imgUrl: "",
  isSettle: false,
  amounts: 0,
  paidBy: "",
  description: "",
  participants: [],
  comments: {},
};
class ExpenseService {
  static expenseId = "";
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

  async createExpense(
    createAt,
    amounts,
    groupId = "",
    description,
    participants
  ) {
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
      const docRef = await addDoc(collection(db, "expenses"), expense);
      console.log("Add expense successfully with ID: ", docRef.id);
      expenseId = docRef.id;
      console.log("ID Exp", this.expenseId);
      const members = participants
        .filter((participant) => participant.userId !== expense.paidBy)
        .map((participant) => participant.userId);
      if (groupId != "") {
        const groupInfo = await GroupService.getInstance().getGroupInfo(
          groupId[0]
        );
        ActivityService.getInstance().aAddExpense(
          groupId[0],
          groupInfo.name,
          expense.paidBy,
          expense.participants,
          expense.description,
          members
        );
      } else {
        ActivityService.getInstance().aAddExpense(
          "",
          "",
          expense.paidBy,
          expense.participants,
          expense.description,
          members
        );
      }
    } catch (e) {
      console.error("Error adding expense ", e);
    }
  }

  async getParticipants(selectedParticipants) {
    const uniqueMembers = new Set();
    const members = [];
    const participants = [];
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
      participants.push(await userService.getUserById(member.userId));
    }
    return participants;
  }
  get expenseId() {
    return expenseId;
  }

  // Handle input friend or group to share bill
  async handleInputParticipants(text, selectedParticipants) {
    const idFr = await friendService.getFriendList(auth.currentUser?.uid);
    const users = [];
    for (id of idFr) {
      users.push(await userService.getUserById(id));
    }
    groupList = await groupService.getGroupOfIdAcc(auth.currentUser?.uid);
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
    let filteredSuggestions = [...filteredUsers, ...filteredGroups];
    // Loại sugg nếu đã chọn
    const selectedUserIds = new Set(
      selectedParticipants.map((participant) => participant.userId)
    );
    const selectedGroupIds = new Set(
      selectedParticipants.map((participant) => participant.groupId)
    );
    filteredSuggestions = filteredSuggestions.filter((sugg) => {
      if (sugg.uid) {
        return !selectedUserIds.has(sugg.uid);
      } else if (sugg.id) {
        return !selectedGroupIds.has(sugg.id);
      }
    });
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

  //   async updateExpense(expenseId, data) {
  //   try {
  //     const docRef = doc(db, "expenses", expenseId);
  //     const docSnapshot = await getDoc(docRef);

  //     if (!docSnapshot.exists) {
  //       throw new Error(`Expense with ID '${expenseId}' not found`);
  //     }

  //     await updateDoc(docRef, data);
  //     console.log(`Expense '${expenseId}' updated successfully`);
  //   } catch (error) {
  //     console.error("Error updating expense:", error);
  //   }
  // }

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
          console.log("expense", expenseRef);
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDoc(expenseRef, { imgUrl: downloadURL }, { merge: true });
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
      const q = query(collection(db, "expenses"), where("uid", "==", uid));
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
        where("uid", "==", expenseId)
      );
      const expense = await getDoc(q);
      return expense;
    } catch (e) {
      console.log("Fail to get expense by Id");
    }
  }
  async getAmountByUserId(expenseId, userId) {
    try {
      const q = query(
        collection(db, "payments"),
        where("uid", "==", expenseId)
      );
      const expense = await getDoc(q);
      console.log("Gia tien: ", expense["participants"][userId]);
      return expense["participants"][userId];
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
      });
      console.log("Add payment successfully with ID", docRef.uid);
    } catch (e) {
      console.log("Settle up fail");
    }
  }
  // Split expense
  async splitExpense(expenseId, typeSplit, userSplits) {
    const amounts = this.getExpense(expenseId)["amounts"];
    const participants = [];
    switch (typeSplit) {
      case "equally":
        for (userSplit of userSplits) {
          participants.push({
            userId: userSplit.userId,
            amount: amounts / length(userSplits),
          });
        }
      case "unequally":
        participants = userSplits;
      case "percent":
        for (userSplit of userSplits) {
          participants.push({
            userId: userSplit.userId,
            amount: userSplit.amout * amounts,
          });
        }
    }
    const expenseRef = doc(db, "expenses", expenseId);
    // await setDoc(expenseRef, {participants}, { merge: true });
    await updateDoc(expenseRef, {
      participants: participants,
    });
  }

  async getExpensesByGroupId(groupId) {
    const expenses = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, "expenses"),
        where("groupId", "array-contains", groupId),
        orderBy("createAt", "desc")
      )
    );

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    return expenses;
  }

  async getExpenseById(expenseId) {
    const expenseRef = doc(db, "expenses", expenseId);
    const expense = await getDoc(expenseRef, expenseId);
    return expense.data();
  }

  async listenToFriendDetail(expenseId, callback) {
    const expenseRef = doc(db, "expenses", expenseId);
    const unsubscribe = onSnapshot(expenseRef, (expenseInfo) => {
      let expenseData = expenseInfo.data();
      callback(expenseData);
    });
    return () => unsubscribe();
  }

  async getDebtInfo(expenseId, userPaidBy) {
    try {
      const debt = [];
      const expense = await this.getExpenseById(expenseId);
      const participants = expense.participants;
      debt.push(
        userPaidBy + " paid " + expense.amounts.toLocaleString("de-De") + "vnd"
      );

      const usernames = await Promise.all(
        participants.map(async (participant) => {
          const user = await UserService.getInstance().getUserById(
            participant.userId
          );
          if (user) {
            return user.username;
          } else {
            console.warn(
              "Error fetching user data for participant:",
              participant.userId
            );
            return null;
          }
        })
      );

      for (let i = 1; i < participants.length; i++) {
        if (participants[i].amount > 0) {
          debt.push(
            usernames[i] +
              " owes " +
              userPaidBy +
              " " +
              participants[i].amount.toLocaleString("de-De") +
              " vnd"
          );
        }
      }
      return debt;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getYourPaid(expenses) {
    let yourOwe = 0;
    let yourLent = 0;
    let othersPaid = 0;
    for (expense of expenses) {
      // Bill chua thanh toan
      if (!expense.isSettle) {
        for (par of expense.participants) {
          if (par.userId === auth.currentUser.uid) {
            // Tiền bạn chưa trả bill họ
            if (!par.settleUp) {
              yourOwe += parseFloat(par.amount);
            }
          }
        }
        // Khoản bạn đã trả trong group, và người khác đã trả bill bạn
        if (expense.paidBy === auth.currentUser.uid) {
          yourLent += expense.amounts;
          // Tiền phải trả cho bill mình
          yourOwe += expense.participants[0].amount;
          for (par of expense.participants.slice(1)) {
            if (par.settleUp) {
              othersPaid += par.amount;
            }
          }
        }
      }
    }
    //Tổng bạn trả, tổng nợ và tổng họ đã trả cho bill bạn
    return (yourLent - yourOwe - othersPaid).toFixed(0);
  }

  async getTotalDifference(differenceList) {
    const numberArray = differenceList.map(parseFloat);
    const totalDifference = numberArray.reduce(
      (sum, current) => sum + current,
      0
    );
    return totalDifference;
  }

  async calculateSurplusAmounts(expenseList) {
    const surplusAmounts = [];

    for (const expense of expenseList) {
      const userParticipant = expense.participants.find(
        (participant) => participant.userId === auth.currentUser.uid
      );

      let totalOwed = 0;
      if (expense.isSettle) totalOwed = "settled up";
      else if (expense.paidBy === auth.currentUser.uid) {
        totalOwed += expense.amounts;
        totalOwed -= userParticipant.amount;
      } else if (userParticipant) {
        if (userParticipant.settleUp) {
          totalOwed = "settled up";
        } else {
          totalOwed = -userParticipant.amount;
        }
      }

      surplusAmounts.push(totalOwed);
    }

    return surplusAmounts;
  }

  async getTotalDifference(differenceList) {
    const numberArray = differenceList.map(parseFloat);
    const totalDifference = numberArray.reduce(
      (sum, current) => sum + current,
      0
    );
    return totalDifference;
  }

  async handlePayment(expenseId, userId) {
    const expenseRef = doc(db, "expenses", expenseId);
    try {
      const expenseDoc = await getDoc(expenseRef);
      const expenseData = expenseDoc.data();
      const participants = expenseData.participants;

      const participantIndex = participants.findIndex(
        (participant) => participant.userId === userId
      );
      if (participantIndex === -1) {
        throw new Error("User not found in expense participants");
      }

      const updatedParticipants = [
        ...participants.slice(0, participantIndex),
        { ...participants[participantIndex], settleUp: true },
        ...participants.slice(participantIndex + 1),
      ];
      await updateDoc(expenseRef, { participants: updatedParticipants });
      // Cập nhật nếu hoá đơn thanh toán hết rồi
      const allSettled = updatedParticipants.every(
        (participant) => participant.settleUp == true
      );
      if (allSettled) {
        await updateDoc(expenseRef, { isSettle: true });
        console.log("Expense is now fully settled");
      }
      alert("You settled up successfully");

      ActivityService.getInstance().aSettleUp(expenseData, userId);
    } catch (error) {
      console.error("Error processing payment:", error.message); // Handle errors
    }
  }

  async getExpensesByFriendId(friendId) {
    const expenses = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, "expenses"),
        where("groupId", "==", []),
        orderBy("createAt", "desc")
      )
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const participantUserIds = data.participants.map(
        (participant) => participant.userId
      );
      if (
        participantUserIds.includes(friendId) &&
        participantUserIds.includes(auth.currentUser.uid)
      ) {
        expenses.push({ id: doc.id, ...data });
      }
    });
    return expenses;
  }
}

export default ExpenseService;
