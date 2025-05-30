let artikelList = [
    
];
let editingIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});

function toggleForm() {
  const form = document.getElementById('formArtikel');
  const formTitle = document.getElementById('formTitle');
  
  if (form.style.display === 'none') {
    form.style.display = 'block';
    formTitle.innerHTML = 'Tambah Artikel';
  } else {
    form.style.display = 'none';
  }
}

function simpanArtikel() {
  const artikel = {
    title: document.getElementById('judul').value,
    content: document.getElementById('konten').value,
    author: document.getElementById('penulis').value,
    date: document.getElementById('tanggal').value,
    status: document.getElementById('status').value,
    likes: 0,  // Default likes
    comments: 0,  // Default comments
  };

  if (editingIndex === -1) {
    artikelList.push(artikel);
  } else {
    artikelList[editingIndex] = artikel;
    editingIndex = -1;
  }

  document.getElementById('formArtikel').style.display = 'none';
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector('#artikelList');
  tbody.innerHTML = '';

  artikelList.forEach((artikel, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${artikel.title}</td>
      <td>${artikel.author}</td>
      <td>${artikel.date}</td>
      <td>${artikel.status}</td>
      <td class="action-buttons">
        <button class="edit" onclick="editArtikel(${index})">Edit</button>
        <button class="delete" onclick="deleteArtikel(${index})">Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editArtikel(index) {
  const artikel = artikelList[index];
  document.getElementById('judul').value = artikel.title;
  document.getElementById('konten').value = artikel.content;
  document.getElementById('penulis').value = artikel.author;
  document.getElementById('tanggal').value = artikel.date;
  document.getElementById('status').value = artikel.status;

  editingIndex = index;
  document.getElementById('formArtikel').style.display = 'block';
}

function deleteArtikel(index) {
  if (confirm('Yakin ingin menghapus artikel ini?')) {
    artikelList.splice(index, 1);
    renderTable();
  }
}

function batalArtikel() {
    // Bersihkan formulir
    document.getElementById('judul').value = '';
    document.getElementById('konten').value = '';
    document.getElementById('penulis').value = '';
    document.getElementById('tanggal').value = '';
    document.getElementById('status').value = '';
  
    // Reset indeks pengeditan
    editingIndex = -1;
  
    // Sembunyikan formulir
    document.getElementById('formArtikel').style.display = 'none';
  }

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const content = document.getElementById("content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("full-width");
});
