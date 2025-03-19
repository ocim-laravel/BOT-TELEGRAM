// Data awal item dengan gambar
let items = [
    { name: "Nama Item 1", target: 100, printed: 0, image: "static/uploads/bleckbox1.jpg" },
    { name: "Nama Item 2", target: 80, printed: 0, image: "static/uploads/bleckbox2.jpg" },
    { name: "Nama Item 3", target: 120, printed: 0, image: "static/uploads/bleckbox3.jpg" },
    { name: "Nama Item 4", target: 90, printed: 0, image: "static/uploads/bleckbox4.jpg" },
    { name: "Nama Item 5", target: 110, printed: 0, image: "static/uploads/bleckbox5.jpg" }
];

let currentIndex = 0;

// Fungsi untuk memperbarui tampilan item
function updateDisplay() {
    let item = items[currentIndex];

    // Ambil elemen HTML
    let itemName = document.getElementById("item-name");
    let targetCount = document.getElementById("target-count");
    let printCount = document.getElementById("print-count");
    let remainingCount = document.getElementById("remaining-count");
    let inputCount = document.getElementById("input-count");
    let statusText = document.getElementById("status-text");
    let btnPlus = document.getElementById("btn-plus");
    let btnMinus = document.getElementById("btn-minus");
    let previewImage = document.getElementById("preview-image");

    // Update tampilan item
    itemName.innerText = item.name;
    targetCount.innerText = item.target;
    printCount.innerText = item.printed;
    previewImage.src = item.image;

    // Cek apakah kelebihan atau kekurangan cetakan
    let selisih = item.target - item.printed;
    if (selisih > 0) {
        remainingCount.innerText = `Kekurangan: ${selisih} pcs`;
        remainingCount.classList.remove("text-danger");
        remainingCount.classList.add("text-dark");
    } else {
        remainingCount.innerText = `Kelebihan: ${Math.abs(selisih)} pcs`;
        remainingCount.classList.remove("text-dark");
        remainingCount.classList.add("text-danger");
    }

    // Update status & tombol tambah/kurang
    if (item.printed >= item.target) {
        statusText.innerText = "Selesai";
        statusText.classList.remove("bg-warning");
        statusText.classList.add("bg-success");
        btnPlus.disabled = true;
    } else {
        statusText.innerText = "Belum Selesai";
        statusText.classList.remove("bg-success");
        statusText.classList.add("bg-warning");
        btnPlus.disabled = false;
    }

    // Matikan tombol minus jika printed = 0
    btnMinus.disabled = item.printed === 0;
}

// Fungsi untuk menambah/mengurangi jumlah cetakan berdasarkan input
function updateCount(isAdding) {
    let item = items[currentIndex];
    let inputField = document.getElementById("input-count");

    // Ambil nilai input (default = 1 jika kosong atau tidak valid)
    let inputValue = parseInt(inputField.value, 10);
    if (isNaN(inputValue) || inputValue <= 0) {
        inputValue = 1;
    }

    if (isAdding) {
        item.printed = Math.min(item.target, item.printed + inputValue);
    } else {
        item.printed = Math.max(0, item.printed - inputValue);
    }

    // Kosongkan input setelah update
    inputField.value = "";
    updateDisplay();
}

// Fungsi untuk berpindah ke item berikutnya
function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    updateDisplay();
}

// Fungsi untuk berpindah ke item sebelumnya
function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateDisplay();
}

// Tunggu hingga DOM selesai dimuat sebelum menjalankan kode
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-plus").addEventListener("click", () => updateCount(true));
    document.getElementById("btn-minus").addEventListener("click", () => updateCount(false));
    document.getElementById("btn-next").addEventListener("click", nextItem);
    document.getElementById("btn-prev").addEventListener("click", prevItem);

    // Update tampilan awal
    updateDisplay();
});
