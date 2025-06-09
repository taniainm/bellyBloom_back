<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/css/login.css">
    <title>Belly Bloom</title>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"></script>
</head>
<body style="background: url('img/backLog.jpg'); background-size: cover ; background-position: center;">
    <div class="navbar">
        <a href="/" class="logo">
            <img src="/img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/">Beranda</a>
            <a href="/home">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="/signup" class="btn-signup">Sign Up</a>
        </div>
    </div>

    <div class="hero">
        <div class="hero-left">
        <h1><b>Login</b></h1>
        <div class="container">
        <form id="loginForm">
            <input type="email" name="email" placeholder="Email" required>
            <div class="password-container">
                <input type="password" name="password" id="password" placeholder="Password" required>
                <i class="fas fa-eye password-toggle" id="togglePassword"></i>
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    </div>
    </div>
    </div>
    <script type="module" src="/js/firebase-init.js"></script>
    <script type="module" src="/js/login.js"></script>
    <script src="/js/password-toggle.js"></script>
</body>
</html>