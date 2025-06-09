<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kelola Artikel Kesehatan</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
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
        <li><a href="/setAdmin">Pengaturan</a></li>
        <li><a href="#" id="logoutBtn">Logout</a></li>
    </ul>
  </div>

  <section id="content">
    <!-- NAVBAR -->
    <nav class="navbar">
        <button id="toggleSidebar" class="toggle-btn">☰</button>
        </a>
    </nav>

    <div class="container">
      <h1>Manajemen Artikel Kesehatan</h1>

      <button id="btnTambah" type="button">+ Tambah Artikel Baru</button>

      <table>
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Judul Artikel</th>
            <th>Penulis</th>
            <th>Konten</th>
            <th>Tanggal Posting</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody id="artikelList">
        </tbody>
      </table>

      <!-- Form untuk menambah/edit artikel -->
      <div class="form-container" id="formArtikel" style="display: none;">
  <h2 id="formTitle">Tambah Artikel</h2>
  <form id="artikelForm" enctype="multipart/form-data" onsubmit="event.preventDefault(); saveArtikel();">
    <input type="hidden" id="editIndex">
    <input type="text" id="judul" placeholder="Judul Artikel" required>
    <textarea id="konten" placeholder="Konten Artikel" required></textarea>
    <input type="text" id="penulis" placeholder="Penulis" required>
    <input type="date" id="tanggal" required>
    <input type="file" id="gambar" accept="image/*">
    <div class="form-buttons">
      <button type="submit">Simpan</button>
      <button type="button" onclick="batalArtikel()">Batal</button>
    </div>
  </form>
</div>
    </div>
  </section>

  <script type="module" src="/js/firebase-init.js"></script>
  <script type="module" src="/js/artikelAdmin.js"></script>
</body>
</html>