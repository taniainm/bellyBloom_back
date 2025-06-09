<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/css/komunAdmin.css" />
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>  
  <title>Dashboard Komunitas</title>
</head>
<body>

    <div class="sidebar" id="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/perkembanganAdmin">Perkembangan Janin</a></li>
        <li><a href="/skincareAdmin">Skincare Aman</a></li>
        <li><a href="/artikelAdmin">Artikel</a></li>
        <li><a href="/komunitasAdmin" class="dibuka">Komunitas</a></li>
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
            <img src="/img/fitskin.jpg">
        </a>
    </nav>

  <h1>Moderasi Komunitas</h1>

  <div id="komunitas"></div>
</section>

  <script type="module" src="/js/komunAdmin.js"></script>
</body>
</html>
