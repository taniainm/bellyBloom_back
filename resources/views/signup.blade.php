<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/CSS/signup.css">
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
            <a href="login.html" class="btn-login">Login</a>
        </div>
    </div>

    <div class="hero">
        <div class="hero-left">
        <h1>Create </h1>
        <h1> New Account </h1>
        <p>Already Register? <a href="/HTML/login.html">Login</a></p>
    </div>
    <div class="hero-right">
        <h1><b>Sign Up</b></h1>
        <div class="container">
        <form action="signup.php" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="password2" placeholder="Confirm Password" required>
            <input type="text" name="phone" placeholder="Phone" required>
            <button type="submit" onclick="window.location.href='prohamil.html'">Sign Up</button>
        </form>
    </div>
    </div>

</body>
</html>