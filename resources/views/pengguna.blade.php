<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manajemen Pengguna</title>
    <link rel="stylesheet" href="/css/pengguna.css">
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>

    <div class="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><a href="/admin">Dashboard</a></li>
            <li><a href="/perkembangaAdmin">Perkembangan Janin</a></li>
            <li><a href="/skincareAdmin">Skincare Aman</a></li>
            <li><a href="/artikelAdmin">Artikel</a></li>
            <li><a href="/komunitasAdmin">Komunitas</a></li>
            <li><a href="/user" class="dibuka">Pengguna</a></li>
            <li><a href="/setAdmin">Pengaturan</a></li>
            <li><a href="#" id="logoutBtn">Logout</a></li>
        </ul>
    </div>
    
    <section id="content">
        <!-- NAVBAR -->
        <nav class="navbar">
            <button id="toggleSidebar" class="toggle-btn">☰</button>
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
    </div>
</section>
<script type="module" src="/js/firebase-init.js"></script>
<script type="module" src="/js/pengguna.js"></script>
</body>
</html>
