document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const articleTitle = params.get("title");

    const articles = [
        {
            title: "14 Gerakan yang Tidak Boleh Dilakukan Ibu Hamil",
            image: "/img/image.jpg",
            summary:
                "Olah raga memang penting untuk kesehatan ibu hamil. Namun, ada aturan yang perlu diperhatikan...",
            content:
                "Selama kehamilan, penting untuk menghindari gerakan tertentu seperti membungkuk terlalu lama, mengangkat beban berat, dan olahraga intensitas tinggi. Gerakan ini bisa berdampak buruk pada janin dan kesehatan ibu.",
            date: "Mar 12, 2025",
        },
        {
            title: "Fase Perkembangan Janin, Kapan Embrio...",
            image: "/img/image2.jpg",
            summary:
                "Pahami bagaimana janin berkembang dari embrio hingga bayi siap lahir.",
            content:
                "Perkembangan janin dimulai dari tahap embrio, lalu berubah menjadi janin lengkap. Setiap trimester memiliki ciri khas seperti pembentukan organ, perkembangan otak, dan kesiapan lahir.",
            date: "Mar 12, 2025",
        },
        {
            title: "4 Jenis Persalinan yang Perlu Bumil Tahu",
            image: "/img/image1.jpg",
            summary:
                "Mengetahui berbagai metode persalinan membantu ibu mengambil keputusan yang tepat.",
            content:
                "Jenis persalinan antara lain persalinan normal, sesar, VBAC (Vaginal Birth After Cesarean), dan gentle birth. Masing-masing memiliki kelebihan dan risiko tersendiri.",
            date: "Mar 12, 2025",
        },
        {
            title: "Ketahui 18 Fakta Bayi Baru Lahir",
            image: "/img/image3.jpg",
            summary:
                "Bayi baru lahir memiliki banyak hal unik yang seringkali mengejutkan orang tua baru.",
            content:
                "Fakta seperti warna mata yang bisa berubah, refleks alami, dan pola tidur bayi bisa membantu orang tua lebih siap menghadapi masa awal kelahiran.",
            date: "Mar 12, 2025",
        },
        {
            title: "Melahirkan Lebih Tenang dengan Gentle Birth",
            image: "/img/image1.jpg",
            summary:
                "Gentle birth menawarkan pengalaman melahirkan yang lebih damai dan minim trauma.",
            content:
                "Gentle birth mengedepankan suasana nyaman, penggunaan teknik relaksasi, dan komunikasi yang mendukung antara ibu dan tenaga medis.",
            date: "Mar 12, 2025",
        },
        {
            title: "Apakah Ibu Hamil Boleh Memakai Skincare?",
            image: "/img/image4.jpg",
            summary:
                "Tidak semua produk skincare aman untuk ibu hamil. Pelajari yang perlu dihindari.",
            content:
                "Beberapa bahan skincare seperti retinoid, salicylic acid, dan hydroquinone perlu dihindari. Pilih produk yang mengandung bahan alami dan konsultasikan dengan dokter.",
            date: "Mar 12, 2025",
        },
        {
            title: "11 Makanan Penambah Nafsu Makan Ibu Hamil",
            image: "/img/image1.jpg",
            summary:
                "Nafsu makan menurun saat hamil? Coba makanan-makanan berikut!",
            content:
                "Buah segar, kacang-kacangan, yoghurt, dan makanan ringan sehat bisa meningkatkan nafsu makan ibu hamil sambil tetap bergizi tinggi.",
            date: "Mar 12, 2025",
        },
    ];

    const article = articles.find((a) => a.title === articleTitle);
    const articleDetail = document.getElementById("article-detail");

    if (article) {
        articleDetail.innerHTML = `
            <h1>${article.title}</h1>
            <img src="${article.image}" alt="Artikel">
            <p>${article.date}</p>
            <p>${article.content}</p>
        `;
    } else {
        articleDetail.innerHTML = `<p>Artikel tidak ditemukan.</p>`;
    }
});
