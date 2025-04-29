<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Kelola Skincare Aman</title>
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="/CSS/skinAdmin.css">
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

  <div class="container">
    <h1>Manajemen Produk Skincare Aman</h1>

    <div class="filter">
      <label for="kategori">Filter Kulit:</label>
      <select id="kategori">
        <option value="all">Semua</option>
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
    <form>
      <input id="nama" type="text" placeholder="Nama Produk" />
      <input id="brand" type="text" placeholder="Brand" />
      <input id="jenis" type="text" placeholder="Jenis Produk" />
      <input id="kandungan" type="text" placeholder="Kandungan" />
      <input id="harga" type="number" placeholder="Harga" />
      <input id="gambar" type="text" placeholder="URL Gambar" />
      <textarea id="deskripsi" placeholder="Deskripsi"></textarea>
      <textarea id="caraPakai" placeholder="Cara Pakai"></textarea>
      <select id="kulit" placeholder="Kategori Kulit">
        <option value="" disabled selected>Pilih Kategori Kulit</option>
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

  <script src="/JS/skinAdmin.js"></script>
</body>
</html>
