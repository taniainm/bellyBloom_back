<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/prohamil.css">
    <title>Profil Ibu Hamil</title>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"></script>

</head>
<body style="background: url('img/roleHamil.jpg'); background-size: cover ; background-position: center;">
   <!-- Navbar -->
   <div class="navbar">
        <a href="/main" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/main">Beranda</a>
            <a href="/home">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="/akun" class="fas fa-user-circle"></a>
        </div>
    </div>

    <!-- Form Lengkapi Profil -->
    <div class="container">
        <div class="form-box">
            <h1 class="title">Lengkapi Profilmu</h1>
            <form>
                <label for="nama">Nama</label>
                <input type="text" id="nama" placeholder="Nama" class="input-text">
                <label for="usia" >Usia</label>
                <input type="number" id="usia" placeholder="Usia" class="input-text">
                
                <div class="date-input">
                    <label for="hpht">HPHT (Hari Pertama Haid Terakhir)</label>
                    <input type="date" id="hpht" placeholder="HPHT">
                </div>

                <button type="submit">Daftar</button>
            </form>
        </div>
    </div>


    <script type="module" src="/js/firebase-init.js"></script>
    <script type="module" src="/js/prohamil.js"></script>
</body>
</html>
