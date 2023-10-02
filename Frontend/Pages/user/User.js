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

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').
    forEach(link => {
        if(link.href.includes(`${activePage}`)){
            link.classList.add('active');
        }
    })


  function showEditPopup(button) {
    // Dapatkan baris yang sesuai dengan tombol edit yang diklik
    const row = button.closest('tr');

    // Dapatkan data yang ingin diisi ke dalam popup sesuai dengan kolom tabel
    const username = row.cells[0].textContent;
    const division = row.cells[1].textContent;
    const role = row.cells[2].textContent;
    const password = row.cells[3].textContent;

    // Isi nilai-nilai ke dalam elemen-elemen dalam popup
    document.getElementById('usernameInput').value = username;
    document.getElementById('divisionInput').value = division;
    document.getElementById('roleInput').value = role;
    document.getElementById('passwordInput').value = password;

    // Tampilkan popup
    document.getElementById('popup').style.display = 'block';
  }

  // Tangani submit form
  document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Dapatkan nilai-nilai dari form
    const username = document.getElementById('usernameInput').value;
    const division = document.getElementById('divisionInput').value;
    const role = document.getElementById('roleInput').value;
    const password = document.getElementById('passwordInput').value;

    // Lakukan apa yang Anda inginkan dengan nilai-nilai tersebut, seperti mengirimnya ke server atau menyimpannya di tempat lain.

    // Setelah selesai, tutup popup
    closePopup();
  });

  // Fungsi untuk membuka popup tambah pengguna
  function OpenAddUserPopup() {
    var addUserPopup = document.getElementById("addUserPopup");
    addUserPopup.classList.remove("hidden");
  }
  
  function closeAddUserPopup() {
    var addUserPopup = document.getElementById("addUserPopup");
    addUserPopup.classList.add("hidden");
  }
  
  // Tangani submit form tambah pengguna
  document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Dapatkan nilai-nilai dari form
    const newUsername = document.getElementById('newUsername').value;
    const newDivision = document.getElementById('newDivision').value;
    const newRole = document.getElementById('newRole').value;
    const newPassword = document.getElementById('newPassword').value;
  
    // Lakukan apa yang Anda inginkan dengan nilai-nilai tersebut, seperti menambahkannya ke dalam tabel atau mengirimnya ke server.
  
    // Setelah selesai, tutup popup
    closeAddUserPopup();
  });
  
  function deleteRow(button) {
    var row = button.closest("tr");
    var id = row.dataset.id; // Anda perlu menambahkan data-id pada setiap baris tabel dengan nilai ID yang sesuai
  
    // Kirim permintaan AJAX ke delete_user.php
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "delete_user.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        
        row.remove();
        console.log(xhr.responseText); // Pesan sukses atau pesan kesalahan dari server
      }
    };
  
    xhr.send("id=" + id); // Kirim ID sebagai data POST
  }
  
  function fetchData() {
    fetch("/IT%20Management%20Asset/Backend/src/user/getData.php")
      .then((response) => response.json())
      .then((data) => {
        displayData(data); // Panggil fungsi displayData untuk menampilkan data dalam tabel
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }

  // Fungsi untuk menampilkan data dalam tabel
  function displayData(data) {
    const userTable = document.getElementById("userTable");
    const tbody = userTable.querySelector("tbody");

    // Bersihkan isi tabel
    tbody.innerHTML = '';

    // Loop melalui data dan tambahkan baris-baris ke dalam tabel
    data.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="p-3 border text-center">${user.username}</td>
        <td class="p-3 border text-center">${user.division}</td>
        <td class="p-3 border text-center">${user.role}</td>
        <td class="p-3 border text-center">${user.password}</td>
        <td class="p-3 border text-center" style="vertical-align: middle;">
          <button onclick="showEditPopup(this)" class=" justify-center items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400 flex" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="cursor: pointer;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  fetchData();