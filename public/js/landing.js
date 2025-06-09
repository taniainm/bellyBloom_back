import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Cek login saat halaman dibuka
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "/login";
    }
});

let articles = [];

async function fetchArticles() {
    try {
        const response = await fetch("/api/articlesApi");
        if (!response.ok) throw new Error("Gagal mengambil data artikel");
        articles = await response.json();
        loadArticles();
    } catch (error) {
        console.error("Error:", error);
        const container = document.querySelector(".container1");
        if (container) container.innerHTML = "<p>Gagal memuat artikel.</p>";
    }
}

function loadArticles() {
    const container = document.querySelector(".container1");
    if (!container) return;
    let articlesHTML = "";

    articles.forEach((article) => {
        articlesHTML += `
            <a href="/isiartikel?id=${article.id}" class="artikel">
                <img src="${
                    article.image
                        ? article.image.startsWith("http")
                            ? article.image
                            : "/storage/" + article.image
                        : "/img/default-article.jpg"
                }" alt="Gambar fitur">
                <p>${
                    article.date ||
                    (article.publish_date
                        ? new Date(article.publish_date).toLocaleDateString()
                        : "")
                }</p>
                <h3>${
                    article.title.length > 40
                        ? article.title.substring(0, 40) + "..."
                        : article.title
                }</h3>
            </a>
        `;
    });

    container.innerHTML = articlesHTML;
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchArticles);
