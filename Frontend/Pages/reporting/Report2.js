// Fungsi untuk mencetak tabel
function printTable() {
    // Menyembunyikan elemen-elemen yang tidak perlu saat mencetak
    const elementsToHide = document.querySelectorAll('#sidebar, #navbar, #filter, #pageButton');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });

    // Menampilkan elemen yang perlu dicetak
    const reportDateElement = document.getElementById('report-date');
    const resultTable = document.getElementById('resultTable');
    reportDateElement.style.display = 'block';
    resultTable.style.display = 'block';

    // Cetak tabel
    window.print();

    // Mengembalikan tampilan elemen-elemen yang disembunyikan setelah pencetakan selesai
    elementsToHide.forEach(element => {
        element.style.display = '';
    });

    // Mengembalikan tampilan elemen yang dicetak ke kondisi semula
    reportDateElement.style.display = '';
    resultTable.style.display = '';
}

const printButton = document.getElementById('printButton');
printButton.addEventListener('click', printTable);






