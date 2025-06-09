import { db } from "./firebase-init.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
    updatePassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    const form = document.querySelector("form");
    const currentPasswordInput = document.getElementById("password-lama");
    const newPasswordInput = document.getElementById("password-baru");
    const confirmPasswordInput = document.getElementById("konfirmasi-password");
    const deleteAccountBtn = document.getElementById("deleteAccountBtn");
    const confirmModal = document.getElementById("confirmModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    let isLoggingOut = false;
    let isDeletingAccount = false;

    // Logout handler
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

    // Modal hapus akun
    if (
        deleteAccountBtn &&
        confirmModal &&
        confirmDeleteBtn &&
        cancelDeleteBtn
    ) {
        deleteAccountBtn.addEventListener("click", (e) => {
            e.preventDefault();
            confirmModal.style.display = "block";
        });
        cancelDeleteBtn.addEventListener("click", () => {
            confirmModal.style.display = "none";
        });
        confirmDeleteBtn.addEventListener("click", async () => {
            confirmModal.style.display = "none";
            await deleteAccount();
        });
    }

    // Ganti password
    if (
        form &&
        currentPasswordInput &&
        newPasswordInput &&
        confirmPasswordInput
    ) {
        let errorContainer;
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const currentPassword = currentPasswordInput.value;
            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                showError("Harap isi semua kolom password");
                return;
            }
            if (newPassword !== confirmPassword) {
                showError("Password baru dan konfirmasi password tidak cocok");
                return;
            }
            if (newPassword.length < 6) {
                showError("Password baru harus minimal 6 karakter");
                return;
            }

            try {
                const user = auth.currentUser;
                if (!user) {
                    showError("Anda belum login.");
                    return;
                }
                const credential = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);

                showSuccess("Password berhasil diubah!");
                form.reset();
            } catch (error) {
                console.error("Error changing password:", error);

                // Penanganan error spesifik
                switch (error.code) {
                    case "auth/invalid-credential":
                        showError("Password saat ini salah");
                        break;
                    case "auth/requires-recent-login":
                        showError(
                            "Sesi login terlalu lama. Silakan login ulang dan coba lagi."
                        );
                        break;
                    case "auth/weak-password":
                        showError(
                            "Password terlalu lemah. Gunakan kombinasi yang lebih kuat."
                        );
                        break;
                    default:
                        showError("Terjadi kesalahan: " + error.message);
                }
            }

            function showError(message) {
                if (!errorContainer) {
                    errorContainer = document.createElement("div");
                    errorContainer.className = "error-message";
                    form.insertBefore(errorContainer, form.firstChild);
                }
                errorContainer.innerHTML = `
                    <div class="alert alert-error">
                        <span>${message}</span>
                    </div>
                `;

                setTimeout(() => {
                    if (errorContainer) {
                        errorContainer.remove();
                        errorContainer = null;
                    }
                }, 3000);
            }

            function showSuccess(message) {
                if (!errorContainer) {
                    errorContainer = document.createElement("div");
                    errorContainer.className = "error-message";
                    form.insertBefore(errorContainer, form.firstChild);
                }
                errorContainer.innerHTML = `
                    <div class="alert alert-success">
                        <span>${message}</span>
                    </div>
                `;
                setTimeout(() => {
                    if (errorContainer) {
                        errorContainer.remove();
                        errorContainer = null;
                    }
                }, 3000);
            }
        });
    }

    // Auth state handler
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            if (
                !isLoggingOut &&
                !isDeletingAccount &&
                window.location.pathname === "/password"
            ) {
                alert("Silakan login terlebih dahulu.");
                window.location.href = "/login";
            }
        }
    });

    // Fungsi hapus akun
    async function deleteAccount() {
        isDeletingAccount = true;
        const user = auth.currentUser;
        if (!user) {
            alert("Anda harus login terlebih dahulu");
            isDeletingAccount = false;
            return;
        }
        try {
            const password = prompt(
                "Masukkan password Anda untuk konfirmasi penghapusan akun:"
            );
            if (!password) {
                isDeletingAccount = false;
                return;
            }
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            );
            await reauthenticateWithCredential(user, credential);

            // Hapus data Firestore
            try {
                const userDocRef = doc(db, "users", user.uid);
                await deleteDoc(userDocRef);
            } catch (error) {
                console.log(
                    "Tidak ada data pengguna di Firestore atau gagal dihapus:",
                    error
                );
            }

            await deleteUser(user);

            alert("Akun berhasil dihapus");
            window.location.href = "/";
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                alert(
                    "Sesi login Anda sudah kadaluarsa. Silakan login ulang dan coba lagi."
                );
            } else {
                alert(`Gagal menghapus akun: ${error.message}`);
            }
        }
        isDeletingAccount = false;
    }
});
