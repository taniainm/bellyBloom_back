// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

// Konfigurasi Firebase milikmu (ganti jika ada perubahan)
const firebaseConfig = {
    apiKey: "AIzaSyAch9lYvx_gvNmJ8KurN8DkFFBYtaLpYoE",
    authDomain: "bellybloom-f895a.firebaseapp.com",
    databaseURL:
        "https://bellybloom-f895a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bellybloom-f895a",
    storageBucket: "bellybloom-f895a.appspot.com", // <- perbaiki: tambahkan ".appspot.com"
    messagingSenderId: "828296953658",
    appId: "1:828296953658:web:4ab67cbf53fce836cf9a03",
    measurementId: "G-5SWMGSP3J0",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
