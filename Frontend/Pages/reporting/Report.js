// Fungsi untuk mencari laporan berdasarkan tanggal
function searchByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filteredData = laporanData.filter(data => {
        return data.tanggal >= startDate && data.tanggal <= endDate;
    });

    displaySearchResults(filteredData);
}

// Fungsi untuk menampilkan hasil pencarian di tabel
function displaySearchResults(data) {
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = `
            <tr>
                <th class="p-3 border bg-gray-100">Code Item</th>
                <th class="p-3 border bg-gray-100">Item Name</th>
                <th class="p-3 border bg-gray-100">Category</th>
                <th class="p-3 border bg-gray-100">Date of Purchase &amp; Price</th>
                <th class="p-3 border bg-gray-100">Adjustment Date</th>
                <th class="p-3 border bg-gray-100">Location</th>
                <th class="p-3 border bg-gray-100">Condition</th>
                <th class="p-3 border bg-gray-100">Photo</th>
                <th class="p-3 border bg-gray-100">Amount</th>
            </tr>
        ${data.map(data => `
            <tr>
                <td>${data.CodeItem}</td>
                <td>${data.ItemName}</td>
                <td>${data.Category}</td>
                <td>${data.DateofPurchase}</td>
                <td>${data.AdjustmentDate}</td>
                <td>${data.Location}</td>
                <td>${data.Condition}</td>
                <td>${data.Photo}</td>
                <td>${data.Amount}</td>
            </tr>
        `).join('')}
    `;
}
function printTable() {
    // Menyembunyikan elemen gambar sebelum mencetak
    const images = document.querySelectorAll('#resultTable img');
    images.forEach(image => {
        image.style.display = 'none';
    });

    // Mendapatkan nama-nama kolom
    const columnNames = [];
    const columnHeaders = document.querySelectorAll('#resultTable th');
    columnHeaders.forEach(header => {
        columnNames.push(header.textContent);
    });

    // Membuat baris untuk nama-nama kolom
    const headerRow = document.createElement('tr');
    columnNames.forEach(name => {
        const th = document.createElement('th');
        th.textContent = name;
        th.classList.add('p-3', 'border', 'bg-gray-100');
        headerRow.appendChild(th);
    });

    // Menyisipkan baris nama kolom di awal tabel
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.insertBefore(headerRow, tableBody.firstChild);

    // Cetak tabel dan kembalikan isi gambar setelah selesai mencetak
    window.print();

    // Mengembalikan tampilan gambar setelah pencetakan selesai
    images.forEach(image => {
        image.style.display = 'block';
    });

    // Menghapus baris nama kolom setelah pencetakan selesai
    tableBody.removeChild(headerRow);
}


// Menangkap elemen tombol reset filter
const resetFilterButton = document.querySelector('.bg-green-500');

// Menangkap elemen-elemen input filter yang perlu direset
const filterInputs = document.querySelectorAll('.bg-gray-100');
const dateInputs = document.querySelectorAll('input[type="date"]');

// Menambahkan event listener untuk tombol reset filter
resetFilterButton.addEventListener('click', function () {
    // Mereset nilai input filter ke defaultnya
    filterInputs.forEach(input => {
        input.value = '';
    });

    // Mereset nilai input tanggal ke defaultnya
    dateInputs.forEach(input => {
        input.value = '';
    });
});


// Menangkap elemen input pencarian
const searchInput = document.querySelector('input[type="text"]');

// Menangkap elemen tabel
const dataTable = document.getElementById('data-table');

// Fungsi untuk menampilkan data dalam tabel
function displayData(dataArray) {
    // Mengosongkan tabel
    dataTable.innerHTML = '';


    // Membuat baris nama kolom
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th class="p-3 border bg-gray-100">Code Item</th>
        <th class="p-3 border bg-gray-100">Item Name</th>
        <th class="p-3 border bg-gray-100">Category</th>
        <th class="p-3 border bg-gray-100">Date of Purchase</th>
        <th class="p-3 border bg-gray-100">Adjustment Date</th>
        <th class="p-3 border bg-gray-100">Location</th>
        <th class="p-3 border bg-gray-100">Condition</th>
        <th class="p-3 border bg-gray-100">Photo</th>
        <th class="p-3 border bg-gray-100">Amount</th>
    `;
    dataTable.appendChild(headerRow);

    // Menambahkan data ke tabel
    dataArray.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-3 border text-center items-center">${item.code}</td>
            <td class="p-3 border text-center items-center">${item.itemName}</td>
            <td class="p-3 border text-center items-center">${item.category}</td>
            <td class="p-3 border text-center items-center">${item.DateofPurchase}</td>
            <td class="p-3 border text-center items-center">${item.AdjustmentDate}</td>
            <td class="p-3 border text-center items-center">${item.Location}</td>
            <td class="p-3 border text-center items-center">${item.Condition}</td>
            <td class="p-3 border text-center items-center">${item.Photo}</td>
            <td class="p-3 border text-center items-center">${item.Amount}</td>
        `;
        dataTable.appendChild(row);
    });
}   

// Event listener untuk input pencarian
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(item =>
        item.code.toLowerCase().includes(searchTerm) ||
        item.itemName.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
        // ... tambahkan kolom lain jika diperlukan ...
    );
    displayData(filteredData);
});

// Menampilkan data awal saat halaman dimuat
displayData(data);


// Function to format the date as "day month year" (e.g., "13 Agustus 2021")
function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

// Get the current date
const currentDate = new Date();

// Get the element to display the formatted date
const reportDateElement = document.getElementById('report-date');

// Set the innerHTML of the element to the formatted date
reportDateElement.innerHTML = reportDateElement.innerHTML.replace('{Tanggal Penarikan}', formatDate(currentDate));

function printTable() {
    var printContents = document.querySelector(".table-wrapper").outerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
}

function openModal() {
    document.getElementById('backdrop').classList.add('opacity-100');
    document.getElementById('modalContainer').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('backdrop').classList.remove('opacity-100');
    document.getElementById('modalContainer').classList.add('hidden');
}
function closePopup() {
    closeModal(); 
}
function logout() {
    window.location.href = "/IT%20Management%20Asset/Frontend/LoginScreen/src/Login.html"; 
}
//fungsi animasi link navbar
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});