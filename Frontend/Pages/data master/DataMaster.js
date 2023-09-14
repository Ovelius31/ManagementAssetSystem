$(document).ready(function () {
  var table = $('#example').DataTable({
    responsive: true
  }).columns.adjust().responsive.recalc();
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("apple-imac-20-dropdown-button");
  const dropdown = document.getElementById("apple-imac-20-dropdown");

  dropdownButton.addEventListener("click", function () {
    dropdown.classList.toggle("hidden");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modalToggleButtons = document.querySelectorAll("[data-modal-toggle]");
  const modalHideButtons = document.querySelectorAll("[data-modal-hide]");
  const modals = document.querySelectorAll("[data-modal-target]");

  modalToggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-modal-target");
      const modal = document.querySelector(`#${target}`);
      modal.classList.toggle("hidden");
    });
  });

  modalHideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-modal-hide");
      const modal = document.querySelector(`#${target}`);
      modal.classList.add("hidden");
    });
  });
});
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
  window.location.href = "/Frontend/LoginScreen/src/Login.html";
}

//buka popup
document.addEventListener('DOMContentLoaded', function () {
  const backdrop = document.getElementById('backdrop');
  const popup = document.getElementById('popup');
  const openModalButton = document.getElementById('openModalButton');
  const cancelButton = document.getElementById('cancelButton');

  openModalButton.addEventListener('click', function () {
    backdrop.style.display = 'block';
    popup.style.display = 'block';
  });

  cancelButton.addEventListener('click', function () {
    backdrop.style.display = 'none';
    popup.style.display = 'none';
  });

  const modal = document.getElementById("popup");

  const span = modal.querySelector(".close");
  span.onclick = function () {
    popup.style.display = 'none';
    backdrop.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === backdrop) {
      popup.style.display = 'none';
      backdrop.style.display = 'none';
    }
  };
});

const logoLink = document.querySelector('.text-blue-400');
const backdrop = document.getElementById('backdrop2');
const popup = document.getElementById('popup2');

logoLink.addEventListener('click', function (event) {
  event.preventDefault();
  backdrop.style.display = 'block';
  popup.style.display = 'block';
});


//addData
const form = document.getElementById("addDataForm");

