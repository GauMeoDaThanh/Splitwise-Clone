import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const initUser = {
    uid: "",
    createBy: "",
    createAt: new Date(),
    groupId: "",
    imgUrl: "",
    isSettle: false,
    amounts: 0,
    paidBy: [],
    description: "",
    participants: [
        {
            userId: "",
            amount: 0,
        },
    ],
    comments: "",
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

    async createExpense(
        createBy,
        createAt,
        groupId,
        imgUrl,
        amounts,
        paidBy,
        description,
        participants
    ) {
        console.log("Start add new expense");
        this.expense = {
            ...this.expense,
            createBy,
            createAt,
            groupId,
            imgUrl,
            amounts,
            paidBy,
            description,
            participants,
        };
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
}

export default ExpenseService
