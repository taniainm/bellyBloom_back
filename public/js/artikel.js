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

async function fetchArticlesFromAPI() {
    try {
        const response = await fetch("/api/articlesApi");
        if (!response.ok) throw new Error("Gagal mengambil data artikel");
        articles = await response.json();
        renderAll();
    } catch (error) {
        console.error("Error:", error);
        const mainArticle = document.getElementById("main-article");
        if (mainArticle) mainArticle.innerHTML = "<p>Gagal memuat artikel.</p>";
    }
}

function renderAll() {
    loadMainArticle();
    loadSidebar();
    loadArticles();
}

// Render artikel utama
function loadMainArticle() {
    const mainArticle = document.getElementById("main-article");
    if (!mainArticle) return;
    if (!articles[0]) {
        mainArticle.innerHTML = "<p>Tidak ada artikel.</p>";
        return;
    }
    mainArticle.innerHTML = `
        <a href="/isiartikel?id=${articles[0].id}">
            <img src="${
                articles[0].image
                    ? "/storage/" + articles[0].image
                    : "/img/default-article.jpg"
            }" alt="Artikel utama">
            <h2>${
                articles[0].title.length > 50
                    ? articles[0].title.substring(0, 50) + "..."
                    : articles[0].title
            }</h2>
            <p>${
                articles[0].summary ||
                articles[0].content?.substring(0, 100) ||
                ""
            }</p>
        </a>
    `;
}

// Render sidebar artikel
function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    let sidebarHTML = "";
    for (let i = 1; i < Math.min(4, articles.length); i++) {
        sidebarHTML += `
            <a href="/isiartikel?id=${articles[i].id}" class="article-card">
                <img src="${
                    articles[i].image
                        ? "/storage/" + articles[i].image
                        : "/img/default-article.jpg"
                }" alt="Artikel samping">
                <p>${
                    articles[i].title.length > 50
                        ? articles[i].title.substring(0, 50) + "..."
                        : articles[i].title
                }</p>
            </a>
        `;
    }
    sidebar.innerHTML = sidebarHTML;
}

// Render artikel lainnya
function loadArticles() {
    const articleContainer = document.getElementById("article-container");
    if (!articleContainer) return;
    let articlesHTML = "";
    for (let i = 4; i < articles.length; i++) {
        articlesHTML += `
            <a href="/isiartikel?id=${articles[i].id}" class="article-card">
                <img src="${
                    articles[i].image
                        ? "/storage/" + articles[i].image
                        : "/img/default-article.jpg"
                }" alt="Artikel">
                <p>${
                    articles[i].date ||
                    (articles[i].publish_date
                        ? new Date(
                              articles[i].publish_date
                          ).toLocaleDateString()
                        : "")
                }</p>
                <h3>${
                    articles[i].title.length > 50
                        ? articles[i].title.substring(0, 50) + "..."
                        : articles[i].title
                }</h3>
            </a>
        `;
    }
    articleContainer.innerHTML = articlesHTML;
}

function searchArticles() {
    let keyword = document.getElementById("search-box").value.toLowerCase();
    let filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword)
    );

    const mainArticle = document.getElementById("main-article");
    const sidebar = document.getElementById("sidebar");
    const articleContainer = document.getElementById("article-container");

    if (!mainArticle || !sidebar || !articleContainer) {
        console.error("Elemen kontainer tidak ditemukan!");
        return;
    }

    mainArticle.innerHTML = "";
    sidebar.innerHTML = "";
    articleContainer.innerHTML = "";

    if (filteredArticles.length === 0) {
        mainArticle.innerHTML = "<p>Tidak ada artikel yang ditemukan.</p>";
        return;
    }

    // Tampilkan artikel utama
    if (filteredArticles[0]) {
        mainArticle.innerHTML = `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[0].title
            )}">
                <img src="${
                    filteredArticles[0].image
                        ? "/storage/" + filteredArticles[0].image
                        : "/img/default-article.jpg"
                }" alt="Artikel utama">
                <h2>${
                    filteredArticles[0].title.length > 50
                        ? filteredArticles[0].title.substring(0, 50) + "..."
                        : filteredArticles[0].title
                }</h2>
                <p>${
                    filteredArticles[0].summary ||
                    filteredArticles[0].content?.substring(0, 100) ||
                    ""
                }</p>
            </a>
        `;
    }

    // Sidebar
    for (let i = 1; i < Math.min(4, filteredArticles.length); i++) {
        sidebar.innerHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[i].title
            )}" class="article-card">
                <img src="${
                    filteredArticles[i].image
                        ? "/storage/" + filteredArticles[i].image
                        : "/img/default-article.jpg"
                }" alt="Artikel samping">
                <p>${
                    filteredArticles[i].title.length > 50
                        ? filteredArticles[i].title.substring(0, 50) + "..."
                        : filteredArticles[i].title
                }</p>
            </a>
        `;
    }

    // Artikel lainnya
    for (let i = 4; i < filteredArticles.length; i++) {
        articleContainer.innerHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[i].title
            )}" class="article-card">
                <img src="${
                    filteredArticles[i].image
                        ? "/storage/" + filteredArticles[i].image
                        : "/img/default-article.jpg"
                }" alt="Artikel">
                <p>${
                    filteredArticles[i].date ||
                    (filteredArticles[i].publish_date
                        ? new Date(
                              filteredArticles[i].publish_date
                          ).toLocaleDateString()
                        : "")
                }</p>
                <h3>${
                    filteredArticles[i].title.length > 50
                        ? filteredArticles[i].title.substring(0, 50) + "..."
                        : filteredArticles[i].title
                }</h3>
            </a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchArticlesFromAPI();

    let searchBox = document.getElementById("search-box");
    if (searchBox) {
        searchBox.addEventListener("input", searchArticles);
    } else {
        console.error("Elemen #search-box tidak ditemukan!");
    }
});
