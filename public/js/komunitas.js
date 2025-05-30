const posts = [
    {
        user: "Tania",
        time: "2 jam yang lalu",
        avatar: "/img/ava.png",
        content:
            "Hai semua! Aku lagi hamil 7 bulan nih, dan rasanya campur aduk antara bahagia dan deg-degan. Ada nggak, yang pernah ngalamin kaki sering bengkak? Kira-kira tipsnya gimana ya biar lebih nyaman?",
        tags: ["Umum", "Kehamilan", "Trimester 3"],
        like: 16,
        comment: 6,
        reply: {
            user: "Dinda",
            avatar: "/img/ava.png",
            text: "Hai Mom! Aku juga dulu gitu pas hamil besar. Coba sering stretching ringan atau yoga prenatal, terus tidur pakai bantal kehamilan, lumayan banget buat bantu mengurangi pegalnya. Semangat yaa! 🥰",
        },
    },
    {
        user: "Indah",
        time: "6 jam yang lalu",
        avatar: "/img/ava.png",
        content:
            "Halo semua! Sekarang aku masuk trimester ketiga dan mulai gampang capek. Penasaran, kalau teman-teman dulu gimana mengatasi rasa lelah tapi tetap aktif?",
        tags: ["Umum", "Kehamilan"],
        like: 16,
        comment: 6,
        reply: {
            user: "Nirma",
            avatar: "/img/ava.png",
            text: "Hai Mom! Wah, selamat sudah masuk trimester ketiga! Aku dulu juga sering capek di fase ini... Jangan lupa juga banyak minum air dan istirahat cukup ya! Semangat bumil! 💕🤰",
        },
    },
];

const postContainer = document.getElementById("post-container");

function renderPost(post, index) {
    const postEl = document.createElement("div");
    postEl.className = "post";
    postEl.innerHTML = `
    <div class="user">
      <img src="${post.avatar}" alt="${post.user}" class="avatar" />
      <div><h4>${post.user}</h4><span>${post.time}</span></div>
    </div>
    <p>${post.content}</p>
    <div class="tag-post">
      ${post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="actions">
  <button class="like-button" id="like-${index}" data-liked="false">
    <i data-feather="heart" class="icon-heart"></i> <span>${post.like}</span>
  </button>
  <button class="comment-button" id="comment-${index}">
  <i data-feather="message-circle" class="icon-comment"></i> <span>${
      post.comment
  }</span>
</button>
</div>
    <div class="reply">
      <img src="${post.reply.avatar}" alt="${
        post.reply.user
    }" class="avatar-small" />
      <div><strong>${post.reply.user}</strong><p>${post.reply.text}</p></div>
    </div>
  `;

    postContainer.appendChild(postEl);

    const likeBtn = document.getElementById(`like-${index}`);
    likeBtn.addEventListener("click", () => toggleLike(index, likeBtn));

    const commentBtn = document.getElementById(`comment-${index}`);
    commentBtn.addEventListener("click", () =>
        toggleCommentForm(index, postEl)
    );
}

document.querySelectorAll(".filter-btns button").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        // Ubah style active
        document
            .querySelectorAll(".filter-btns button")
            .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (btn.textContent === "Populer") {
            renderPostsSortedByPopularity();
        } else {
            renderAllPosts(); // fungsi untuk tampilkan semua sesuai urutan asli
        }
    });
});

function toggleLike(index, button) {
    const icon = button.querySelector(".icon-heart");
    const count = button.querySelector("span");

    const liked = button.classList.toggle("liked");
    if (liked) {
        posts[index].like += 1;
    } else {
        posts[index].like -= 1;
    }

    count.textContent = posts[index].like;
}

function toggleCommentForm(postId, container) {
    let form = container.querySelector(".comment-form");
    if (form) {
        form.remove();
    } else {
        const newForm = document.createElement("form");
        newForm.className = "comment-form";
        newForm.innerHTML = `
      <input type="text" placeholder="Tulis komentar..." required />
      <button type="submit">Kirim</button>
    `;
        newForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = newForm.querySelector("input");
            const text = input.value.trim();
            if (text !== "") {
                const newComment = document.createElement("div");
                newComment.className = "reply";
                newComment.innerHTML = `
          <img src="../img/ava.png" class="avatar-small" />
          <div>
            <strong>Kamu</strong>
            <p>${text}</p>
          </div>
        `;
                container.appendChild(newComment);
                input.value = "";
                newForm.remove();
            }
        });
        container.appendChild(newForm);
    }
}

function renderFilteredPosts(tag) {
    postContainer.innerHTML = "";
    posts
        .filter((post) => post.tags.includes(tag))
        .forEach((post, index) => renderPost(post, index));
    feather.replace();
}

function renderAllPosts() {
    postContainer.innerHTML = "";
    posts.forEach((post, index) => renderPost(post, index));
    feather.replace();
}

function renderPostsSortedByPopularity() {
    const sorted = [...posts].sort((a, b) => {
        const aScore = a.like + a.comment;
        const bScore = b.like + b.comment;
        return bScore - aScore; // descending
    });

    postContainer.innerHTML = "";
    sorted.forEach((post, index) => renderPost(post, index));
    feather.replace();
}

document.addEventListener("DOMContentLoaded", () => {
    // Render semua post
    posts.forEach((post, index) => renderPost(post, index));
    feather.replace();
    // Aktifkan filter berdasarkan tag
    document.querySelectorAll(".tag-container .tag").forEach((tag) => {
        tag.addEventListener("click", () => {
            const tagName = tag.textContent.trim();
            renderFilteredPosts(tagName);
        });
    });
});
