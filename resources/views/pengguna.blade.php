<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manajemen Pengguna</title>
    <link rel="stylesheet" href="/CSS/pengguna.css">
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <script defer src="/JS/pengguna.js"></script>
</head>
<body>

    <div class="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><a href="admin.html">Dashboard</a></li>
            <li><a href="pantauAdmin.html">Perkembangan Janin</a></li>
            <li><a href="skinAdmin.html">Skincare Aman</a></li>
            <li><a href="artikelAdmin.html">Artikel</a></li>
            <li><a href="komunAdmin.html">Komunitas</a></li>
            <li><a href="pengguna.html" class="dibuka">Pengguna</a></li>
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
        <h1>Manajemen Pengguna</h1>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Peran</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="userTable">
                <!-- Baris pengguna akan ditambahkan lewat JS -->
            </tbody>
        </table>

        <button id="btnTambah" class="btn-primary">+ Tambah Pengguna</button>

        <div id="userForm" class="form-container">
            <h2 id="formTitle">Tambah Pengguna</h2>
            <input type="hidden" id="userId">
            <input type="text" id="userName" placeholder="Nama" required>
            <input type="email" id="userEmail" placeholder="Email" required>
            <select id="userRole" required>
                <option value="" disabled selected>Pilih Peran</option>
                <option value="1">Admin</option>
                <option value="0">User</option>
              </select>
              <div class="form-buttons">
                <button onclick="saveUser()" class="btn-success">Simpan</button>
                <button onclick="cancelForm()" class="btn-cancel">Batal</button>
            </div>
        </div>
    </div>
</section>
</body>
</html>
