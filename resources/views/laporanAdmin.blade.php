<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/CSS/laporanAdmin.css" />
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <title>Dashboard Laporan</title>
</head>
<body>

<div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="admin.html">Dashboard</a></li>
        <li><a href="pantauAdmin.html">Perkembangan Janin</a></li>
        <li><a href="skinAdmin.html" class="dibuka">Skincare Aman</a></li>
        <li><a href="artikelAdmin.html">Artikel</a></li>
        <li><a href="komunAdmin.html">Komunitas</a></li>
        <li><a href="pengguna.html">Pengguna</a></li>
        <li><a href="laporanAdmin.html">Laporan</a></li>
        <li><a href="setAdmin.html">Pengaturan</a></li>
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
            <img src="/assets/img/fitskin.jpg">
        </a>
    </nav>
<div class="utama">
  <h1>Daftar Laporan Pengguna</h1>
  <div class="filter">
    <label for="filterStatus">Filter Status: </label>
    <select id="filterStatus" onchange="renderLaporan()">
      <option value="semua">Semua</option>
      <option value="baru">Baru</option>
      <option value="diproses">Diproses</option>
      <option value="selesai">Selesai</option>
    </select>
  </div>
  <div id="laporanContainer"></div>
</div>
</section>

<script src="/JS/laporanAdmin.js"></script>
</body>
</html>
