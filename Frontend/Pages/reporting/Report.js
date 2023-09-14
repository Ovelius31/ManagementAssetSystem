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
        <th class="p-3 border bg-gray-100">Price</th>
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
            <td class="p-3 border text-center items-center">${item.dateOfPurchase}</td>
            <td class="p-3 border text-center items-center">${item.price}</td>
            <td class="p-3 border text-center items-center">${item.adjustmentDate}</td>
            <td class="p-3 border text-center items-center">${item.location}</td>
            <td class="p-3 border text-center items-center">${item.condition}</td>
            <td class="p-3 border text-center items-center">${item.photo}</td>
            <td class="p-3 border text-center items-center">${item.amount}</td>
        `;
        dataTable.appendChild(row);
    });
}

// Fungsi untuk mencari laporan berdasarkan tanggal
function searchByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filteredData = laporanData.filter(data => {
        return data.tanggal >= startDate && data.tanggal <= endDate;
    });

    displaySearchResults(filteredData);
}
// Fungsi untuk melakukan filter data berdasarkan kriteria tertentu
function filterData() {
    const categoryFilter = document.querySelector('#categoryFilter').value;
    const locationFilter = document.querySelector('#locationFilter').value;
    const conditionFilter = document.querySelector('#conditionFilter').value;
    const purchaseDateFilter = document.querySelector('#purchaseDateFilter').value;
    const adjustmentDateFilter = document.querySelector('#adjustmentDateFilter').value;

    // Lakukan filter pada data laporanData berdasarkan kriteria yang dipilih
    const filteredData = laporanData.filter(data => {
        return (
            (categoryFilter === '' || data.Category.toLowerCase() === categoryFilter.toLowerCase()) &&
            (locationFilter === '' || data.Location.toLowerCase() === locationFilter.toLowerCase()) &&
            (conditionFilter === '' || data.Condition.toLowerCase() === conditionFilter.toLowerCase()) &&
            (purchaseDateFilter === '' || data.DateofPurchase === purchaseDateFilter) &&
            (adjustmentDateFilter === '' || data.AdjustmentDate === adjustmentDateFilter)
        );
    });

    // Tampilkan hasil filter pada tabel
    displaySearchResults(filteredData);
}

// Event listener untuk tombol "Apply Filter"
const applyFilterButton = document.getElementById('applyFilterButton');
applyFilterButton.addEventListener('click', filterData);

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

//fungsi animasi link navbar
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
