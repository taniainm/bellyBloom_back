import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { PostUI } from "./tuliscerita-ui.js";

// Cek login saat halaman dibuka
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "/login";
    } else {
        // Ambil nama user dari Firestore collection "users"
        const userNameSpan = document.querySelector(".user-info span");
        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists() && userNameSpan) {
                const data = docSnap.data();
                userNameSpan.textContent =
                    data.nama ||
                    data.name ||
                    user.displayName ||
                    user.email ||
                    "User";
            } else if (userNameSpan) {
                userNameSpan.textContent =
                    user.displayName || user.email || "User";
            }
        } catch (err) {
            if (userNameSpan)
                userNameSpan.textContent =
                    user.displayName || user.email || "User";
        }
    }
});

// Inisialisasi aplikasi ketika DOM siap
document.addEventListener("DOMContentLoaded", () => {
    feather.replace();
    new PostUI();
});
