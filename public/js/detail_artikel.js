document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    const articleDetail = document.getElementById("article-detail");

    if (!articleId) {
        articleDetail.innerHTML = `<p>Artikel tidak ditemukan.</p>`;
        return;
    }

    try {
        // Ambil semua artikel dari API backend
        const response = await fetch(`/api/articlesApi`);
        if (!response.ok) throw new Error("Gagal mengambil data artikel");
        const articles = await response.json();

        // Cari artikel dengan id yang sesuai
        const article = articles.find(
            (a) => String(a.id) === String(articleId)
        );

        if (!article) {
            articleDetail.innerHTML = `<p>Artikel tidak ditemukan.</p>`;
            return;
        }

        articleDetail.innerHTML = `
            <h1>${article.title}</h1>
            <img src="${
                article.image
                    ? article.image.startsWith("http")
                        ? article.image
                        : "/storage/" + article.image
                    : "/img/default-article.jpg"
            }" alt="Artikel">
            <p>${
                article.date ||
                (article.publish_date
                    ? new Date(article.publish_date).toLocaleDateString()
                    : "")
            }</p>
            <div>${article.content}</div>
        `;
    } catch (error) {
        articleDetail.innerHTML = `<p>Gagal memuat artikel.</p>`;
    }
});
