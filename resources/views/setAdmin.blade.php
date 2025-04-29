<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pengaturan Admin</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 20px;
      background: #f0f0f0;
    }
    .section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      margin-bottom: 10px;
    }
    input, select, button, textarea {
      padding: 8px;
      margin: 5px 0;
      width: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    label {
      font-weight: bold;
    }
    button {
      background: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background: #45a049;
    }
  </style>
</head>
<body>
  <h1>Pengaturan Admin</h1>

  <div class="section">
    <h2>Ganti Password</h2>
    <label>Password Lama</label>
    <input type="password" />
    <label>Password Baru</label>
    <input type="password" />
    <label>Konfirmasi Password Baru</label>
    <input type="password" />
    <button>Ubah Password</button>
  </div>

  <div class="section">
    <h2>Profil Admin</h2>
    <label>Nama Lengkap</label>
    <input type="text" value="Admin Satu" />
    <label>Email</label>
    <input type="email" value="admin@email.com" />
    <button>Simpan Perubahan</button>
  </div>

  <div class="section">
    <h2>Preferensi Tampilan</h2>
    <label>Pilih Bahasa</label>
    <select>
      <option value="id">Bahasa Indonesia</option>
      <option value="en">English</option>
    </select>

    <label>Warna Tema Dashboard</label>
    <select>
      <option value="default">Default</option>
      <option value="gelap">Gelap</option>
      <option value="terang">Terang</option>
    </select>
  </div>

  <div class="section">
    <h2>Backup & Restore</h2>
    <button>Backup Data</button>
    <label>Restore dari file:</label>
    <input type="file" />
    <button>Restore</button>
  </div>

  <div class="section">
    <h2>Hak Akses Admin Lain</h2>
    <label>Nama Admin Baru</label>
    <input type="text" />
    <label>Email Admin Baru</label>
    <input type="email" />
    <label>Hak Akses</label>
    <select>
      <option value="view">Lihat</option>
      <option value="edit">Edit</option>
      <option value="full">Full Akses</option>
    </select>
    <button>Tambah Admin</button>
  </div>
</body>
</html>
