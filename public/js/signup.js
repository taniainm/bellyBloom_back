// signup.js
import { auth, db } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;
        const password2 = form.password2.value;
        const phone = form.phone.value;

        if (password !== password2) {
            alert("Password tidak cocok!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email,
                phone,
                role: "user", // Default role
            });

            alert("Akun berhasil dibuat!");
            window.location.href = "/prohamil";
        } catch (error) {
            alert("Gagal daftar: " + error.message);
        }
    });
});
