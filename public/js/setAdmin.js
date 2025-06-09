import { db, auth } from "./firebase-init.js";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

async function loadAdminProfile() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Cari data user di Firestore berdasarkan email
            const snapshot = await getDocs(collection(db, "users"));
            let found = false;
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.email === user.email && data.role === "admin") {
                    document.getElementById("adminName").value =
                        data.nama || data.name || "";
                    document.getElementById("adminEmail").value =
                        data.email || "";
                    found = true;
                }
            });
            if (!found) {
                document.getElementById("adminName").value = "";
                document.getElementById("adminEmail").value = user.email || "";
            }
        }
    });
}
loadAdminProfile();

// Simpan perubahan profil admin
document
    .getElementById("btnSaveProfile")
    .addEventListener("click", async function () {
        const name = document.getElementById("adminName").value.trim();
        const email = document.getElementById("adminEmail").value.trim();
        const user = auth.currentUser;
        if (!user) return alert("Belum login!");

        // Cari doc id user di Firestore
        const snapshot = await getDocs(collection(db, "users"));
        let userId = null;
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.email === user.email && data.role === "admin") {
                userId = docSnap.id;
            }
        });
        if (!userId) return alert("Data admin tidak ditemukan di database!");

        // Update data
        await updateDoc(doc(db, "users", userId), {
            nama: name,
            email: email,
        });
        alert("Profil berhasil diperbarui!");
    });

// -------------------- MANAJEMEN ADMIN LAIN --------------------
document.addEventListener("DOMContentLoaded", async function () {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const content = document.getElementById("content");
    const adminTable = document.getElementById("adminTable");

    // Sidebar toggle
    if (toggleSidebar && sidebar && content) {
        toggleSidebar.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
            content.classList.toggle("full-width");
        });
    }

    // Tampilkan daftar admin dari Firestore
    async function renderAdmins() {
        if (!adminTable) return;
        adminTable.innerHTML = "";
        const snapshot = await getDocs(collection(db, "users"));
        let found = false;
        snapshot.forEach((docSnap) => {
            const user = { id: docSnap.id, ...docSnap.data() };
            if (user.role === "admin") {
                found = true;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nama || user.name || "-"}</td>
                    <td>${user.email || "-"}</td>
                    <td>
                        <button class="delete" onclick="deleteAdmin('${
                            user.id
                        }', '${user.email}')">Hapus</button>
                    </td>
                `;
                adminTable.appendChild(row);
            }
        });
        if (!found) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="4" style="text-align:center;">Tidak ada admin.</td>`;
            adminTable.appendChild(row);
        }
    }

    // Hapus admin dari Firestore & Auth
    window.deleteAdmin = async function (id, email) {
        if (!confirm("Yakin ingin menghapus admin ini?")) return;

        // 1. Hapus dari Firestore
        await deleteDoc(doc(db, "users", id));

        // 2. Hapus dari Auth (hanya bisa jika user login sebagai admin yang akan dihapus, atau gunakan admin SDK di backend)
        // Di sisi client, hanya bisa menghapus akun sendiri:
        const user = auth.currentUser;
        if (user && user.email === email) {
            try {
                await deleteUser(user);
                alert("Akun admin & autentikasi berhasil dihapus.");
            } catch (err) {
                alert(
                    "Akun di Firestore terhapus, tapi gagal hapus dari Auth: " +
                        err.message
                );
            }
        } else {
            alert(
                "Akun di Firestore terhapus. Untuk hapus akun Auth, gunakan Firebase Admin SDK di backend."
            );
        }

        renderAdmins();
    };

    // Inisialisasi awal
    renderAdmins();
});

import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Tombol logout
document
    .getElementById("logoutBtn")
    .addEventListener("click", async function () {
        try {
            await signOut(auth);
            window.location.href = "/login"; // arahkan ke halaman login setelah logout
        } catch (err) {
            alert("Gagal logout: " + err.message);
        }
    });

document
    .getElementById("btnChangePassword")
    .addEventListener("click", async function () {
        const oldPassword = document.getElementById("oldPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmNewPassword = document
            .getElementById("confirmNewPassword")
            .value.trim();

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            alert("Mohon isi semua kolom password.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Password baru dan konfirmasi tidak sama.");
            return;
        }
        const user = auth.currentUser;
        if (!user || !user.email) {
            alert("User tidak ditemukan atau belum login.");
            return;
        }

        try {
            // Re-authenticate user
            const credential = EmailAuthProvider.credential(
                user.email,
                oldPassword
            );
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, newPassword);

            // Kosongkan input
            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmNewPassword").value = "";

            alert("Password berhasil diubah!");
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert("Password lama salah.");
            } else {
                alert("Gagal mengubah password: " + error.message);
            }
        }
    });
