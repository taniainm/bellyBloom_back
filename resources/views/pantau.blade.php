<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/css/pantau.css">
    <title>Belly Bloom</title>
</head>
<body>
    <div class="navbar">
        <a href="/" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/">Beranda</a>
            <a href="/home" class="nav-link active">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="/akun" class="fas fa-user-circle"></a>
        </div>
    </div>

    <h1 id="judulPerkembangan">Perkembangan Janin</h1>
    <img class= "ilustrasi" src="/img/w1.jpg" alt="ilustrasi">

    <div class="buttonWeek" id="buttonContainer"></div>

    <div class="container">
        <label for="weekInput">Lihat Perkembangan Janin Minggu ke-</label>
        <input type="number" id="weekInput" min="1" max="40">
        <button id="pilihButton">Pilih</button>
    </div>

    <section class="perkembangan-container">
        <div class="background-pink">
            <!-- Kotak Minggu -->
            <div class="minggu-box">
                <h3 id="mingguKalender">Minggu 1</h3>
            </div>
    
            <!-- Gambar Janin di Tengah -->
            <div class="gambar-janin">
                <img id="janinImage" src="/img/w1.jpg" alt="Gambar janin">
            </div>
    
            <!-- Container Putih untuk Info Berat, Panjang, Detak -->
            <div class="info-container">
                <div class="info-item">
                    <p>Berat</p>
                    <h3 id="ukuranJanin">0-0 Gram</h3>
                </div>
                <div class="info-item">
                    <p>Panjang</p>
                    <h3 id="panjangJanin">0-0 Cm</h3>
                </div>
                <div class="info-item">
                    <p>Detak</p>
                    <h3 id="detakJantung">0-0 Per detik</h3>
                </div>
            </div>
    
            <!-- Deskripsi -->
            <div class="deskripsi-container">
                <p id="deskripsiContent">
                    Apa yang terjadi di Minggu 1...
                </p>
            </div>
        </div>
    </section>

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
    <script type="module" src="/js/pantau.js"></script>
</body>