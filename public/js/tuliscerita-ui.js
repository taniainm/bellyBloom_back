import PostService from "./firebase-post.js";
import { auth, db } from "./firebase-init.js";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

export class PostUI {
    constructor() {
        this.tagTexts = [
            "Umum",
            "Kehamilan",
            "Trimester 1",
            "Trimester 2",
            "Trimester 3",
        ];
        this.initTagButtons();
        this.setupEventListeners();

        // Tunggu user login, lalu tampilkan nama dan postingan user
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await this.showUserName(user.uid);
                this.loadPosts(user.uid);
            }
        });
    }

    async showUserName(uid) {
        const userNameSpan = document.querySelector(".user-info span");
        try {
            const userRef = doc(db, "users", uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists() && userNameSpan) {
                const data = docSnap.data();
                userNameSpan.textContent = data.nama || data.name || "User";
            } else if (userNameSpan) {
                userNameSpan.textContent = "User";
            }
        } catch (err) {
            if (userNameSpan) userNameSpan.textContent = "User";
        }
    }

    initTagButtons() {
        const tagOptionContainer = document.querySelector(".tag-options");
        tagOptionContainer.innerHTML = "";

        this.tagTexts.forEach((tag) => {
            const btn = document.createElement("button");
            btn.className = "tag-button";
            btn.innerHTML = `${tag} <span>+</span>`;
            btn.addEventListener("click", () => this.addTag(tag, btn));
            tagOptionContainer.appendChild(btn);
        });
    }

    addTag(tag, button) {
        const selectedTagsContainer = document.getElementById("selected-tags");
        const selectedTag = document.createElement("span");
        selectedTag.className = "tag-selected";
        selectedTag.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}">×</span>`;
        selectedTagsContainer.appendChild(selectedTag);
        button.style.display = "none";
    }

    setupEventListeners() {
        document
            .getElementById("selected-tags")
            .addEventListener("click", (e) => {
                if (e.target.classList.contains("remove-tag")) {
                    this.removeTag(e.target);
                }
            });

        const postingBtn = document.getElementById("posting-btn");
        if (postingBtn) {
            postingBtn.addEventListener("click", () => this.postingCerita());
        }
    }

    removeTag(target) {
        const tag = target.dataset.tag;
        target.parentElement.remove();
        const buttons = document.querySelectorAll(".tag-button");
        buttons.forEach((btn) => {
            if (btn.textContent.includes(tag)) btn.style.display = "block";
        });
    }

    async postingCerita() {
        const isiCerita = document.querySelector("textarea").value.trim();
        if (!isiCerita) {
            alert("Isi cerita tidak boleh kosong");
            return;
        }

        const tags = Array.from(document.querySelectorAll(".tag-selected")).map(
            (tag) => tag.textContent.replace("×", "").trim()
        );

        try {
            const post = await PostService.createPost({
                content: isiCerita,
                tags,
            });

            this.addPostToUI(post);
            this.resetForm();
        } catch (error) {
            console.error("Error posting:", error);
            alert("Gagal memposting cerita: " + error.message);
        }
    }

    async loadPosts(userId) {
        try {
            const posts = await PostService.getPostsByUser(userId);
            const postsContainer =
                document.querySelector(".right-panel .posts-container") ||
                this.createPostsContainer();

            postsContainer.innerHTML = "";
            posts.forEach((post) => this.addPostToUI(post, postsContainer));
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }

    createPostsContainer() {
        const container = document.createElement("div");
        container.className = "posts-container";
        document.querySelector(".right-panel").appendChild(container);
        return container;
    }

    addPostToUI(post, container = null) {
        const target = container || document.querySelector(".posts-container");
        if (!target) return;

        // Cek apakah postingan milik user yang login
        const isOwner =
            auth.currentUser && post.userId === auth.currentUser.uid;

        const postHTML = `
      <div class="post-item" data-id="${post.id}">
        <div class="post-header">
          <img src="${
              post.userAvatar || "../img/ava.png"
          }" alt="User Avatar" class="post-avatar" />
          <div class="post-user-info">
            <span class="post-username">${post.userName}</span>
            <span class="post-time">${this.formatTime(post.createdAt)}</span>
          </div>
          ${
              isOwner
                  ? `<button class="delete-post-btn" data-id="${post.id}">Hapus</button>`
                  : ""
          }
        </div>
        <div class="post-content">
          <h4 class="post-title">${post.title || ""}</h4>
          <p class="post-text">${post.content}</p>
        </div>
        <div class="post-actions">
          <i data-feather="heart" class="like-icon"></i>
          <span class="like-count">${post.likeCount || 0}</span>
          <i data-feather="message-circle" class="comment-icon"></i>
          <span class="comment-count">${post.commentCount || 0}</span>
        </div>
        <div class="comments-section" style="display:none;"></div>
      </div>
    `;

        target.insertAdjacentHTML("beforeend", postHTML);
        feather.replace();
        this.setupLikeFunction();

        // Event: klik postingan untuk tampilkan komentar & reply
        const postItem = target.querySelector(
            `.post-item[data-id="${post.id}"]`
        );
        postItem.addEventListener("click", (e) => {
            // Cegah toggle jika klik tombol reply atau form reply
            if (
                e.target.classList.contains("like-icon") ||
                e.target.classList.contains("comment-icon") ||
                e.target.classList.contains("reply-btn") ||
                e.target.closest(".reply-form")
            ) {
                return;
            }
            this.toggleCommentsSection(post.id, postItem);
        });

        // Event hapus postingan
        if (isOwner) {
            const deleteBtn = postItem.querySelector(".delete-post-btn");
            if (deleteBtn) {
                deleteBtn.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    if (confirm("Yakin ingin menghapus postingan ini?")) {
                        await this.deletePost(post.id);
                        postItem.remove();
                    }
                });
            }
        }
    }

    // Komentar & reply
    async toggleCommentsSection(postId, postItem) {
        let section = postItem.querySelector(".comments-section");
        if (!section) return;
        if (section.style.display === "block") {
            section.style.display = "none";
            section.innerHTML = "";
            return;
        }
        section.style.display = "block";
        section.innerHTML = "<div>Memuat komentar...</div>";
        const comments = await this.fetchComments(postId);
        section.innerHTML = this.renderCommentsHTML(comments, null);

        // Event submit komentar utama
        section
            .querySelector(".main-comment-form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const input = section.querySelector(".main-comment-input");
                await this.submitComment(postId, null, input.value);
                input.value = "";
                this.toggleCommentsSection(postId, postItem); // reload comments
            });

        // Event submit reply
        section.querySelectorAll(".reply-form").forEach((form) => {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const parentId = form.dataset.parent;
                const input = form.querySelector("input");
                await this.submitComment(postId, parentId, input.value);
                input.value = "";
                this.toggleCommentsSection(postId, postItem); // reload comments
            });
        });

        // Event tombol balas
        section.querySelectorAll(".reply-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const replyForm = section.querySelector(
                    `.reply-form[data-parent="${btn.dataset.id}"]`
                );
                if (replyForm)
                    replyForm.style.display =
                        replyForm.style.display === "block" ? "none" : "block";
            });
        });
    }

    async fetchComments(postId) {
        const q = query(
            collection(db, "comments"),
            where("postId", "==", postId),
            orderBy("createdAt", "asc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    renderCommentsHTML(comments, parentId = null) {
        const list = comments.filter((c) => (c.parentId || null) === parentId);
        let html = "";
        if (parentId === null) {
            html += `
                <form class="main-comment-form">
                    <input class="main-comment-input" type="text" placeholder="Tulis komentar..." required />
                    <button type="submit">Kirim</button>
                </form>
            `;
        }
        list.forEach((c) => {
            html += `
                <div class="comment-item" style="margin-left:${
                    parentId ? 30 : 0
                }px">
                    <b>${c.userName}:</b> ${c.content}
                    <button type="button" class="reply-btn" data-id="${
                        c.id
                    }">Balas</button>
                    <form class="reply-form" data-parent="${
                        c.id
                    }" style="display:none;">
                        <input type="text" placeholder="Balas komentar..." required />
                        <button type="submit">Kirim</button>
                    </form>
                    ${this.renderCommentsHTML(comments, c.id)}
                </div>
            `;
        });
        return html;
    }

    async submitComment(postId, parentId, content) {
        const user = auth.currentUser;
        if (!user) return alert("Harus login!");
        let userName = user.displayName || user.email || "User";
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                userName = data.nama || data.name || userName;
            }
        } catch (err) {}
        await addDoc(collection(db, "comments"), {
            postId,
            parentId: parentId || null,
            userId: user.uid,
            userName,
            content,
            createdAt: serverTimestamp(),
        });
    }

    async deletePost(postId) {
        // Hapus postingan
        await PostService.deletePost(postId);

        // Hapus semua komentar terkait postingan ini
        const q = query(
            collection(db, "comments"),
            where("postId", "==", postId)
        );
        const snapshot = await getDocs(q);
        const batch = [];
        snapshot.forEach((docSnap) => {
            batch.push(deleteDoc(docSnap.ref));
        });
        await Promise.all(batch);
    }

    formatTime(timestamp) {
        if (!timestamp) return "Baru saja";
        let date;
        if (typeof timestamp?.toDate === "function") {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else if (typeof timestamp === "string") {
            date = new Date(timestamp);
        } else if (timestamp && timestamp.seconds) {
            date = new Date(timestamp.seconds * 1000);
        } else {
            return "Baru saja";
        }
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return "Baru saja";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
        return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    }

    resetForm() {
        document.querySelector("textarea").value = "";
        document.getElementById("selected-tags").innerHTML = "";
        this.initTagButtons();
    }

    setupLikeFunction() {
        document.querySelectorAll(".like-icon").forEach((icon) => {
            icon.addEventListener("click", (e) => {
                e.target.classList.toggle("liked");
                const countSpan = e.target.nextElementSibling;
                let count = parseInt(countSpan.textContent.trim()) || 0;
                count += e.target.classList.contains("liked") ? 1 : -1;
                countSpan.textContent = ` ${count}`;
            });
        });
    }
}
