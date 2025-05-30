const dataPostingan = [
  {
    id: 1,
    isi: "Saya baru saja masuk trimester kedua! Senang banget!",
    penulis: "Ibu Sari",
    tanggal: "2025-04-10",
    like: 12,
    komentar: ["Selamat ya, Bu!", "Semoga sehat terus!", "Trimester kedua menyenangkan!"],
    tampilkan: true
  },
  {
    id: 2,
    isi: "Ada yang punya rekomendasi skincare aman?",
    penulis: "Ibu Tania",
    tanggal: "2025-04-11",
    like: 20,
    komentar: ["Coba cari yang tanpa paraben", "Bisa konsultasi dulu ke dokter"],
    tampilkan: true
  }
];

const komunitasDiv = document.getElementById("komunitas");

function renderPostingan() {
  komunitasDiv.innerHTML = "";
  dataPostingan.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    if (!post.tampilkan) postDiv.classList.add("hidden");

    const komentarList = post.komentar.map((k, i) => `
      <div class="comment-item">
        <span>${k}</span>
        <button onclick="hapusKomentar(${post.id}, ${i})">Hapus</button>
      </div>`).join("");

    postDiv.innerHTML = `
      <div class="post-header">
        <strong>${post.penulis}</strong>
        <span>${post.tanggal}</span>
      </div>
      <div class="post-content">${post.isi}</div>
      <div class="like">${post.like} Suka</div>
      <div class="comment">${post.komentar.length} Komentar</div>
      <div class="actions">
        <button onclick="toggleTampil(${post.id})">
          ${post.tampilkan ? "Sembunyikan" : "Tampilkan"}
        </button>
      </div>
      <div class="comment-list">
        ${komentarList || '<i>Tidak ada komentar</i>'}
      </div>
    `;
    komunitasDiv.appendChild(postDiv);
  });
}

function toggleTampil(id) {
    const post = dataPostingan.find(p => p.id === id);
  
    if (post.tampilkan) {
      // Tampilkan modal
      const modal = document.getElementById("alasanModal");
      const alasanSelect = document.getElementById("alasanSelect");
      const confirmButton = document.getElementById("confirmAlasan");
      const cancelButton = document.getElementById("cancelAlasan");
  
      modal.classList.remove("hidden");
  
      // Konfirmasi alasan
      confirmButton.onclick = () => {
        const alasan = alasanSelect.value;
  
        if (!alasan) {
          alert("Anda harus memilih alasan untuk menyembunyikan postingan.");
          return;
        }
  
        console.log(`Postingan dengan ID ${id} disembunyikan karena: ${alasan}`);
        post.tampilkan = false; // Sembunyikan postingan
        modal.classList.add("hidden");
        renderPostingan();
      };
  
      // Batal menyembunyikan
      cancelButton.onclick = () => {
        modal.classList.add("hidden");
      };
  
      return; // Hentikan eksekusi lebih lanjut
    }
  
    // Toggle status tampilkan
    post.tampilkan = !post.tampilkan;
    renderPostingan();
  }

function hapusKomentar(postId, index) {
    const post = dataPostingan.find(p => p.id === postId);
  
    // Tampilkan dialog konfirmasi
    const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus komentar ini?`);
    if (konfirmasi) {
      post.komentar.splice(index, 1); // Hapus komentar jika pengguna mengonfirmasi
      renderPostingan(); // Render ulang postingan
    }
  }

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
}); 
renderPostingan();