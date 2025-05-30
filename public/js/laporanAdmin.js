const laporanData = [
  {
    id: 1,
    tanggal: "2025-04-10",
    pelapor: "Ibu Lani",
    deskripsi: "Ada bug saat mengisi data kehamilan.",
    jenis: "Bug",
    status: "baru",
    respon: ""
  },
  {
    id: 2,
    tanggal: "2025-04-12",
    pelapor: "Ibu Dewi",
    deskripsi: "Postingan mengandung konten tidak pantas.",
    jenis: "Konten",
    status: "diproses",
    respon: ""
  },
];

function renderLaporan() {
  const container = document.getElementById("laporanContainer");
  const filter = document.getElementById("filterStatus").value;
  container.innerHTML = "";
  laporanData.forEach((laporan) => {
    if (filter !== "semua" && laporan.status !== filter) return;

    const div = document.createElement("div");
    div.className = "laporan";

    div.innerHTML = `
      <div class="laporan-header">
        <span>${laporan.pelapor} (${laporan.jenis})</span>
        <span class="status">${laporan.status}</span>
      </div>
      <div><strong>Tanggal:</strong> ${laporan.tanggal}</div>
      <div><strong>Deskripsi:</strong> ${laporan.deskripsi}</div>

      <div class="actions">
        <select onchange="ubahStatus(${laporan.id}, this.value)">
          <option value="baru" ${laporan.status === "baru" ? "selected" : ""}>Baru</option>
          <option value="diproses" ${laporan.status === "diproses" ? "selected" : ""}>Diproses</option>
          <option value="selesai" ${laporan.status === "selesai" ? "selected" : ""}>Selesai</option>
        </select>
        <button onclick="toggleRespon(${laporan.id})">Respon</button>
      </div>
      <div id="respon-${laporan.id}" style="display:none;">
        <textarea placeholder="Tulis respon..." oninput="simpanRespon(${laporan.id}, this.value)">${laporan.respon}</textarea>
      </div>
    `;

    container.appendChild(div);
  });
}

function ubahStatus(id, statusBaru) {
  const laporan = laporanData.find(l => l.id === id);
  laporan.status = statusBaru;
  renderLaporan();
}

function toggleRespon(id) {
  const responBox = document.getElementById(`respon-${id}`);
  responBox.style.display = responBox.style.display === "none" ? "block" : "none";
}

function simpanRespon(id, text) {
  const laporan = laporanData.find(l => l.id === id);
  laporan.respon = text;
}


const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
}); 

renderLaporan();