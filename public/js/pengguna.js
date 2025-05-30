// Simulasi data awal pengguna
let users = [
    { id: 1, name: "Lia Hapsari", email: "lia@example.com", role: 1 },
    { id: 2, name: "Dina Nuraini", email: "dina@example.com", role: 0 }
  ];
  
  let isEditing = false;
  let editingUserId = null;
  
  const userTable = document.getElementById("userTable");
  const userForm = document.getElementById("userForm");
  const btnTambah = document.getElementById("btnTambah");
  
  const inputId = document.getElementById("userId");
  const inputName = document.getElementById("userName");
  const inputEmail = document.getElementById("userEmail");
  const inputRole = document.getElementById("userRole");
  
  // Tampilkan daftar pengguna di tabel
  function renderUsers() {
    userTable.innerHTML = "";
    users.forEach(user => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role === 1 ? "Admin" : "User"}</td>
        <td>
          <button class="edit" onclick="editUser(${user.id})">Edit</button>
          <button class="delete" onclick="deleteUser(${user.id})">Hapus</button>
        </td>
      `;
  
      userTable.appendChild(row);
    });
  }
  
  // Reset & tampilkan form untuk tambah
  btnTambah.addEventListener("click", () => {
    userForm.classList.add("active");
    isEditing = false;
    inputId.value = "";
    inputName.value = "";
    inputEmail.value = "";
    inputRole.value = "";
  });
  
  // Simpan atau perbarui pengguna
  function saveUser() {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const role = parseInt(inputRole.value);
    userForm.classList.remove("active");
    if (!name || !email || isNaN(role)) {
      alert("Mohon isi semua kolom.");
      return;
    }
  
    if (isEditing) {
      // Update data
      const index = users.findIndex(u => u.id === editingUserId);
      users[index] = { id: editingUserId, name, email, role };
      isEditing = false;
    } else {
      // Tambah data baru
      const newId = users.length ? users[users.length - 1].id + 1 : 1;
      users.push({ id: newId, name, email, role });
    }
  
    userForm.classList.remove("active");
    renderUsers();
  }
  
  // Edit pengguna
  function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
  
    isEditing = true;
    editingUserId = id;
  
    inputId.value = user.id;
    inputName.value = user.name;
    inputEmail.value = user.email;
    inputRole.value = user.role;
  
    userForm.classList.add("active");
  }
  
  // Hapus pengguna
  function deleteUser(id) {
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
      users = users.filter(user => user.id !== id);
      renderUsers();
    }
  }

  function cancelForm() {
    userForm.classList.remove("active");
    isEditing = false;
    editingUserId = null;
  
    inputId.value = "";
    inputName.value = "";
    inputEmail.value = "";
    inputRole.value = "";
  }

  const sidebar = document.getElementById("sidebar");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const content = document.getElementById("content");
  
  toggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      content.classList.toggle("full-width");
  });
  
  // Inisialisasi awal
  renderUsers();
  