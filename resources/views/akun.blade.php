<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CSS/akun.css">
    <title>Profil Ibu Hamil</title>
</head>
<body>

<!-- Navbar -->
<div class="navbar">
    <a href="main.html" class="logo">
        <img src="/assets/img/logo.png" alt="Logo Website">
    </a>
    <div class="menu">
        <a href="#beranda">Beranda</a>
        <a href="#tentang">Fitur</a>
        <a href="#layanan">Artikel</a>
        <a href="#kontak">Tentang Kami</a>
        <img class="profile-pic" src="/assets/img/ava.png" alt="Profile">
    </div>
</div>

<!-- Konten Utama -->
<div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
        <button class="sidebar-btn">Pengaturan</button>
        <ul class="sidebar-menu">
            <li class="active">Akun</li>
            <a href="password.html"> <li>Ubah password</li></a>
            <li>Hapus akun</li>
            <li>Log out</li>
        </ul>
    </div>

    <!-- Konten Form Akun -->
    <div class="main-content">
        <h1>Akun</h1>
        <div class="card">
            <div class="avatar-section">
                <img src="/assets/img/ava.png" alt="Avatar" class="avatar">
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

                <label for="alamat">Alamat</label>
                <input type="text" id="alamat" placeholder="Alamat Rumah">

                <button type="submit" class="btn-simpan">Simpan Perubahan</button>
            </form>
        </div>
    </div>
</div>

</body>
</html>
