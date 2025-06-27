import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Cek login saat halaman dibuka
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Anda harus login terlebih dahulu untuk mengakses halaman ini.");
        window.location.href = "/login";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.getElementById("buttonContainer");
    const judulPerkembangan = document.getElementById("judulPerkembangan");
    const ilustrasi = document.querySelector(".ilustrasi");
    const weekInput = document.getElementById("weekInput");
    const pilihButton = document.getElementById("pilihButton");

    // Elemen untuk menampilkan data
    const mingguKalender = document.getElementById("mingguKalender");
    const janinImage = document.getElementById("janinImage");
    const ukuranJanin = document.getElementById("ukuranJanin");
    const panjangJanin = document.getElementById("panjangJanin");
    const detakJantung = document.getElementById("detakJantung");
    const deskripsiContent = document.getElementById("deskripsiContent");

    // Variabel untuk menyimpan data dari database
    let janinData = [];

    // Fungsi untuk mengambil data dari API
    async function fetchJaninData() {
        try {
            const response = await fetch("/api/perkembangan");
            if (!response.ok) {
                throw new Error("Gagal mengambil data");
            }
            janinData = await response.json();
            initializeButtons();
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal memuat data perkembangan janin");
        }
    }

    // Fungsi untuk inisialisasi tombol minggu
    function initializeButtons() {
        buttonContainer.innerHTML = "";

        // Buat tombol untuk setiap minggu yang ada di database
        janinData.forEach((item) => {
            const week = item.minggu;
            let link = document.createElement("a");
            link.href = "#";
            link.className = "week";
            link.setAttribute("data-week", week);
            link.innerHTML = `<h3>${week} Minggu</h3>`;

            link.addEventListener("click", function (event) {
                event.preventDefault();
                updateContent(week);
            });

            buttonContainer.appendChild(link);
        });

        // Set default ke minggu pertama jika ada data
        if (janinData.length > 0) {
            updateContent(janinData[0].minggu);
        }
    }

    // Fungsi untuk memperbarui tampilan berdasarkan minggu
    function updateContent(week) {
        const data = janinData.find((item) => Number(item.minggu) == week);

        if (data) {
            // Update semua elemen tampilan
            judulPerkembangan.textContent = `Perkembangan Janin Minggu ke-${week}`;
            mingguKalender.textContent = `Minggu ${week}`;
            janinImage.src = data.gambar
                ? `/storage/${data.gambar}`
                : "/img/default.jpg";
            if (ilustrasi) {
                ilustrasi.src = data.gambar
                    ? `/storage/${data.gambar}`
                    : "/img/default.jpg";
            }
            ukuranJanin.textContent = data.berat;
            panjangJanin.textContent = data.panjang;
            detakJantung.textContent = data.detak;
            deskripsiContent.textContent = data.deskripsi;

            updateActiveButton(week);
            scrollToButton(week);
        } else {
            alert("Data untuk minggu ini belum tersedia!");
        }
    }

    // Fungsi untuk mengubah warna tombol yang dipilih
    function updateActiveButton(selectedWeek) {
        const buttons = document.querySelectorAll(".week");
        buttons.forEach((button) => button.classList.remove("active"));

        const activeButton = document.querySelector(
            `.week[data-week='${selectedWeek}']`
        );
        if (activeButton) {
            activeButton.classList.add("active");
        }
    }

    // Fungsi untuk menggeser tombol yang dipilih ke tengah
    function scrollToButton(selectedWeek) {
        const activeButton = document.querySelector(
            `.week[data-week='${selectedWeek}']`
        );
        if (activeButton) {
            const container = document.getElementById("buttonContainer");
            const buttonWidth = activeButton.offsetWidth;
            const containerWidth = container.offsetWidth;
            const scrollLeft =
                activeButton.offsetLeft - containerWidth / 2 + buttonWidth / 2;

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    }

    // Event untuk tombol "Pilih"
    pilihButton.addEventListener("click", function () {
        const week = parseInt(weekInput.value);
        if (week >= 1 && week <= 40) {
            updateContent(week);
        } else {
            alert("Masukkan angka antara 1 hingga 40!");
        }
    });

    // Memulai dengan mengambil data dari database
    fetchJaninData();
});
