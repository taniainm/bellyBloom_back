import { db, auth } from "./firebase-init.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit as limitDocs,
    where,
    serverTimestamp,
    doc,
    getDoc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

class PostService {
    // Membuat posting baru
    static async createPost({ content, tags }) {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        // Ambil nama user dari Firestore collection "users"
        let userName = user.displayName || user.email || "Anonymous";
        let userAvatar = user.photoURL || null;
        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                userName = data.nama || data.name || userName;
                if (data.avatar) userAvatar = data.avatar;
            }
        } catch (err) {}

        const postData = {
            userId: user.uid,
            userName: userName,
            userAvatar: userAvatar,
            title: tags.join(", "),
            content,
            tags,
            createdAt: serverTimestamp(),
            likeCount: 0,
            commentCount: 0,
        };

        const docRef = await addDoc(collection(db, "posts"), postData);
        return { id: docRef.id, ...postData };
    }

    // Mendapatkan semua posting
    static async getPosts(limitCount = 20) {
        const q = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            limitDocs(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    static async getPostsByUser(userId) {
        const q = query(
            collection(db, "posts"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    // Mendapatkan posting by user
    static async getPostsByUser(userId) {
        const q = query(
            collection(db, "posts"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    static async deletePost(postId) {
        await deleteDoc(doc(db, "posts", postId));
    }
}

export default PostService;
