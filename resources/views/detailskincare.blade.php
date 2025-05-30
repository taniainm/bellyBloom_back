<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Skincare</title>
    <link rel="stylesheet" href="/css/detailskincare.css">
</head>
<body>
    <div class="navbar">
        <a href="/main" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/main">Beranda</a>
            <a href="/home" class="nav-link active">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="#profil" class="fas fa-user-circle"></a>
        </div>
    </div>

    <div class="container">
        <div class="skincare-detail">
            <img id="skincare-image" src="" alt="Skincare Image">
            <div class="skincare-info">
                <h2 id="skincare-type"></h2>
                <h1 id="skincare-name"></h1>
                <h2> Harga </h2>
                <p id="skincare-price"></p>
            </div>
        </div>
        
        <div class="tab-menu">
            <button class="active" onclick="showTab('description')">Deskripsi</button>
            <button onclick="showTab('usage')">Cara Pakai</button>
            <button onclick="showTab('ingredients')">Kandungan</button>
        </div>
        <div class="tab-content">
            <div id="description" class="tab active">
                <p id="skincare-description"></p>
            </div>
            <div id="usage" class="tab">
                <p id="skincare-usage"></p>
            </div>
            <div id="ingredients" class="tab">
                <p id="skincare-ingredients"></p>
            </div>
        </div>
    </div>

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

    <script src="/JS/detailskincare.js"></script>
</body>
</html>