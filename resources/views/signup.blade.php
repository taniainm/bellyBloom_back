<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/css/signup.css">
    <title>Belly Bloom</title>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"></script>
</head>
<body style="background: url('img/backSign.jpg'); background-size: cover ; background-position: center;">
    <div class="navbar">
        <a href="/" class="logo">
            <img src="img/logo.png" alt="Logo Website">
        </a>
        <div class="menu">
            <a href="/">Beranda</a>
            <a href="/home">Fitur</a>
            <a href="/artikel">Artikel</a>
            <a href="#kontak">Tentang Kami</a>
            <a href="/login" class="btn-login">Login</a>
        </div>
    </div>

    <div class="hero">
        <div class="hero-left">
        <h1>Create </h1>
        <h1> New Account </h1>
        <p>Already Register? <a href="login">Login</a></p>
    </div>
    <div class="hero-right">
        <h1><b>Sign Up</b></h1>
        <div class="container">
        <form id="signupForm">
            <input type="email" name="email" placeholder="Email" required>
            
            <div class="password-container">
                <input type="password" name="password" id="password" placeholder="Password" required>
                <i class="fas fa-eye password-toggle" id="togglePassword"></i>
            </div>
            
            <div class="password-container">
                <input type="password" name="password2" id="confirmPassword" placeholder="Confirm Password" required>
                <i class="fas fa-eye password-toggle" id="toggleConfirmPassword"></i>
            </div>
            
            <input type="text" name="phone" id="phone" placeholder="Phone" required>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    </div>

    <script type="module" src="/js/firestore-init.js"></script>
    <script type="module" src="/js/signup.js"></script>
    <script src="/js/password-toggle.js"></script>
</body>
</html>