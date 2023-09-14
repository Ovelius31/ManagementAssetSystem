// modal.js

// Fungsi untuk membuka modal
function openModal() {
    document.getElementById('backdrop').classList.add('opacity-100');
    document.getElementById('modalContainer').classList.remove('hidden');
}

// Fungsi untuk menutup modal
function closeModal() {
    document.getElementById('backdrop').classList.remove('opacity-100');
    document.getElementById('modalContainer').classList.add('hidden');
}

function closePopup() {
    closeModal(); 
}
// Fungsi untuk logout dan mengarahkan ke halaman login
function logout() {
    window.location.href = "/Frontend/LoginScreen/src/Login.html";
}