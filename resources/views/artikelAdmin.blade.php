<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kelola Artikel Kesehatan</title>
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="/css/artikelAdmin.css">
</head>
<body>

  <div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/perkembanganAdmin">Perkembangan Janin</a></li>
        <li><a href="/skincareAdmin">Skincare Aman</a></li>
        <li><a href="/artikelAdmin" class="dibuka">Artikel</a></li>
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

  <div class="container">
    <h1>Manajemen Artikel Kesehatan</h1>

    <button id="btnTambah" onclick="toggleForm()">+ Tambah Artikel Baru</button>

    <table>
      <thead>
        <tr>
          <th>Judul Artikel</th>
          <th>Penulis</th>
          <th>Tanggal Posting</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="artikelList">
        <!-- Data artikel akan digenerate oleh JS -->
      </tbody>
    </table>

    <!-- Form untuk menambah/edit artikel -->
    <div class="form-container" id="formArtikel" style="display: none;">
      <h2 id="formTitle">Tambah Artikel</h2>
      <input type="hidden" id="editIndex">
      <input type="text" id="judul" placeholder="Judul Artikel" required>
      <textarea id="konten" placeholder="Konten Artikel" required></textarea>
      <input type="text" id="penulis" placeholder="Penulis" required>
      <input type="date" id="tanggal" required>
      <select id="status">
        <option value="" disabled selected>Pilih Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <div class="form-buttons">
        <button onclick="simpanArtikel()">Simpan</button>
        <button onclick="batalArtikel()">Batal</button>
      </div>
    </div>
  </div>
</section>

  <script src="/JS/artikelAdmin.js"></script>
</body>
</html>
