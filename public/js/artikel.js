const articles = [
    {
        title: "14 Gerakan yang Tidak Boleh Dilakukan Ibu Hamil",
        image: "/img/image.jpg",
        summary:
            "Olah raga memang penting untuk kesehatan ibu hamil. Namun, ada aturan yang perlu diperhatikan...",
        date: "Mar 12, 2025",
    },
    {
        title: "Fase Perkembangan Janin, Kapan Embrio...",
        image: "/img/image2.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "4 Jenis Persalinan yang Perlu Bumil Tahu",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Ketahui 18 Fakta Bayi Baru Lahir",
        image: "/img/image3.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Gentle Birth",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah Ibu Hamil Boleh Memakai Skincare?",
        image: "/img/image4.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Ketahui 18 Fakta Bayi Baru Lahir",
        image: "/img/image3.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Gentle Birth",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah Ibu Hamil Boleh Memakai Skincare?",
        image: "/img/image4.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Ketahui 18 Fakta Bayi Baru Lahir",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Gentle Birth",
        image: "/img/image3.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah Ibu Hamil Boleh Memakai Skincare?",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Ketahui 18 Fakta Bayi Baru Lahir",
        image: "/img/image2.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Gentle Birth",
        image: "/img/image.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah Ibu Hamil Boleh Memakai Skincare?",
        image: "/img/image4.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
    {
        title: "11 Makanan Penambah Nafsu Makan Ibu Hamil",
        image: "/img/image1.jpg",
        summary: "",
        date: "Mar 12, 2025",
    },
];

// Render artikel utama
function loadMainArticle() {
    const mainArticle = document.getElementById("main-article");
    mainArticle.innerHTML = `
        <a href="detail_artikel.html?title=${encodeURIComponent(
            articles[0].title
        )}">
            <img src="${articles[0].image}" alt="Artikel utama">
            <h2>${articles[0].title}</h2>
            <p>${articles[0].summary}</p>
        </a>
    `;
}

// Render sidebar artikel
function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    let sidebarHTML = "";
    for (let i = 1; i < 4; i++) {
        sidebarHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                articles[i].title
            )}" class="article-card">
                <img src="${articles[i].image}" alt="Artikel samping">
                <p>${articles[i].title}</p>
            </a>
        `;
    }
    sidebar.innerHTML = sidebarHTML;
}

// Render artikel lainnya
function loadArticles() {
    const articleContainer = document.getElementById("article-container");
    let articlesHTML = "";
    for (let i = 4; i < articles.length; i++) {
        articlesHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                articles[i].title
            )}" class="article-card">
                <img src="${articles[i].image}" alt="Artikel">
                <p>${articles[i].date}</p>
                <h3>${articles[i].title}</h3>
            </a>
        `;
    }
    articleContainer.innerHTML = articlesHTML;
}

function searchArticles() {
    let keyword = document.getElementById("search-box").value.toLowerCase();

    // Filter artikel berdasarkan judul
    let filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword)
    );

    // Kosongkan semua kontainer sebelum menampilkan hasil
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

    // Tampilkan artikel utama (artikel pertama dari hasil pencarian)
    if (filteredArticles[0]) {
        mainArticle.innerHTML = `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[0].title
            )}">
                <img src="${filteredArticles[0].image}" alt="Artikel utama">
                <h2>${filteredArticles[0].title}</h2>
                <p>${filteredArticles[0].summary}</p>
            </a>
        `;
    }

    // Tampilkan artikel di sidebar (artikel kedua hingga keempat dari hasil pencarian)
    for (let i = 1; i < Math.min(4, filteredArticles.length); i++) {
        sidebar.innerHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[i].title
            )}" class="article-card">
                <img src="${filteredArticles[i].image}" alt="Artikel samping">
                <p>${filteredArticles[i].title}</p>
            </a>
        `;
    }

    // Tampilkan artikel lainnya (artikel kelima dan seterusnya dari hasil pencarian)
    for (let i = 4; i < filteredArticles.length; i++) {
        articleContainer.innerHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                filteredArticles[i].title
            )}" class="article-card">
                <img src="${filteredArticles[i].image}" alt="Artikel">
                <p>${filteredArticles[i].date}</p>
                <h3>${filteredArticles[i].title}</h3>
            </a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadMainArticle();
    loadSidebar();
    loadArticles();

    let searchBox = document.getElementById("search-box");

    if (searchBox) {
        searchBox.addEventListener("input", searchArticles);
    } else {
        console.error("Elemen #search-box tidak ditemukan!");
    }
});
