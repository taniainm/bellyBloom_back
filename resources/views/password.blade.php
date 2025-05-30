<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ubah Password</title>
    <link rel="stylesheet" href="/css/password.css">
</head>
<body>
    <!-- Navbar -->
    <div class="navbar">
        <a href="/main" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="#beranda">Beranda</a>
            <a href="#fitur">Fitur</a>
            <a href="#artikel">Artikel</a>
            <a href="#tentang">Tentang Kami</a>
            <img class="profile-pic" src="/img/ava.png" alt="Profile">
        </div>
    </div>

    <!-- Konten Utama -->
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <button class="sidebar-btn">Pengaturan</button>
            <ul class="sidebar-menu">
                <li><a href="/akun">Akun</a></li>
                <li class="active">Ubah password</li>
                <li><button id="deleteAccountBtn">Hapus akun</button></li>
                <li><a href="#" id="logoutBtn">Log out</a></li>
            </ul>
        </div>

        <!-- Konten Form Ubah Password -->
        <div class="main-content">
            <h1>Password</h1>
            <div class="card card-flex">
                <div class="password-avatar">
                    <img src="/img/ava.png" alt="Avatar" class="avatar-big">
                </div>
                <form>
                    <label for="password-lama">Password saat ini</label>
                    <input type="password" id="password-lama" placeholder="">

                    <label for="password-baru">Password baru</label>
                    <input type="password" id="password-baru" placeholder="">

                    <label for="konfirmasi-password">Tulis ulang password baru</label>
                    <input type="password" id="konfirmasi-password" placeholder="">

                    <button type="submit" class="btn-simpan">Ubah password</button>
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
<script type="module" src="/js/password.js"></script>
</body>
</html>
