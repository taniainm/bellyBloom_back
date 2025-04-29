<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Komunitas</title>
  <script src="https://unpkg.com/feather-icons"></script>
  <link rel="stylesheet" href="/CSS/komunitas.css" />
</head>
<body>
  <!-- Navbar -->
  <div class="navbar">
    <a href="main.html" class="logo">
      <img src="/assets/img/logo.png" alt="Logo Website" />
    </a>
    <div class="menu">
      <a href="#beranda">Beranda</a>
      <a href="#fitur">Fitur</a>
      <a href="#artikel">Artikel</a>
      <a href="#tentang">Tentang Kami</a>
      <img class="profile-pic" src="/assets/img/ava.png" alt="Profile" />
    </div>
  </div>

  <!-- Judul Komunitas -->
  <header class="header">
    <h1>Komunitas</h1>
  </header>

  <!-- Konten Utama -->
  <main class="komunitas-container">
    <section class="konten-kiri">
      <div class="filter-btns">
        <button class="active">Terbaru</button>
        <button>Populer</button>
      </div>

      <!-- Postingan akan ditambahkan lewat JavaScript -->
      <div id="post-container"></div>
    </section>

    <aside class="konten-kanan">
      <div class="box">
        <p class="deskripsi">
          Komunitas ini merupakan ruang bagi para ibu hamil untuk berbagi pengalaman, mendapatkan informasi, serta saling mendukung selama masa kehamilan...
        </p>
        <div class="topik">
          <h3>Topik</h3>
          <div class="tag-container">
            <span class="tag">Umum</span>
            <span class="tag">Kehamilan</span>
            <span class="tag">Trimester 1</span>
            <span class="tag">Trimester 2</span>
            <span class="tag">Trimester 3</span>
          </div>
        </div>
      </div>

      <div class="konten-kanan">
        <a href="tuliscerita.html" class="box tulis-cerita-box">
          <i data-feather="edit-3"></i>
          <span>Tulis ceritamu di sini</span>
        </a>              
      </div>
    </aside>       
  </main>

  <!-- Script -->
  <script src="/JS/komunitas.js"></script>
</body>
</html>
