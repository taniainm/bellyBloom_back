<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/CSS/komunAdmin.css" />
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>  
  <title>Dashboard Komunitas</title>
</head>
<body>

    <div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="admin.html">Dashboard</a></li>
        <li><a href="pantauAdmin.html">Perkembangan Janin</a></li>
        <li><a href="skinAdmin.html">Skincare Aman</a></li>
        <li><a href="artikelAdmin.html">Artikel</a></li>
        <li><a href="komunAdmin.html" class="dibuka">Komunitas</a></li>
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

  <h1>Moderasi Komunitas</h1>

  <div id="komunitas"></div>

  <div id="alasanModal" class="modal hidden">
    <div class="modal-content">
      <h3>Pilih Alasan untuk Menyembunyikan Postingan</h3>
      <select id="alasanSelect">
        <option value="" disabled selected>Pilih alasan</option>
        <option value="Melanggar panduan komunitas">Melanggar panduan komunitas</option>
        <option value="Bahasa kasar">Bahasa kasar</option>
        <option value="Spam">Spam</option>
        <option value="Konten tidak relevan">Konten tidak relevan</option>
      </select>
      <div class="modal-buttons">
        <button id="confirmAlasan" class="btn-success">Konfirmasi</button>
        <button id="cancelAlasan" class="btn-cancel">Batal</button>
      </div>
    </div>
  </div>
</section>

  <script src="/JS/komunAdmin.js"></script>
</body>
</html>
