import { db, auth } from "./firebase-init.js";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const userTable = document.getElementById("userTable");
const userForm = document.getElementById("userForm");
const inputName = document.getElementById("userName");
const inputEmail = document.getElementById("userEmail");
const inputRole = document.getElementById("userRole");

// Tampilkan daftar pengguna dari Firestore
async function renderUsers() {
    userTable.innerHTML = "";
    const snapshot = await getDocs(collection(db, "users"));
    if (snapshot.empty) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" style="text-align:center;">Tidak ada data pengguna.</td>`;
        userTable.appendChild(row);
        return;
    }
    snapshot.forEach((docSnap) => {
        const user = { id: docSnap.id, ...docSnap.data() };
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nama || user.name || "user"}</td>
            <td>${user.email || "user"}</td>
            <td>${user.role ? user.role : "user"}</td>
            <td>
                <button class="delete" onclick="deleteUser('${
                    user.id
                }')">Hapus</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Tambah admin baru ke Firestore
window.showForm = function () {
    userForm.style.display = "block";
    inputName.value = "";
    inputEmail.value = "";
    inputRole.value = "admin";
};

window.saveUser = async function () {
    const nama = inputName.value.trim();
    const email = inputEmail.value.trim();
    const role = inputRole.value.trim();

    if (!nama || !email || !role) {
        alert("Mohon isi semua kolom.");
        return;
    }

    // Cek apakah email sudah ada
    const snapshot = await getDocs(collection(db, "users"));
    let exists = false;
    snapshot.forEach((docSnap) => {
        const user = docSnap.data();
        if (user.email === email) exists = true;
    });
    if (exists) {
        alert("Email sudah terdaftar.");
        return;
    }

    await addDoc(collection(db, "users"), {
        nama,
        email,
        role,
    });

    userForm.style.display = "none";
    renderUsers();
};

window.cancelForm = function () {
    userForm.style.display = "none";
};

// Hapus pengguna dari Firestore
window.deleteUser = async function (id) {
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
        await deleteDoc(doc(db, "users", id));
        renderUsers();
    }
};

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

if (toggleSidebar) {
    toggleSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        content.classList.toggle("full-width");
    });
}

document.addEventListener("DOMContentLoaded", () => {
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
});

// Inisialisasi awal
renderUsers();
