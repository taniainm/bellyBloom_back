let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnTambah").addEventListener("click", () => {
        document.getElementById("formProduk").classList.remove("hidden");
        document.getElementById("formTitle").textContent = "Tambah Produk";
        clearForm();
        editingId = null;
    });

    document.getElementById("kategori").addEventListener("change", renderTable);

    renderTable();
});

async function fetchProducts() {
    try {
        const response = await fetch("/api/care");
        if (!response.ok) throw new Error("Gagal mengambil data");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal memuat data produk");
        return [];
    }
}

async function renderTable() {
    const tbody = document.getElementById("produkList");
    const filter = document.getElementById("kategori").value;
    tbody.innerHTML = "";

    const products = await fetchProducts();

    products
        .filter(
            (product) => filter === "all" || product.kategori_kulit === filter
        )
        .forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="/storage/${product.gambar}" alt="${
                product.nama
            }" width="50"></td>
                <td>${product.nama}</td>
                <td>${product.brand}</td>
                <td>${product.jenis}</td>
                <td>${product.kandungan}</td>
                <td>Rp${product.harga.toLocaleString()}</td>
                <td>${product.kategori_kulit}</td>
                <td>
                    <button class="edit" onclick="editProduk(${
                        product.id
                    })">Edit</button>
                    <button class="delete" onclick="hapusProduk(${
                        product.id
                    })">Hapus</button>
                </td>
            `;
            tbody.appendChild(row);
        });
}

async function simpanProduk() {
    const formElement = document.getElementById("formBarang");
    const formData = new FormData(formElement);

    let url = "/care";
    let method = "POST";
    if (editingId) {
        url = `/care/${editingId}`;
        formData.append("_method", "PUT");
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
                Accept: "application/json",
            },
            body: formData,
        });

        if (!response.ok) throw new Error("Gagal menyimpan data");

        renderTable();
        clearForm();
        document.getElementById("formProduk").classList.add("hidden");
        editingId = null;
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal menyimpan produk");
    }
}

async function editProduk(id) {
    try {
        const response = await fetch(`/care/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data produk");

        const product = await response.json();

        document.getElementById("nama").value = product.nama;
        document.getElementById("brand").value = product.brand;
        document.getElementById("jenis").value = product.jenis;
        document.getElementById("kandungan").value = product.kandungan;
        document.getElementById("harga").value = product.harga;
        // document.getElementById("gambar").value = product.gambar;
        document.getElementById("deskripsi").value = product.deskripsi;
        document.getElementById("caraPakai").value = product.cara_pakai;
        document.getElementById("kulit").value = product.kategori_kulit;

        editingId = id;
        document.getElementById("formTitle").textContent = "Edit Produk";
        document.getElementById("formProduk").classList.remove("hidden");
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal memuat data produk");
    }
}

async function hapusProduk(id) {
    if (confirm("Yakin ingin menghapus produk ini?")) {
        try {
            const response = await fetch(`/care/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
            });

            if (!response.ok) throw new Error("Gagal menghapus produk");

            renderTable();
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menghapus produk");
        }
    }
}

function batalEdit() {
    clearForm();
    editingId = null;
    document.getElementById("formProduk").classList.add("hidden");
}

function clearForm() {
    document.getElementById("nama").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("jenis").value = "";
    document.getElementById("kandungan").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("gambar").value = "";
    document.getElementById("deskripsi").value = "";
    document.getElementById("caraPakai").value = "";
    document.getElementById("kulit").value = "";
}

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
});
