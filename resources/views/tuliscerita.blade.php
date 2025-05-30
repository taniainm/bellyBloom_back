<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Komunitas - Tulis Cerita</title>
  <link rel="stylesheet" href="/css/tuliscerita.css" />
  <script src="https://unpkg.com/feather-icons"></script>
</head>
<body>
  <div class="navbar">
    <a href="/main" class="logo">
      <img src="/img/logo.png" alt="Logo Website" />
    </a>
    <div class="menu">
      <a href="#beranda">Beranda</a>
      <a href="#fitur">Fitur</a>
      <a href="#artikel">Artikel</a>
      <a href="#tentang">Tentang Kami</a>
      <img class="profile-pic" src="/img/ava.png" alt="Profile" />
    </div>
  </div>

  <div class="main-container">
    <div class="left-panel">
      <div class="header-form">
        <button class="form-action" onclick="batalkanCerita()">Batalkan</button>
        <button class="form-action" onclick="postingCerita()">Posting</button>
      </div>
      <div class="user-info">
        <img src="/img/ava.png" alt="Avatar">
        <span>Indah</span>
      </div>

      <div class="label-topik">Topik</div>
      <div id="selected-tags"></div>
      <div class="tag-options" id="tag-options">
        <button class="tag-button">Umum <span>+</span></button>
        <button class="tag-button">Kehamilan <span>+</span></button>
        <button class="tag-button">Trimester 1 <span>+</span></button>
        <button class="tag-button">Trimester 2 <span>+</span></button>
        <button class="tag-button">Trimester 3 <span>+</span></button>
      </div>

      <div class="judul-cerita">Tulis Ceritamu</div>
      <textarea placeholder="Ketikkan ceritamu di sini..."></textarea>
    </div>

    <div class="right-panel">
      <h2 class="section-title">Postinganmu</h2>

      <div class="post-item">
        <div class="post-header">
          <img src="/img/ava.png" alt="User Avatar" class="post-avatar" />
          <div class="post-user-info">
            <span class="post-username">NamaUser</span>
            <span class="post-time">2 hari yang lalu</span>
          </div>
        </div>

        <div class="post-content">
          <h4 class="post-title">Judul Cerita</h4>
          <p class="post-text">Ini adalah isi cerita pendek dari user yang sudah diposting. Bisa cerita pengalaman, curhat, atau hal-hal seputar kehamilan.</p>
        </div>

        <div class="post-actions">
          <span class="like icon-button"><i data-feather="heart"></i> <span>12</span></span>
          <span class="comment icon-button"><i data-feather="message-circle"></i> <span>5</span></span>
        </div>
      </div>
    </div>
  </div>

  <script src="/JS/tuliscerita.js"></script>
</body>
</html>
