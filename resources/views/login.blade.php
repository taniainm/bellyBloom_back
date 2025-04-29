<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/CSS/login.css">
    <title>Belly Bloom</title>
</head>
<body>
    <div class="navbar">
        <a href="main.html" class="logo">
            <img src="/assets/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="main.html">Beranda</a>
            <a href="landing.html">Fitur</a>
            <a href="artikel.html">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="signup.html" class="btn-signup">Sign Up</a>
        </div>
    </div>

    <div class="hero">
        <div class="hero-left">
        <h1><b>Login</b></h1>
        <div class="container">
        <form action="login.php" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" onclick="window.location.href='landing.html'">Login</button>
        </form>
        </div>
    </div>
    </div>
    </div>
</body>