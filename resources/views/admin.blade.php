<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <link rel="stylesheet" href="/css/dashboardAdm.css">
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <script defer src="/JS/dashboardAdm.js"></script>
</head>
<body>
    
    <div class="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><a href="/admin"  class="dibuka">Dashboard</a></li>
            <li><a href="/perkembanganAdmin">Perkembangan Janin</a></li>
            <li><a href="/skincareAdmin">Skincare Aman</a></li>
            <li><a href="/artikelAdmin">Artikel</a></li>
            <li><a href="/komunitasAdmin">Komunitas</a></li>
            <li><a href="/user">Pengguna</a></li>
            <li><a href="/laporanAdmin">Laporan</a></li>
            <li><a href="/setAdmin">Pengaturan</a></li>
        </ul>
    </div>
    
    <section id="content">
        <!-- NAVBAR -->
        <nav class="navbar">
            <button id="toggleSidebar" class="toggle-btn">☰</button>
            <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="Search...">
                    <button type="submit" class="search-btn"><i class='bx bx-search'></i></button>
                </div>
            </form>
            <a href="#" class="profile">
                <img src="/img/fitskin.jpg">
            </a>
        </nav>

    <div class="main-content">
        <header>
            <h1>Dashboard Admin</h1>
        </header>
        
        <section class="stats">
            <div class="card">
                <h3>Pengguna</h3>
                <p id="userCount">120</p>
            </div>
            <div class="card">
                <h3>Artikel</h3>
                <p id="articleCount">45</p>
            </div>
            <div class="card">
                <h3>Komunitas</h3>
                <p id="communityPosts">78</p>
            </div>
            <div class="card">
                <h3>Laporan</h3>
                <p id="reportCount">5</p>
            </div>
        </section>
</section>
</body>
</html>
