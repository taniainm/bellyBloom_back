import { db, auth } from "./firebase-init.js";
import {
    collection,
    getDocs,
    query,
    orderBy,
    where,
    updateDoc,
    doc,
    increment,
    addDoc,
    serverTimestamp,
    setDoc,
    deleteDoc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

let posts = [];
const postContainer = document.getElementById("post-container");
let currentTag = null;
let currentSort = "recent";
let currentUser = null;

// Ambil postingan dari Firestore
async function fetchPosts({ tag = null, sort = "recent" } = {}) {
    let q = collection(db, "posts");
    let constraints = [];
    if (tag) constraints.push(where("tags", "array-contains", tag));
    if (sort === "populer") constraints.push(orderBy("likeCount", "desc"));
    else constraints.push(orderBy("createdAt", "desc"));
    q = query(q, ...constraints);

    const snapshot = await getDocs(q);
    posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    await markUserLikes();
    renderAllPosts();
}

// Tandai postingan yang sudah di-like user
async function markUserLikes() {
    if (!currentUser) return;
    for (const post of posts) {
        const likeRef = doc(db, "posts", post.id, "likes", currentUser.uid);
        const likeSnap = await getDoc(likeRef);
        post.likedByCurrentUser = likeSnap.exists();
    }
}

// Render semua post
function renderAllPosts() {
    postContainer.innerHTML = "";
    posts.forEach((post, index) => renderPost(post, index));
    feather.replace();
}

// Render post satuan
function renderPost(post, index) {
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
    <div class="user">
      <img src="${post.userAvatar || "/img/ava.png"}" alt="${
        post.userName
    }" class="avatar" />
      <div><h4>${post.userName}</h4><span>${formatTime(
        post.createdAt
    )}</span></div>
    </div>
    <p>${post.content}</p>
    <div class="tag-post">
      ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="actions">
      <button class="like-button${
          post.likedByCurrentUser ? " liked" : ""
      }" id="like-${post.id}" data-liked="${post.likedByCurrentUser}">
        <i data-feather="heart" class="icon-heart"></i> <span>${
            post.likeCount || 0
        }</span>
      </button>
      <button class="comment-button" id="comment-${post.id}">
        <i data-feather="message-circle" class="icon-comment"></i> <span id="comment-count-${
            post.id
        }">0</span>
      </button>
    </div>
    <div class="comments" id="comments-${post.id}"></div>
    <form class="comment-form" id="form-${post.id}" style="display:none;">
      <input type="text" placeholder="Tulis komentar..." required />
      <button type="submit">Kirim</button>
    </form>
  `;
    postContainer.appendChild(postEl);

    // Like
    const likeBtn = document.getElementById(`like-${post.id}`);
    likeBtn.addEventListener("click", () => toggleLike(post, likeBtn));

    // Ubah warna icon heart jika liked
    if (post.likedByCurrentUser) {
        likeBtn.classList.add("liked");
        likeBtn.querySelector(".icon-heart").style.color = "red";
    } else {
        likeBtn.classList.remove("liked");
        likeBtn.querySelector(".icon-heart").style.color = "";
    }

    // Comment
    const commentBtn = document.getElementById(`comment-${post.id}`);
    commentBtn.addEventListener("click", () => toggleCommentForm(post.id));

    // Submit comment
    const form = document.getElementById(`form-${post.id}`);
    form.addEventListener("submit", (e) => submitComment(e, post.id));

    // Tampilkan komentar dari awal
    loadComments(post.id);
}

// Toggle like/unlike
async function toggleLike(post, button) {
    if (!currentUser) return alert("Harus login!");
    const likeRef = doc(db, "posts", post.id, "likes", currentUser.uid);
    const postRef = doc(db, "posts", post.id);
    const likeSnap = await getDoc(likeRef);

    if (!likeSnap.exists()) {
        // Like
        await setDoc(likeRef, { liked: true, userId: currentUser.uid });
        await updateDoc(postRef, { likeCount: increment(1) });
    } else {
        // Unlike
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likeCount: increment(-1) });
    }
    // Hanya update post yang di-like/unlike, tidak fetch semua
    // Tapi agar status like dan count konsisten, fetch ulang
    fetchPosts({ tag: currentTag, sort: currentSort });
}

// Toggle form komentar
function toggleCommentForm(postId) {
    const form = document.getElementById(`form-${postId}`);
    form.style.display = form.style.display === "none" ? "block" : "none";
    loadComments(postId);
}

// Submit komentar ke Firestore
async function submitComment(e, postId) {
    e.preventDefault();
    if (!currentUser) return alert("Harus login!");
    const input = document.querySelector(`#form-${postId} input`);
    const content = input.value.trim();
    if (!content) return;

    // Ambil nama user dari collection users
    let userName = currentUser.displayName || currentUser.email || "User";
    try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const data = userSnap.data();
            userName = data.nama || data.name || userName;
        }
    } catch (err) {}

    await addDoc(collection(db, "comments"), {
        postId,
        userId: currentUser.uid,
        userName,
        content,
        createdAt: serverTimestamp(),
    });
    input.value = "";
    loadComments(postId);
}

// Load komentar dari Firestore
async function loadComments(postId) {
    const q = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("createdAt", "asc")
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    const commentsDiv = document.getElementById(`comments-${postId}`);
    const commentCountSpan = document.getElementById(`comment-count-${postId}`);
    if (commentCountSpan) commentCountSpan.textContent = comments.length;

    commentsDiv.innerHTML = comments
        .map(
            (c) =>
                `<div class="reply">
                    <b>${c.userName}:</b> ${c.content}
                    ${
                        currentUser && c.userId === currentUser.uid
                            ? `<button class="delete-comment-btn" data-id="${c.id}" data-post="${postId}">Hapus</button>`
                            : ""
                    }
                </div>`
        )
        .join("");

    // Event hapus komentar
    commentsDiv.querySelectorAll(".delete-comment-btn").forEach((btn) => {
        btn.addEventListener("click", async function () {
            if (confirm("Hapus komentar ini?")) {
                await deleteDoc(doc(db, "comments", btn.dataset.id));
                loadComments(btn.dataset.post);
            }
        });
    });
}

// Filter berdasarkan tag
function renderFilteredPosts(tag) {
    currentTag = tag;
    fetchPosts({ tag, sort: currentSort });
}

// Filter populer
function renderPostsSortedByPopularity() {
    currentSort = "populer";
    fetchPosts({ tag: currentTag, sort: "populer" });
}

// Format waktu
function formatTime(timestamp) {
    if (!timestamp) return "Baru saja";
    let date;
    if (typeof timestamp?.toDate === "function") date = timestamp.toDate();
    else if (timestamp instanceof Date) date = timestamp;
    else if (typeof timestamp === "string") date = new Date(timestamp);
    else if (timestamp && timestamp.seconds)
        date = new Date(timestamp.seconds * 1000);
    else return "Baru saja";
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
}

// Event filter tag dan populer + cek login
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        fetchPosts();
    });
    feather.replace();

    // Filter tag
    document.querySelectorAll(".tag-container .tag").forEach((tag) => {
        tag.addEventListener("click", () => {
            const tagName = tag.textContent.trim();
            renderFilteredPosts(tagName);
        });
    });

    // Filter populer
    document.querySelectorAll(".filter-btns button").forEach((btn) => {
        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".filter-btns button")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            if (btn.textContent === "Populer") {
                renderPostsSortedByPopularity();
            } else {
                currentSort = "recent";
                fetchPosts({ tag: currentTag, sort: "recent" });
            }
        });
    });
});
