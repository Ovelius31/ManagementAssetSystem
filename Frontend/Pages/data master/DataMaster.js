$(document).ready(function () {
  var table = $('#example').DataTable({
    responsive: true
  }).columns.adjust().responsive.recalc();
});

document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk menangani tampilan/penyembunyian dropdown
  function toggleDropdown() {
    const dropdown = document.getElementById("apple-imac-20-dropdown");
    dropdown.classList.toggle("hidden");
  }

  const dropdownButton = document.getElementById("apple-imac-20-dropdown-button");
  dropdownButton.addEventListener("click", toggleDropdown);
});

document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk menangani tampilan/penyembunyian modal
  function toggleModal(targetId) {
    const modal = document.getElementById(targetId);
    modal.classList.toggle("hidden");
  }

  const modalToggleButtons = document.querySelectorAll("[data-modal-toggle]");
  const modalHideButtons = document.querySelectorAll("[data-modal-hide]");

  modalToggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-modal-target");
      toggleModal(target);
    });
  });

  modalHideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-modal-hide");
      toggleModal(target);
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
  toggleModal("modalContainer"); 
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
  document.getElementById('popup').style.display = 'none';
  closeModal(); 
}
function logout() {
  window.location.href = "/IT%20Management%20Asset/Frontend/LoginScreen/src/Login.html"; 
}

// Menangkap elemen tombol "Apply Filter"
const applyFilterButton = document.getElementById('applyFilterButton');

// Tambahkan event listener untuk tombol "Apply Filter"
applyFilterButton.addEventListener('click', function () {
  // Mendapatkan nilai filter dari elemen-elemen select atau input filter
  const categoryFilter = document.querySelector('#categoryFilter').value;
  const locationFilter = document.querySelector('#locationFilter').value;
  const conditionFilter = document.querySelector('#conditionFilter').value;
  const purchaseDateFilter = document.querySelector('#purchaseDateFilter').value;
  const adjustmentDateFilter = document.querySelector('#adjustmentDateFilter').value;

  // Lakukan filter pada data dengan mengirim filter ke server
  fetch(`/IT%20Management%20Asset/Backend/src/asset/filter.php?categoryFilter=${categoryFilter}&locationFilter=${locationFilter}&conditionFilter=${conditionFilter}&dateOfPurchaseFilter=${purchaseDateFilter}&adjustmentDateFilter=${adjustmentDateFilter}`)
    .then(response => response.json())
    .then(data => {
      // Memanggil fungsi untuk menampilkan data yang sudah difilter dalam tabel
      displayData(data);
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
});


// Fungsi untuk mengambil dan menampilkan data
function fetchData() {
  fetch('/IT%20Management%20Asset/Backend/src/asset/read.php')
    .then(response => response.json())
    .then(data => {

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
      <td class="p-3 border text-center items-center">${item["Code Item"]}</td>
      <td class="p-3 border text-center items-center">${item["Item Name"]}</td>
      <td class="p-3 border text-center items-center">${item["Category"]}</td>
      <td class="p-3 border text-center items-center">${item["Date of Purchase"]}</td>
      <td class="p-3 border text-center items-center">${item["Price"]}</td>
      <td class="p-3 border text-center items-center">${item["Adjustment Date"]}</td>
      <td class="p-3 border text-center items-center">${item["Location"]}</td>
      <td class="p-3 border text-center items-center">${item["Condition"]}</td>
      <td class="p-3 border text-center items-center">${item["Photo"]}</td>
      <td class="p-3 border text-center items-center">${item["Amount"]}</td>
      <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onclick="openPopup2" style="cursor: pointer;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </td>      
    `;
    tableBody.appendChild(row);
  });
}

// Panggil fetchData() saat halaman dimuat
fetchData();

// Fungsi untuk menghapus data
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
    fetch(`/IT%20Management%20Asset/Backend/src/asset/delete.php?id=${id}`, {
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


// Menambahkan event listener untuk membuka popup
document.addEventListener('DOMContentLoaded', function () {
  const openModalButton = document.getElementById('openModalButton');
  const cancelButton = document.getElementById('cancelButton');

  openModalButton.addEventListener('click', openPopup);
  cancelButton.addEventListener('click', closePopup);

  const modal = document.getElementById("popup");
  const span = modal.querySelector(".close");

  span.onclick = closePopup;

  window.onclick = function (event) {
    if (event.target === backdrop) {
      closePopup();
    }
  };
});





// Fungsi untuk menangani pengiriman data tambahan
document.getElementById("addDataForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;

  const codeItem = generateCodeItem(form);
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
    const response = await fetch("/IT%20Management%20Asset/Backend/src/asset/input.php", {
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

// Fungsi untuk menghasilkan kode item
function generateCodeItem(form) {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().substr(2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const locationAbbreviation = form.elements.location.value.slice(-2);
  const categoryAbbreviation = form.elements.category.value.slice(0, 2);
  const idString = "0001";
  return `${year}${month}${day}${locationAbbreviation}${categoryAbbreviation}${idString}`;
}
