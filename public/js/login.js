// login.js
import { auth } from "./firebase-init.js";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form"); // atau pakai id jika kamu pakai <form id="loginForm">

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                // Atur session persistence
                await setPersistence(auth, browserSessionPersistence);

                // Login dengan email dan password
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                alert("Login berhasil!");
                window.location.href = "/home";
            } catch (error) {
                alert(`Login gagal: ${error.message}`);
            }
        });
    }
});
