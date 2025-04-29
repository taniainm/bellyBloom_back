<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ubah Password</title>
    <link rel="stylesheet" href="/CSS/password.css">
</head>
<body>
    <!-- Navbar -->
    <div class="navbar">
        <a href="main.html" class="logo">
            <img src="/assets/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="#beranda">Beranda</a>
            <a href="#fitur">Fitur</a>
            <a href="#artikel">Artikel</a>
            <a href="#tentang">Tentang Kami</a>
            <img class="profile-pic" src="/assets/img/ava.png" alt="Profile">
        </div>
    </div>

    <!-- Konten Utama -->
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <button class="sidebar-btn">Pengaturan</button>
            <ul class="sidebar-menu">
                <li>Akun</li>
                <li class="active">Ubah password</li>
                <li>Hapus akun</li>
                <li>Log out</li>
            </ul>
        </div>

        <!-- Konten Form Ubah Password -->
        <div class="main-content">
            <h1>Password</h1>
            <div class="card card-flex">
                <div class="password-avatar">
                    <img src="/assets/img/ava.png" alt="Avatar" class="avatar-big">
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
</body>
</html>
