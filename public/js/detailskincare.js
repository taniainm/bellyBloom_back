document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");

    try {
        // Ambil semua data skincare dari API
        const res = await fetch("/api/care");
        if (!res.ok) throw new Error("Gagal mengambil data skincare");
        const skincareData = await res.json();

        // Cari produk berdasarkan nama (case-insensitive)
        const product = skincareData.find(
            (item) => item.nama.toLowerCase() === productName.toLowerCase()
        );

        if (product) {
            document.getElementById("skincare-image").src =
                "/storage/" + product.gambar;
            document.getElementById("skincare-type").innerText = product.jenis;
            document.getElementById("skincare-name").innerText = product.nama;
            document.getElementById(
                "skincare-price"
            ).innerText = `Rp${product.harga}`;
            document.getElementById("skincare-description").innerText =
                product.deskripsi;
            document.getElementById("skincare-usage").innerText =
                product.cara_pakai;
            document.getElementById("skincare-ingredients").innerText =
                product.kandungan;
        } else {
            alert("Produk tidak ditemukan!");
        }
    } catch (error) {
        alert(error.message);
    }
});

function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab");
    const buttons = document.querySelectorAll(".tab-menu button");

    tabs.forEach((tab) => tab.classList.remove("active"));
    buttons.forEach((button) => button.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    document
        .querySelector(`.tab-menu button[onclick="showTab('${tabId}')"]`)
        .classList.add("active");
}
