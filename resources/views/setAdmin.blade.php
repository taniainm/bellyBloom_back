<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profil Admin</title>
  <link rel="stylesheet" href="/css/setAdmin.css">
</head>
<body>
<div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/perkembanganAdmin">Perkembangan Janin</a></li>
        <li><a href="/skincareAdmin">Skincare Aman</a></li>
        <li><a href="/artikelAdmin">Artikel</a></li>
        <li><a href="/komunitasAdmin">Komunitas</a></li>
        <li><a href="/user">Pengguna</a></li>
        <li><a href="/setAdmin" class="dibuka">Pengaturan</a></li>
        <li><a href="#" id="logoutBtn">Logout</a></li>
    </ul>
</div>
<section id="content">
    <!-- NAVBAR -->
    <nav class="navbar">
        <button id="toggleSidebar" class="toggle-btn">☰</button>
    </nav>
    <h1>Pengaturan Admin</h1>

    <div class="section">
        <h2>Ganti Password</h2>
        <label for="oldPassword">Password Lama</label>
        <input type="password" id="oldPassword" />
        <label for="newPassword">Password Baru</label>
        <input type="password" id="newPassword" />
        <label for="confirmNewPassword">Konfirmasi Password Baru</label>
        <input type="password" id="confirmNewPassword" />
        <button id="btnChangePassword">Ubah Password</button>
    </div>

    <div class="section">
        <h2>Profil Admin</h2>
        <label for="adminName">Nama Lengkap</label>
        <input type="text" id="adminName" />
        <label for="adminEmail">Email</label>
        <input type="email" id="adminEmail" />
        <button id="btnSaveProfile">Simpan Perubahan</button>
    </div>

    <div class="section">
        <h3>Daftar Admin</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="adminTable">
                <!-- Data admin akan diisi lewat JS -->
            </tbody>
        </table>
    </div>
</section>

<script type="module" src="/js/setAdmin.js"></script>
<script type="module" src="/js/firebase-init.js"></script>
</body>
</html>