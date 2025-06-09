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
        <button class="form-action" id="batalkan-btn" type="button">Batalkan</button>
        <button class="form-action" id="posting-btn" type="button">Posting</button>
      </div>
      <div class="user-info">
        <img src="/img/ava.png" alt="Avatar">
        <span>Indah</span>
      </div>

      <div class="label-topik">Topik</div>
      <div id="selected-tags"></div>
      <div class="tag-options" id="tag-options"></div>

      <div class="judul-cerita">Tulis Ceritamu</div>
      <textarea id="cerita-textarea" placeholder="Ketikkan ceritamu di sini..."></textarea>
    </div>

    <div class="right-panel">
      <h2 class="section-title">Postinganmu</h2>
    </div>
  </div>

  <script type="module" src="/js/firebase-init.js"></script>
  <script type="module" src="/js/tuliscerita.js"></script>
  <script type="module" src="/js/firebase-post.js"></script>
  <script type="module" src="/js/tuliscerita-ui.js"></script>
</body>
</html>