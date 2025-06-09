import { db, auth } from "./firebase-init.js";
import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const komunitasDiv = document.getElementById("komunitas");
let dataPostingan = []; // Akan diisi dari Firestore

// Ambil postingan dari Firestore
async function fetchPosts() {
    dataPostingan = [];
    const postsSnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
    );
    for (const docSnap of postsSnapshot.docs) {
        const post = {
            id: docSnap.id,
            ...docSnap.data(),
            komentar: [],
            komentarId: [],
        };
        // Ambil komentar untuk post ini
        const commentsSnapshot = await getDocs(
            query(
                collection(db, "comments"),
                where("postId", "==", post.id),
                orderBy("createdAt", "asc")
            )
        );
        post.komentar = commentsSnapshot.docs.map((c) => c.data().content);
        post.komentarId = commentsSnapshot.docs.map((c) => c.id); // simpan id dokumen komentar
        dataPostingan.push(post);
    }
    renderPostingan();
}

function renderPostingan() {
    komunitasDiv.innerHTML = "";
    dataPostingan.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        const komentarList = post.komentar
            .map(
                (k, i) => `
      <div class="comment-item">
        <span>${k}</span>
        <button onclick="hapusKomentar('${post.id}', ${i})">Hapus</button>
      </div>`
            )
            .join("");

        postDiv.innerHTML = `
      <div class="post-header">
        <strong>${post.userName || post.penulis || "-"}</strong>
        <span>${
            post.createdAt && post.createdAt.toDate
                ? post.createdAt.toDate().toLocaleDateString()
                : "-"
        }</span>
      </div>
      <div class="post-content">${post.content || post.isi || ""}</div>
      <div class="like">${post.likeCount || 0} Suka</div>
      <div class="comment">${post.komentar.length} Komentar</div>
      <div class="actions">
        <button onclick="hapusPostingan('${post.id}')">Hapus Postingan</button>
      </div>
      <div class="comment-list">
        ${komentarList || "<i>Tidak ada komentar</i>"}
      </div>
    `;
        komunitasDiv.appendChild(postDiv);
    });
}

// Untuk hapus postingan (dengan konfirmasi)
window.hapusPostingan = async function (postId) {
    const konfirmasi = confirm(
        "Apakah Anda yakin ingin menghapus postingan ini? Semua komentar juga akan dihapus."
    );
    if (!konfirmasi) return;

    try {
        // Hapus semua komentar terkait
        const commentsSnapshot = await getDocs(
            query(collection(db, "comments"), where("postId", "==", postId))
        );
        for (const commentDoc of commentsSnapshot.docs) {
            await deleteDoc(doc(db, "comments", commentDoc.id));
        }
        // Hapus postingan
        await deleteDoc(doc(db, "posts", postId));
        // Refresh data
        fetchPosts();
    } catch (err) {
        alert("Gagal menghapus postingan: " + err.message);
    }
};

// Untuk hapus komentar (hapus dari Firestore juga)
window.hapusKomentar = async function (postId, index) {
    const post = dataPostingan.find((p) => p.id === postId);
    const konfirmasi = confirm(
        `Apakah Anda yakin ingin menghapus komentar ini?`
    );
    if (konfirmasi) {
        const komentarDocId = post.komentarId[index];
        try {
            await deleteDoc(doc(db, "comments", komentarDocId));
            post.komentar.splice(index, 1);
            post.komentarId.splice(index, 1);
            renderPostingan();
        } catch (err) {
            alert("Gagal menghapus komentar dari database: " + err.message);
        }
    }
};

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
});

// Logout handler
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

// Ambil data dari Firestore saat halaman dimuat
fetchPosts();
