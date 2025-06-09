import { auth } from "./firebase-init.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

let editingId = null;
let articles = [];

document.addEventListener("DOMContentLoaded", async () => {
    // Logout handler
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

    await fetchArticles();
    setupEventListeners();
});

async function fetchArticles() {
    try {
        const response = await fetch("/api/articlesApi");
        if (!response.ok) throw new Error("Gagal mengambil data artikel");
        articles = await response.json();
        renderTable();
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal memuat data artikel");
    }
}

function setupEventListeners() {
    const btnTambah = document.getElementById("btnTambah");
    if (btnTambah) btnTambah.addEventListener("click", toggleForm);

    // Sidebar toggle
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const content = document.getElementById("content");

    if (toggleSidebar && sidebar && content) {
        toggleSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
            content.classList.toggle("full-width");
        });
    }
}

function toggleForm() {
    const form = document.getElementById("formArtikel");
    const formTitle = document.getElementById("formTitle");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
        if (formTitle) formTitle.textContent = "Tambah Artikel";
        clearForm();
        editingId = null;
    } else {
        form.style.display = "none";
    }
}

async function saveArtikel() {
    const formData = new FormData();
    formData.append("title", document.getElementById("judul").value);
    formData.append("content", document.getElementById("konten").value);
    formData.append("author", document.getElementById("penulis").value);
    formData.append("publish_date", document.getElementById("tanggal").value);

    // Tambahkan file gambar jika ada
    const imageInput = document.getElementById("gambar");
    if (imageInput && imageInput.files[0]) {
        // Cek ukuran file (dalam byte, 2MB = 2*1024*1024)
        if (imageInput.files[0].size > 2 * 1024 * 1024) {
            alert("Ukuran gambar tidak boleh lebih dari 2MB (2048 KB).");
            return;
        }
        formData.append("image", imageInput.files[0]);
    }

    try {
        const url = editingId ? `/articles/${editingId}` : "/articles";
        const method = "POST"; // Laravel resource: update biasanya POST + _method=PUT
        if (editingId) formData.append("_method", "PUT");

        const response = await fetch(url, {
            method,
            headers: {
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.errors && errorData.errors.image) {
                alert(errorData.errors.image[0]);
            } else if (errorData.message) {
                alert(errorData.message);
            } else {
                alert("Gagal menyimpan artikel");
            }
            throw new Error("Gagal menyimpan artikel");
        }

        await fetchArticles();
        toggleForm();
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal menyimpan artikel: " + error.message);
    }
}

function editArtikel(id) {
    const article = articles.find((a) => a.id == id);
    if (!article) return;

    document.getElementById("judul").value = article.title;
    document.getElementById("konten").value = article.content;
    document.getElementById("penulis").value = article.author;
    document.getElementById("tanggal").value = article.publish_date
        ? article.publish_date.split("T")[0]
        : "";

    editingId = id;
    const formTitle = document.getElementById("formTitle");
    if (formTitle) formTitle.textContent = "Edit Artikel";
    document.getElementById("formArtikel").style.display = "block";
}

async function deleteArtikel(id) {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
        const response = await fetch(`/articles/${id}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
        });

        if (!response.ok) throw new Error("Gagal menghapus artikel");

        await fetchArticles();
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghapus artikel");
    }
}

function batalArtikel() {
    clearForm();
    document.getElementById("formArtikel").style.display = "none";
}

function clearForm() {
    const judul = document.getElementById("judul");
    const konten = document.getElementById("konten");
    const penulis = document.getElementById("penulis");
    const tanggal = document.getElementById("tanggal");
    const gambar = document.getElementById("gambar");

    if (judul) judul.value = "";
    if (konten) konten.value = "";
    if (penulis) penulis.value = "";
    if (tanggal) tanggal.value = "";
    if (gambar) gambar.value = "";
    editingId = null;
}

function renderTable() {
    const tbody = document.querySelector("#artikelList");
    if (!tbody) return;
    tbody.innerHTML = "";

    articles.forEach((article) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${
                article.image
                    ? "/storage/" + article.image
                    : "/img/default-article.jpg"
            }" alt="${article.title}" width="50"></td>
            <td>${article.title}</td>
            <td>${article.author}</td>
            <td>${
                article.content ? article.content.substring(0, 100) : ""
            }...</td>
            <td>${
                article.publish_date
                    ? new Date(article.publish_date).toLocaleDateString()
                    : ""
            }</td>
            <td class="action-buttons">
                <button class="edit" onclick="editArtikel(${
                    article.id
                })">Edit</button>
                <button class="delete" onclick="deleteArtikel(${
                    article.id
                })">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Export fungsi ke global scope agar bisa dipanggil dari HTML
window.toggleForm = toggleForm;
window.saveArtikel = saveArtikel;
window.editArtikel = editArtikel;
window.deleteArtikel = deleteArtikel;
window.batalArtikel = batalArtikel;
