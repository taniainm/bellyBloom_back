<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Perkembangan Janin</title>
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="/CSS/pantauAdmin.css" />
</head>
<body>
    <div class="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><a href="admin.html">Dashboard</a></li>
            <li><a href="pantauAdmin.html" class="dibuka">Perkembangan Janin</a></li>
            <li><a href="skinAdmin.html">Skincare Aman</a></li>
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

  <div class="container">
    <h1>Perkembangan Janin Minggu per Minggu</h1>
    <button id="btnTambah">Tambah Info Minggu</button>

    <div id="listMinggu"></div>
  </div>

  <!-- Modal Form -->
  <div id="modalForm" class="modal hidden">
    <div class="modal-content">
      <h2 id="formTitle">Tambah / Edit Info</h2>
      <form id="weekForm">
        <label>Minggu Ke- <input type="number" id="minggu" required /></label>
        <label>Berat: <input type="text" id="berat" required /></label>
        <label>Panjang: <input type="text" id="panjang" required /></label>
        <label>Detak Jantung: <input type="text" id="detak" required /></label>
        <label>Deskripsi: <textarea id="deskripsi" rows="4" required></textarea></label>
        <label>Upload Gambar: <input type="file" id="gambarInput" accept="image/*" /></label>
        <div class="form-buttons">
        <button type="submit">Simpan</button>
        <button type="button" id="cancelBtn">Batal</button>
    </div>
      </form>
    </div>
  </div>
    </section>

  <script src="/JS/pantauAdmin.js"></script>
</body>
</html>
