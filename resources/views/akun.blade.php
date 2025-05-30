<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/akun.css">
    <title>Profil Ibu Hamil</title>

</head>
<body>

<!-- Navbar -->
<div class="navbar">
    <a href="/main" class="logo">
        <img src="/img/logo.png" alt="Logo Website">
    </a>
    <div class="menu">
        <a href="#beranda">Beranda</a>
        <a href="#tentang">Fitur</a>
        <a href="#layanan">Artikel</a>
        <a href="#kontak">Tentang Kami</a>
        <img class="profile-pic" src="/img/ava.png" alt="Profile">
    </div>
</div>

<!-- Konten Utama -->
<div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
        <button class="sidebar-btn">Pengaturan</button>
        <ul class="sidebar-menu">
        <li class="active">Akun</li>
        <li><a href="/password">Ubah password</a></li>
        <li><button id="deleteAccountBtn">Hapus akun</button></li>
        <li><a href="#" id="logoutBtn">Log out</a></li>
</ul>
    </div>

    <!-- Konten Form Akun -->
    <div class="main-content">
        <h1>Akun</h1>
        <div class="card">
            <div class="avatar-section">
                <img src="/img/ava.png" alt="Avatar" class="avatar">
                <div class="avatar-buttons">
                    <button class="btn-upload">Unggah</button>
                    <button class="btn-delete">Hapus</button>
                </div>
            </div>
            <form>
                <label for="nama">Nama</label>
                <input type="text" id="nama" placeholder="Nama Lengkap">

                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Alamat Email">

                <label for="telepon">No Telepon</label>
                <input type="text" id="telepon" placeholder="08xxxxxxxxxx">

                <label for="lahir">Tanggal Lahir</label>
                <input type="text" id="lahir" placeholder="Tanggal Lahir">

                <label for="perkiraanLahir">Perkiraan Lahir</label>
                <input type="date" id="perkiraanLahir" placeholder="Perkiraan Lahir">

                <label for="alamat">Alamat</label>
                <input type="text" id="alamat" placeholder="Alamat Rumah">

                <button type="submit" class="btn-simpan">Simpan Perubahan</button>
            </form>
        </div>
    </div>
</div>

<div id="confirmModal" class="modal">
    <div class="modal-content">
        <h3>Konfirmasi Penghapusan Akun</h3>
        <p>Apakah Anda yakin ingin menghapus akun? Semua data akan dihapus permanen dan tidak dapat dikembalikan.</p>
        <div class="modal-buttons">
            <button id="confirmDeleteBtn">Ya, Hapus</button>
            <button id="cancelDeleteBtn">Batal</button>
        </div>
    </div>
</div>

<script type="module" src="/js/firebase-init.js"></script>
<script type="module" src="/js/akun.js"></script>
</body>
</html>
