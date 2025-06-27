document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    const articleDetail = document.getElementById("article-detail");

    if (!articleId) {
        articleDetail.innerHTML = `<p>Artikel tidak ditemukan.</p>`;
        return;
    }

    try {
        const response = await fetch(`/api/articlesApi`);
        if (!response.ok) throw new Error("Gagal mengambil data artikel");
        const articles = await response.json();

        const article = articles.find(
            (a) => String(a.id) === String(articleId)
        );

        if (!article) {
            articleDetail.innerHTML = `<p>Artikel tidak ditemukan.</p>`;
            return;
        }

        // Proses konten untuk mempertahankan paragraf
        const formattedContent = formatArticleContent(article.content);

        articleDetail.innerHTML = `
            <h1>${article.title}</h1>
            <div class="article-meta">
                <span class="article-date">${
                    article.date ||
                    (article.publish_date
                        ? new Date(article.publish_date).toLocaleDateString(
                              "id-ID",
                              {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              }
                          )
                        : "")
                }</span>
            </div>
            <img src="${
                article.image
                    ? article.image.startsWith("http")
                        ? article.image
                        : "/storage/" + article.image
                    : "/img/default-article.jpg"
            }" alt="${article.title}" class="article-image">
            <div class="article-content">${formattedContent}</div>
        `;
    } catch (error) {
        console.error("Error:", error);
        articleDetail.innerHTML = `<p class="error-message">Gagal memuat artikel.</p>`;
    }
});

// Fungsi untuk memformat konten artikel
function formatArticleContent(content) {
    if (!content) return "";

    // 1. Bersihkan konten dari tag HTML yang tidak diinginkan
    let cleanedContent = content
        .replace(/<(\/?(p|br|strong|em|ul|ol|li|div))>/gi, "|||$1|||") // Simpan tag yang diperbolehkan
        .replace(/<[^>]+>/g, "") // Hapus semua tag HTML lainnya
        .replace(/\|\|\|(\/?[a-z]+)\|\|\|/g, "<$1>"); // Kembalikan tag yang diperbolehkan

    // 2. Format paragraf
    let paragraphs = cleanedContent.split(/\n\s*\n/);

    let formatted = paragraphs
        .map((para) => {
            para = para.trim();
            if (!para) return "";

            // Handle single line breaks
            para = para.replace(/\n/g, "<br>");

            // Pastikan tidak ada tag p bersarang
            if (!para.startsWith("<p>") && !para.endsWith("</p>")) {
                para = `<p>${para}</p>`;
            }

            return para;
        })
        .join("");

    return formatted;
}
