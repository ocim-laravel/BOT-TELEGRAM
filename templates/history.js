// Path Gambar
let imagePath = "B:/BASH-DATA/AUTOMATION/source_code/app-python/target-print/static/uploads/bleckbox.jpg";

// Data Histori Cetakan (Contoh: 30 Data)
let historyData = [];
for (let i = 1; i <= 600; i++) {
    historyData.push({
        name: `Nama Item ${i}`,
        image: imagePath,
        status: i % 2 === 0 ? "Belum Selesai" : "Selesai", // Setengah "Selesai", setengah "Belum Selesai"
        target: Math.floor(Math.random() * 200) + 50,
        time: "13:00:01",
        date: "13 Januari 2025"
    });
}
let currentPage = 1;
const itemsPerPage = 20;

// Fungsi untuk Menampilkan Data Histori
function loadHistory() {
    let container = document.getElementById("history-container");
    let searchInput = document.getElementById("search-input").value.toLowerCase();
    let filterStatus = document.getElementById("filter-status").value;

    container.innerHTML = "";

    // Filter data berdasarkan status & pencarian nama
    let filteredData = historyData.filter(item => 
        (filterStatus === "all" || item.status === filterStatus) &&
        item.name.toLowerCase().includes(searchInput)
    );

    // Pagination
    let totalPages = Math.ceil(filteredData.length / itemsPerPage);
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let paginatedData = filteredData.slice(startIndex, endIndex);

    // Generate kartu untuk item yang memenuhi kriteria
    paginatedData.forEach(item => {
        let statusClass = item.status === "Selesai" ? "status-green" : "status-red";

        let card = `
            <div class="col">
                <div class="card-history">
                    <img src="${item.image}" alt="Preview Image">
                    <h5 class="fw-bold">${item.name}</h5>
                    <div class="status ${statusClass}">${item.status}</div>
                    <div class="mt-2">
                        <strong>Target:</strong> <span class="fw-bold fs-3">${item.target}</span> Pcs
                    </div>
                    <div class="time"><strong>${item.time}</strong></div>
                    <div class="date">${item.date}</div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });

    updatePagination(totalPages);
}

// Fungsi untuk update pagination
function updatePagination(totalPages) {
    document.getElementById("page-info").textContent = `Halaman ${currentPage} dari ${totalPages}`;
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}

// Fungsi untuk navigasi halaman
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadHistory();
    }
}

function nextPage() {
    currentPage++;
    loadHistory();
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadHistory);
