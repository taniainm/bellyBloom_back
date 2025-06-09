import { db, auth } from "./firebase-init.js";
import {
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "/login";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const content = document.getElementById("content");
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.href = "/login";
            } catch (err) {
                alert("Gagal logout: " + err.message);
            }
        });
    }

    if (toggleSidebar && sidebar && content) {
        toggleSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
            content.classList.toggle("full-width");
        });
    }

    countUsers();
    countArticles();
    countSkincare();
});

// Hitung jumlah pengguna dari Firestore
async function countUsers() {
    try {
        const snapshot = await getDocs(collection(db, "users"));
        document.getElementById("userCount").textContent = snapshot.size;
    } catch (err) {
        document.getElementById("userCount").textContent = "-";
    }
}

// Hitung jumlah artikel dari API backend (MySQL)
async function countArticles() {
    try {
        const response = await fetch("/api/articleCount");
        const data = await response.json();
        document.getElementById("articleCount").textContent = data.count;
    } catch (err) {
        document.getElementById("articleCount").textContent = "-";
    }
}

// Hitung jumlah skincare dari API backend (MySQL)
async function countSkincare() {
    try {
        const response = await fetch("/api/skincareCount");
        const data = await response.json();
        document.getElementById("skincareCount").textContent = data.count;
    } catch (err) {
        document.getElementById("skincareCount").textContent = "-";
    }
}
