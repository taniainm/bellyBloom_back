let skincareData = [];
let currentPage = 1;
const itemsPerPage = 8;
let filteredData = [];
let selectedSkinType = "";
let priceRange = 300;

async function fetchSkincareData() {
    try {
        const res = await fetch("/api/care");
        if (!res.ok) throw new Error("Gagal mengambil data skincare");
        skincareData = await res.json();
        filteredData = skincareData;
        renderSkincare();
    } catch (error) {
        alert(error.message);
    }
}

function renderSkincare() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);
    const listElement = document.getElementById("skincare-list");
    listElement.innerHTML = "";

    pageData.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "skincare-item";
        itemElement.onclick = () => goToDetailPage(item.nama); // gunakan field nama dari DB
        itemElement.innerHTML = `
            <img src="/storage/${item.gambar}" alt="${item.nama}" />
            <div class="details">
                <h3>${item.nama}</h3>
                <p class="price-skin-type">Harga: Rp${item.harga} | Jenis Kulit: ${item.kategori_kulit}</p>
                <p>${item.deskripsi}</p>
            </div>
        `;
        listElement.appendChild(itemElement);
    });

    document.getElementById("page-number").innerText = currentPage;
}

// Fungsi search, filter, dll tetap, tapi ganti field sesuai DB (nama, harga, kategori_kulit, deskripsi, gambar, dst)

async function searchSkincare() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    filteredData = skincareData.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderSkincare();
}

function filterSkinType(type) {
    // Menghapus kelas 'active' dari semua tombol
    const buttons = document.querySelectorAll(".skin-type-options button");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    // Menambahkan kelas 'active' pada tombol yang dipilih
    const selectedButton = document.querySelector(
        `button[data-skin-type="${type}"]`
    );
    selectedButton.classList.add("active");

    // Menyaring data berdasarkan jenis kulit yang dipilih
    selectedSkinType = type;
    filteredData = skincareData.filter(
        (item) =>
            item.kategori_kulit.toLowerCase() === type.toLowerCase() ||
            type === "all"
    );
    currentPage = 1;
    renderSkincare();
}

function updatePriceLabel() {
    const priceValue = document.getElementById("price-input").value;
    document.getElementById("price-label").innerText = `Rp0 - Rp${priceValue}`;
    priceRange = priceValue;
    filteredData = skincareData.filter((item) => item.harga <= priceRange);
}

function applyFilters() {
    currentPage = 1;
    renderSkincare();
    document.getElementById("filter-box").style.display = "none";
}

function toggleFilterBox() {
    const filterBox = document.getElementById("filter-box");
    filterBox.style.display =
        filterBox.style.display === "none" || filterBox.style.display === ""
            ? "block"
            : "none";
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const newPage = currentPage + direction;
    if (newPage > 0 && newPage <= totalPages) {
        currentPage = newPage;
        renderSkincare();
    }
}

function goToDetailPage(productName) {
    // Implement navigation to a detail page (example)
    window.location.href = `/isiskincare?name=${encodeURIComponent(
        productName
    )}`;
}

// Initial render
fetchSkincareData();
