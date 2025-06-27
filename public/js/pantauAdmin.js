import { auth } from "./firebase-init.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// ...existing code...

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.href = "/login";
            } catch (err) {
                alert("Gagal logout: " + err.message);
            }
        });
    }
});

let weeks = [];

const listDiv = document.getElementById("listMinggu");
const modal = document.getElementById("modalForm");
const form = document.getElementById("weekForm");
const btnTambah = document.getElementById("btnTambah");
const cancelBtn = document.getElementById("cancelBtn");

let editId = null;

// Ambil data dari backend
async function fetchWeeks() {
    const res = await fetch("/api/perkembangan");
    if (res.ok) {
        weeks = await res.json();
        renderList();
    } else {
        weeks = [];
        renderList();
        alert("Gagal mengambil data dari server");
    }
}

// Render list minggu
function renderList() {
    listDiv.innerHTML = "";
    weeks
        .sort((a, b) => a.minggu - b.minggu)
        .forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
        <img src="${
            item.gambar ? "/storage/" + item.gambar : "/assets/img/default.jpg"
        }" alt="minggu-${item.minggu}">
        <div class="card-content">
          <h3>Minggu ke-${item.minggu}</h3>
          <p><strong>Berat:</strong> ${item.berat}</p>
          <p><strong>Panjang:</strong> ${item.panjang}</p>
          <p><strong>Detak Jantung:</strong> ${item.detak}</p>
          <p>${item.deskripsi ?? ""}</p>
          <button class="edit" data-id="${item.id}">Edit</button>
          <button class="hapus" data-id="${item.id}">Hapus</button>
        </div>
      `;
            listDiv.appendChild(div);
        });

    // Tambahkan event listener untuk tombol edit dan hapus
    document.querySelectorAll(".edit").forEach((btn) => {
        btn.onclick = () => editData(btn.getAttribute("data-id"));
    });
    document.querySelectorAll(".hapus").forEach((btn) => {
        btn.onclick = () => hapusData(btn.getAttribute("data-id"));
    });
}

// Tampilkan modal tambah
btnTambah.onclick = () => {
    form.reset();
    editId = null;
    modal.classList.remove("hidden");
};

// Batal
cancelBtn.onclick = () => {
    modal.classList.add("hidden");
};

// Submit form (tambah/edit)
form.onsubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    let url = "/janin/store";
    let method = "POST";

    if (editId) {
        url = `/janin/update/${editId}`;
        formData.append("_method", "POST");
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
                Accept: "application/json",
            },
            body: formData,
        });

        const data = await res.json();

        if (res.ok) {
            await fetchWeeks();
            modal.classList.add("hidden");
        } else {
            alert(data.message || "Gagal menyimpan data");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menyimpan data");
    }
};

// Edit data
async function editData(id) {
    const data = weeks.find((w) => w.id == id);
    if (!data) return;
    editId = id;
    document.getElementById("minggu").value = data.minggu;
    document.getElementById("berat").value = data.berat;
    document.getElementById("panjang").value = data.panjang;
    document.getElementById("detak").value = data.detak;
    document.getElementById("deskripsi").value = data.deskripsi;
    modal.classList.remove("hidden");
}

// Hapus data
async function hapusData(id) {
    if (confirm("Yakin ingin menghapus info minggu ini?")) {
        const csrf = document.querySelector('meta[name="csrf-token"]').content;
        const formData = new FormData();
        formData.append("_method", "DELETE");
        const res = await fetch(`/janin/delete/${id}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": csrf,
            },
            body: formData,
        });
        if (res.ok) {
            await fetchWeeks();
        } else {
            alert("Gagal menghapus data");
        }
    }
}

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
});

// Inisialisasi
fetchWeeks();
