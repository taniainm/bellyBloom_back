import { db } from "./firebase-init.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    const form = document.querySelector("form");
    const deleteAccountBtn = document.getElementById("deleteAccountBtn");
    const confirmModal = document.getElementById("confirmModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    let userRef = null;
    let isLoggingOut = false;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
            if (confirmLogout) {
                try {
                    isLoggingOut = true;
                    await signOut(auth);
                    window.location.href = "/";
                } catch (error) {
                    alert("Gagal logout: " + error.message);
                }
            }
        });
    }

    // Tampilkan modal konfirmasi saat tombol hapus diklik
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener("click", (e) => {
            e.preventDefault();
            confirmModal.style.display = "block";
        });
    }

    // Tutup modal saat tombol batal diklik
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener("click", () => {
            confirmModal.style.display = "none";
        });
    }

    // Proses penghapusan akun saat konfirmasi
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", async () => {
            confirmModal.style.display = "none";
            await deleteAccount(auth);
        });
    }

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            if (!isLoggingOut && window.location.pathname === "/akun") {
                alert("Silakan login terlebih dahulu.");
                window.location.href = "/login";
            }
            return;
        }

        userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            document.getElementById("nama").value = data.nama || "";
            document.getElementById("email").value =
                data.email || user.email || "";
            document.getElementById("telepon").value = data.phone || "";
            document.getElementById("lahir").value = data.tanggalLahir || "";
            document.getElementById("alamat").value = data.alamat || "";

            if (data.hpht && !data.perkiraanLahir) {
                document.getElementById("perkiraanLahir").value =
                    hitungPerkiraanLahir(data.hpht);
            } else if (data.perkiraanLahir) {
                document.getElementById("perkiraanLahir").value =
                    data.perkiraanLahir;
            }
        }
    });

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!userRef) {
                alert("User belum terdeteksi. Silakan tunggu...");
                return;
            }

            const nama = document.getElementById("nama").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("telepon").value;
            const tanggalLahir = document.getElementById("lahir").value;
            const alamat = document.getElementById("alamat").value;
            const perkiraanLahir =
                document.getElementById("perkiraanLahir").value;

            try {
                await updateDoc(userRef, {
                    nama,
                    email,
                    phone,
                    tanggalLahir,
                    alamat,
                    perkiraanLahir,
                    updatedAt: new Date().toISOString(),
                });

                alert("Profil berhasil diperbarui!");
            } catch (error) {
                alert("Gagal menyimpan data: " + error.message);
            }
        });
    }
});

async function deleteAccount(auth) {
    const user = auth.currentUser;

    if (!user) {
        alert("Anda harus login terlebih dahulu");
        return;
    }

    try {
        // Minta password untuk re-authenticate
        const password = prompt(
            "Masukkan password Anda untuk konfirmasi penghapusan akun:"
        );
        if (!password) return;

        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        // 1. Hapus data pengguna dari Firestore (jika ada)
        try {
            const userDocRef = doc(db, "users", user.uid);
            await deleteDoc(userDocRef);
        } catch (error) {
            console.log(
                "Tidak ada data pengguna di Firestore atau gagal dihapus:",
                error
            );
        }

        // 2. Hapus akun dari Firebase Authentication
        await deleteUser(user);

        alert("Akun berhasil dihapus");
        window.location.href = "/"; // Redirect ke halaman logout
    } catch (error) {
        console.error("Error deleting account:", error);

        if (error.code === "auth/requires-recent-login") {
            alert(
                "Sesi login Anda sudah kadaluarsa. Silakan login ulang dan coba lagi."
            );
        } else {
            alert(`Gagal menghapus akun: ${error.message}`);
        }
    }
}

function hitungPerkiraanLahir(hpht) {
    const hphtDate = new Date(hpht);
    hphtDate.setDate(hphtDate.getDate() + 280); // Tambah 280 hari
    return hphtDate.toISOString().split("T")[0]; // Format: yyyy-mm-dd
}
