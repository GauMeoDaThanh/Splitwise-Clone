import { db, storage, USER_COLLECTION } from "../firebaseConfig";
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";
import {
    ref,
    getStorage,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

const initUser = {
    email: "",
    avatarUrl: "",
    friends: [],
    username: "",
    uid: "",
};
class UserService {
    constructor(user = null) {
        if (UserService.instance == null) {
            this.user = initUser;
            UserService.instance = this;
        }
        return UserService.instance;
    }

    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async createUser(uid, username, email) {
        console.log("start add user");
        this.user = {
            ...this.user,
            username,
            email,
            uid,
        };
        try {
            const customRef = uid;
            const docRef = doc(collection(db, USER_COLLECTION), customRef);
            await setDoc(docRef, this.user);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async getUser(uid) {
        console.log(`start get user ${uid}`);
        const userRef = doc(db, USER_COLLECTION, uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            console.log(userSnap.data());
            return userSnap.data();
        } else {
            console.log("Khong tim thay");
            return null;
        }
    }

    async uploadAvatar(uid, imgUri) {
        try {
            console.log("start upload avatar");
            const storageRef = ref(storage, `avatars/${uid}`);
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
                    const userRef = doc(db, USER_COLLECTION, uid);
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

    async createUser(uid, username, email) {
        console.log("start add user");
        this.user = {
            ...this.user,
            username,
            email,
            uid,
        };
        try {
            const customRef = uid;
            const docRef = doc(collection(db, "users"), customRef);
            await setDoc(docRef, this.user);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async getUser(uid) {
        console.log(`start get user ${uid}`);
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            console.log(userSnap.data());
            return userSnap.data();
        } else {
            console.log("Khong tim thay");
            return null;
        }
    }

    async uploadAvatar(uid, imgUri) {
        try {
            console.log("start upload avatar");
            const storageRef = ref(storage, `avatars/${uid}`);
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
                    const userRef = doc(db, "users", uid);
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

    async getAvatar(uid) {
        try {
            console.log("begin to get avatar");
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs[0].data().avatarUrl);
            return querySnapshot.docs[0].data().avatarUrl;
        } catch (e) {
            console.error(e);
        }
    }

    async setUsername(uid, username) {
        console.log("start update username");
        const userRef = doc(db, "users", uid);
        try {
            await setDoc(userRef, { username }, { merge: true });
            console.log(
                `Document with ID ${uid} updated with username ${username}`
            );
        } catch (e) {
            console.error(e);
        }
    }

    async getUserIDWithMail(mail) {
        try {
            console.log("start get user with mail");
            const q = query(
                collection(db, "users"),
                where("email", "==", mail)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length === 0) {
                console.log("Khong tim thay User");
                return null;
            } else {
                return querySnapshot.docs[0].data().uid;
            }
        } catch (e) {
            console.log(e);
        }
    }
    async getAvatar(uid) {
        try {
            console.log("begin to get avatar");
            const q = query(
                collection(db, USER_COLLECTION),
                where("uid", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs[0].data().avatarUrl);
            return querySnapshot.docs[0].data().avatarUrl;
        } catch (e) {
            console.error(e);
        }
    }

    async setUsername(uid, username) {
        console.log("start update username");
        const userRef = doc(db, USER_COLLECTION, uid);
        try {
            await setDoc(userRef, { username }, { merge: true });
            console.log(
                `Document with ID ${uid} updated with username ${username}`
            );
        } catch (e) {
            console.error(e);
        }
    }

    async getUserIDWithMail(mail) {
        try {
            console.log("start get user with mail");
            const q = query(
                collection(db, USER_COLLECTION),
                where("email", "==", mail)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length === 0) {
                console.log("Khong tim thay User");
                return null;
            } else {
                return querySnapshot.docs[0].data().uid;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default UserService;
