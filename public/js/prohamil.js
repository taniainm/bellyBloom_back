// js/profil.js
import { db } from "./firebase-init.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const nama = document.getElementById("nama").value;
                const usia = parseInt(document.getElementById("usia").value);
                const hpht = document.getElementById("hpht").value;

                try {
                    await updateDoc(doc(db, "users", user.uid), {
                        nama,
                        usia,
                        hpht,
                        email: user.email,
                        updatedAt: new Date(),
                    });

                    alert("Profil berhasil disimpan!");
                    window.location.href = "/home";
                } catch (error) {
                    alert("Gagal menyimpan profil: " + error.message);
                }
            });
        } else {
            alert("Silakan login terlebih dahulu.");
            window.location.href = "/login";
        }
    });
});
