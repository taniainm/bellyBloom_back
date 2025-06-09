// login.js
import { auth } from "./firebase-init.js";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                // 1. Atur persistence
                await setPersistence(auth, browserSessionPersistence);

                // 2. Login dengan Firebase
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                // 3. Dapatkan token TERBARU dengan claims
                const user = userCredential.user;
                await user.getIdToken(true); // Force refresh token
                const tokenResult = await user.getIdTokenResult();

                // 4. Cek role dari custom claims
                const role = tokenResult.claims.role;
                console.log("Role:", role);

                // 5. Redirect berdasarkan role
                if (role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/home";
                }
            } catch (error) {
                alert(`Login gagal: ${error.message}`);
            }
        });
    }
});
