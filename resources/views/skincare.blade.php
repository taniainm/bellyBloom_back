<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rekomendasi Skincare</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="/css/skincare.css">
</head>
<body>
    <div class="navbar">
        <a href="/" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/">Beranda</a>
            <a href="/home">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="/akun" class="fas fa-user-circle"></a>
        </div>
    </div>
    <header>
        <h1>Rekomendasi Skincare</h1>
        <div class="search-filter">
            <input type="text" id="search" icon = 'bx bx-search' placeholder="Cari skincare..." onkeyup="searchSkincare()">
            <span class="filter-text" id="filter-icon" onclick="toggleFilterBox()"><i class='bx bx-filter'></i></span>
        </div>
        <div class="filter-box" id="filter-box">
            <h3>Filter</h3>
            <div class="filter-item">
                <label for="price-range">Harga (Rp)</label>
                <input type="number" id="price-input" placeholder="Masukkan harga maksimal" oninput="updatePriceLabel()" />
                <span id="price-label">Rp0</span>
            </div>
            <div class="filter-item">
                <label>Jenis Kulit</label>
                <div class="skin-type-options">
                    <button data-skin-type="all" onclick="filterSkinType('all')">Semua</button>
                    <button data-skin-type="normal" onclick="filterSkinType('normal')">Kulit Normal</button>
                    <button data-skin-type="sensitif" onclick="filterSkinType('sensitif')">Kulit Sensitif</button>
                    <button data-skin-type="berjerawat" onclick="filterSkinType('berjerawat')">Kulit Berjerawat</button>
                    <button data-skin-type="berminyak" onclick="filterSkinType('berminyak')">Kulit Berminyak</button>
                    <button data-skin-type="kering" onclick="filterSkinType('kering')">Kulit Kering</button>
                </div>
            <button onclick="applyFilters()">Terapkan Filter</button>
        </div>
    </header>

    <h1 class="judul"> Skincare Untukmu</h1>
    <main>
        <div id="skincare-list" class="skincare-list"></div>

        <div class="pagination">
            <button onclick="changePage(-1)">Previous</button>
            <span id="page-number">1</span>
            <button onclick="changePage(1)">Next</button>
        </div>
    </main>

    <footer class="footer" id="kontak">
        <div class="footer-container">
            <!-- Bagian Logo dan Tagline -->
            <div class="footer-section logo">
                <img src="/img/logoBB.png" alt="Belly Bloom Logo">
                <p class="tagline">Sehat dan Cantik Saat Hamil</p>
            </div>
    
            <!-- Bagian Kontak -->
            <div class="footer-section kontak">
                <h3>Kontak</h3>
                <p>Email: support@bellybloom.com</p>
                <p>Telepon: +62 812 3456 7890</p>
                <p>Alamat: Jl. Mawar No. 123, Surabaya</p>
            </div>

            <!-- Bagian Aplikasi -->
            <div class="footer-section aplikasi">
                <h3>Unduh Aplikasi</h3>
                <a href="#"><img src="/img/playstore.png" alt="Google Play"></a>
                <a href="#"><img src="/img/appstore.png" alt="App Store"></a>
            </div>
    
            <!-- Bagian Sosial Media -->
            <div class="footer-section sosial">
                <h3>Ikuti Kami</h3>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    
        <!-- Copyright -->
        <div class="footer-bottom">
            <p>&copy; 2025 Belly Bloom. All Rights Reserved.</p>
        </div>
    </footer>

    <script type="module" src="/js/artikel.js"></script>
    <script type="module" src="/js/skincare.js"></script>
</body>
</html>