document.getElementById("addDataForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;

  const codeItem = generateCodeItem();
  const itemName = form.elements.itemName.value;
  const category = form.elements.category.value;
  const location = form.elements.location.value;
  const condition = form.elements.condition.value;
  const purchaseDate = form.elements.purchaseDate.value;
  const price = form.elements.price.value;
  const adjustmentDate = form.elements.adjustmentDate.value;
  const photoLink = form.elements.photoLink.value;
  const amount = 1;

  const data = {
    codeItem,
    itemName,
    category,
    location,
    condition,
    purchaseDate,
    price,
    adjustmentDate,
    photoLink,
    amount
  };

  data.action = 'saveData';

  try {
    const response = await fetch("/Backend/src/asset/input.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Data saved successfully:", responseData);
    } else {
      console.error("Failed to save data.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
//generate code item
function generateCodeItem() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().substr(2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const locationAbbreviation = form.elements.location.value.slice(-2);
  const categoryAbbreviation = form.elements.category.value.slice(0, 2);
  const idString = "0001";
  return `${year}${month}${day}${locationAbbreviation}${categoryAbbreviation}${idString}`;
}


function fetchData() {
  fetch('/Backend/src/asset/read.php')
    .then(response => response.json())
    .then(data => {
      // Setelah data diterima, panggil fungsi untuk menampilkan data dalam tabel
      displayData(data);
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Fungsi untuk menampilkan data dalam tabel
function displayData(data) {
  const tableBody = document.querySelector('#data-table tbody');

  // Bersihkan isi tabel
  tableBody.innerHTML = '';

  // Loop melalui data dan tambahkan baris-baris ke dalam tabel
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-3 border text-center items-center">${item.code}</td>
      <td class="p-3 border text-center items-center">${item.name}</td>
      <td class="p-3 border text-center items-center">${item.category}</td>
      <td class="p-3 border text-center items-center">${item.dateOfPurchase}</td>
      <td class="p-3 border text-center items-center">${item.price}</td>
      <td class="p-3 border text-center items-center">${item.adjustmentDate}</td>
      <td class="p-3 border text-center items-center">${item.location}</td>
      <td class="p-3 border text-center items-center">${item.condition}</td>
      <td class="p-3 border text-center items-center">${item.photo}</td>
      <td class="p-3 border text-center items-center">${item.amount}</td>
      <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none" viewbox="0 0 24 24" stroke="currentColor" style="cursor: pointer;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </td>      
    `;
    tableBody.appendChild(row);
  });
}

// Panggil fungsi fetchData() untuk mengambil data saat halaman dimuat
fetchData();


// Fungsi untuk membuka popup edit data
function editData(button) {
  // Temukan baris tabel dengan ID atau atribut data yang sesuai
  const row = button.closest('tr');

  // Ambil nilai-nilai data dari baris tersebut
  const code = row.cells[0].textContent;
  const itemName = row.cells[1].textContent;
  const category = row.cells[2].textContent;
  const dateOfPurchase = row.cells[3].textContent;
  const price = row.cells[4].textContent;
  const adjustmentDate = row.cells[5].textContent;
  const location = row.cells[6].textContent;
  const condition = row.cells[7].textContent;
  const photo = row.cells[8].textContent;
  const amount = row.cells[9].textContent;

  // Isi nilai-nilai dalam modal edit
  document.getElementById('codeUpdate').value = code;
  document.getElementById('nameUpdate').value = itemName;
  document.getElementById('categoryUpdate').value = category;
  document.getElementById('dateOfPurchaseUpdate').value = dateOfPurchase;
  document.getElementById('priceUpdate').value = price;
  document.getElementById('adjustmentDateUpdate').value = adjustmentDate;
  document.getElementById('locationUpdate').value = location;
  document.getElementById('conditionUpdate').value = condition;
  document.getElementById('photoLinkUpdate').value = photo;
  document.getElementById('amountUpdate').value = amount;

  // Tampilkan modal edit
  openEditModal(); // Anda perlu mengganti ini sesuai dengan nama fungsi yang digunakan untuk menampilkan modal edit
}

// Temukan tombol "Apply Data"
const applyFilterButton = document.getElementById('applyFilterButton');

// Tambahkan event listener untuk tombol "Apply Data"
applyFilterButton.addEventListener('click', function () {
  // Mendapatkan nilai filter dari elemen-elemen select
  const categoryFilter = document.querySelector('#categoryFilter').value;
  const locationFilter = document.querySelector('#locationFilter').value;
  const conditionFilter = document.querySelector('#conditionFilter').value;
  const purchaseDateFilter = document.querySelector('#purchaseDateFilter').value;
  const adjustmentDateFilter = document.querySelector('#adjustmentDateFilter').value;

  // Melakukan filter pada data sesuai dengan nilai yang dipilih
  const filteredData = yourDataArray.filter(item => {
    // Anda dapat menyesuaikan ini sesuai dengan struktur data Anda
    return (
      (categoryFilter === '' || item.category === categoryFilter) &&
      (locationFilter === '' || item.location === locationFilter) &&
      (conditionFilter === '' || item.condition === conditionFilter) &&
      (purchaseDateFilter === '' || item.dateOfPurchase === purchaseDateFilter) &&
      (adjustmentDateFilter === '' || item.adjustmentDate === adjustmentDateFilter)
    );
  });

  // Menampilkan data yang sudah difilter di tabel
  displayData(filteredData);
});

function deleteData(id) {
  // Konfirmasi penghapusan
  const confirmation = confirm("Apakah Anda yakin ingin menghapus data ini?");

  if (confirmation) {
    // Menghapus baris dari tampilan tabel pada sisi client
    const rowToDelete = document.querySelector(`[data-id="${id}"]`).closest("tr");
    if (rowToDelete) {
      rowToDelete.remove();
    }

    // Mengirim permintaan ke server untuk menghapus data berdasarkan ID
    fetch(`/Backend/src/asset/delete.php?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Data berhasil dihapus dari database.");
        } else {
          console.error("Gagal menghapus data dari database.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }
}

