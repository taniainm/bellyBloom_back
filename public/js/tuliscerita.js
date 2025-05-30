feather.replace();

// Logic untuk menampung tag yang dipilih
const tagButtons = document.querySelectorAll(".tag-button");
const selectedTagsContainer = document.getElementById("selected-tags");
const tagOptionContainer = document.querySelector(".tag-options");

tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tagText = button.textContent.replace("+", "").trim();

        // Buat tag yang muncul di atas
        const selectedTag = document.createElement("span");
        selectedTag.className = "tag-selected";
        selectedTag.innerHTML = `${tagText} <span class="remove-tag" data-tag="${tagText}">×</span>`;
        selectedTagsContainer.appendChild(selectedTag);

        // Sembunyikan tombol tag dari daftar pilihan
        button.style.display = "none";
    });
});

// Event delegation untuk hapus tag yang dipilih
selectedTagsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-tag")) {
        const tag = e.target.dataset.tag;
        e.target.parentElement.remove(); // Hapus dari atas

        // Balikin tombol ke daftar tag
        const restoredBtn = document.createElement("button");
        restoredBtn.className = "tag-button";
        restoredBtn.innerHTML = `${tag} <span>+</span>`;
        restoredBtn.addEventListener("click", () => {
            restoredBtn.style.display = "none";

            const selectedTag = document.createElement("span");
            selectedTag.className = "tag-selected";
            selectedTag.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}">×</span>`;
            selectedTagsContainer.appendChild(selectedTag);
        });

        tagOptionContainer.appendChild(restoredBtn);
    }
});

// Fungsi untuk posting cerita
function postingCerita() {
    const isiCerita = document.querySelector("textarea").value.trim();
    if (!isiCerita) return;

    const tagEls = document.querySelectorAll(".tag-selected");
    const tags = Array.from(tagEls).map((tag) =>
        tag.textContent.replace("×", "").trim()
    );

    const postHTML = `
    <div class="post-item">
      <div class="post-header">
        <img src="../img/ava.png" alt="User Avatar" class="post-avatar" />
        <div class="post-user-info">
          <span class="post-username">Indah</span>
          <span class="post-time">Baru saja</span>
        </div>
      </div>
      <div class="post-content">
        <h4 class="post-title">${tags.join(", ")}</h4>
        <p class="post-text">${isiCerita}</p>
      </div>
      <div class="post-actions">
        <i data-feather="heart" class="like-icon"></i><span class="like-count"> 0</span>
        <i data-feather="message-circle" class="comment-icon"></i><span class="comment-count"> 0</span>
      </div>
    </div>
  `;

    document
        .querySelector(".right-panel")
        .insertAdjacentHTML("beforeend", postHTML);
    feather.replace();

    // Reset form
    document.querySelector("textarea").value = "";
    selectedTagsContainer.innerHTML = "";
    tagOptionContainer.innerHTML = "";
    tagTexts.forEach((tag) => {
        const btn = document.createElement("button");
        btn.className = "tag-button";
        btn.innerHTML = `${tag} <span>+</span>`;
        btn.addEventListener("click", () => {
            btn.style.display = "none";

            const selectedTag = document.createElement("span");
            selectedTag.className = "tag-selected";
            selectedTag.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}">×</span>`;
            selectedTagsContainer.appendChild(selectedTag);
        });
        tagOptionContainer.appendChild(btn);
    });

    setupLikeFunction(); // Supaya tombol love bisa diklik
}

// Setup toggle like
function setupLikeFunction() {
    document.querySelectorAll(".like-icon").forEach((icon) => {
        icon.addEventListener("click", () => {
            icon.classList.toggle("liked");
            const countSpan = icon.nextElementSibling;
            let count = parseInt(countSpan.textContent.trim()) || 0;
            count += icon.classList.contains("liked") ? 1 : -1;
            countSpan.textContent = ` ${count}`;
        });
    });
}

// Untuk daftar tag awal
const tagTexts = [
    "Umum",
    "Kehamilan",
    "Trimester 1",
    "Trimester 2",
    "Trimester 3",
];
