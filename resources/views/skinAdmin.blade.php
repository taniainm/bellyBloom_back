<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Kelola Skincare Aman</title>
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="/CSS/skinAdmin.css">
</head>
<body>

  <div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/perkembanganAdmin">Perkembangan Janin</a></li>
        <li><a href="/skincareAdmin" class="dibuka">Skincare Aman</a></li>
        <li><a href="/artikelAdmin">Artikel</a></li>
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
        <form action="#">
            <div class="form-input">
                <input type="search" placeholder="Search...">
                <button type="submit" class="search-btn"><i class='bx bx-search'></i></button>
            </div>
        </form>
        <a href="#" class="profile">
            <img src="../img/fitskin.jpg">
        </a>
    </nav>

  <div class="container">
    <h1>Manajemen Produk Skincare Aman</h1>

    <div class="filter">
      <label for="kategori">Filter Kulit:</label>
      <select id="kategori">
        <option value="all">Semua</option>
        <option value="normal">Kulit Normal</option>
        <option value="sensitif">Kulit Sensitif</option>
        <option value="berjerawat">Berjerawat</option>
        <option value="berminyak">Berminyak</option>
        <option value="kering">Kering</option>
      </select>
    </div>

    <button id="btnTambah">+ Tambah Produk</button>

    <!-- Tabel Produk -->
<table>
    <thead>
      <tr>
        <th>Gambar</th>
        <th>Nama Produk</th>
        <th>Brand</th>
        <th>Jenis</th>
        <th>Kandungan Aktif</th>
        <th>Harga</th>
        <th>Kategori Kulit</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody id="produkList"></tbody>
  </table>
  
  <!-- Form tambah produk -->
  <div id="formProduk" class="hidden">
    <h2 id="formTitle">Tambah Produk</h2>
    <form id="formBarang" enctype="multipart/form-data">
      <input id="nama" type="text" placeholder="Nama Produk" name="nama"/>
      <input id="brand" type="text" placeholder="Brand" name="brand"/>
      <input id="jenis" type="text" placeholder="Jenis Produk" name="jenis"/>
      <input id="kandungan" type="text" placeholder="Kandungan" name="kandungan"/>
      <input id="harga" type="number" placeholder="Harga" name="harga"/>
      <textarea id="deskripsi" placeholder="Deskripsi" name="deskripsi"></textarea>
      <textarea id="caraPakai" placeholder="Cara Pakai" name="cara_pakai"></textarea>
      <label>Upload Gambar: <input id="gambar" type="file" accept="image/*" name="gambar"/> </label>
      <select id="kulit" placeholder="Kategori Kulit" name="kategori_kulit">
        <option value="" disabled selected>Pilih Kategori Kulit</option>
        <option value="semua">Semua</option>
        <option value="normal">Normal</option>
        <option value="sensitif">Sensitif</option>
        <option value="berjerawat">Berjerawat</option>
        <option value="berminyak">Berminyak</option>
        <option value="kering">Kering</option>
      </select>
      <div class="button-container">
      <button type="button" onclick="simpanProduk()">Simpan</button>
      <button type="button" onclick="batalEdit()">Batal</button>
    </div>
    </form>
  </div>
  </div>
  </section>

  <script type="module" src="/js/firebase-init.js"></script>
  <script type="module" src="/js/skinAdmin.js"></script>
</body>
</html>
