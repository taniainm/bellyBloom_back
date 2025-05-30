const articles = [
    {
        title: "Melahirkan Lebih Tenang dengan Metode Gentle Birth",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah ibu hamil boleh memakai skincare?",
        image: "/img/janin.jpg",
        date: "Mar 13, 2025",
    },
    {
        title: "11 Makanan penambah nafsu makan ibu hamil",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Metode Gentle Birth",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah ibu hamil boleh memakai skincare?",
        image: "/img/janin.jpg",
        date: "Mar 13, 2025",
    },
    {
        title: "11 Makanan penambah nafsu makan ibu hamil",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Metode Gentle Birth",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah ibu hamil boleh memakai skincare?",
        image: "/img/janin.jpg",
        date: "Mar 13, 2025",
    },
    {
        title: "11 Makanan penambah nafsu makan ibu hamil",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Melahirkan Lebih Tenang dengan Metode Gentle Birth",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    {
        title: "Apakah ibu hamil boleh memakai skincare?",
        image: "/img/janin.jpg",
        date: "Mar 13, 2025",
    },
    {
        title: "11 Makanan penambah nafsu makan ibu hamil",
        image: "/img/janin.jpg",
        date: "Mar 12, 2025",
    },
    // Tambahkan artikel lainnya di sini
];

function loadArticles() {
    const container = document.querySelector(".container1");
    let articlesHTML = "";

    articles.forEach((article) => {
        articlesHTML += `
            <a href="detail_artikel.html?title=${encodeURIComponent(
                article.title
            )}" class="artikel">
                <img src="${article.image}" alt="Gambar fitur">
                <p>${article.date}</p>
                <h3>${article.title}</h3>
            </a>
        `;
    });

    container.innerHTML = articlesHTML;
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadArticles);
