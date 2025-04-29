<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CSS/prohamil.css">
    <title>Profil Ibu Hamil</title>
</head>
<body>
   <!-- Navbar -->
   <div class="navbar">
    <a href="main.html" class="logo">
        <img src="/assets/img/logo.png" alt="Logo Website">
    </a>
    <div class="menu">
        <a href="#beranda">Beranda</a>
        <a href="#tentang">Fitur</a>
        <a href="#layanan">Artikel</a>
        <a href="#kontak">Tentang Kami</a>
        <img class="profile-pic" src="/assets/img/ava.png" alt="Profile">
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

                <div class="date-input">
                    <label for="hpl">HPL (Hari Perkiraan Lahir)</label>
                    <input type="date" id="hpl" placeholder="HPL">
                </div>

                <button type="button" onclick="window.location.href='landing.html'">Daftar</button>
            </form>
        </div>
    </div>

</body>
</html>
