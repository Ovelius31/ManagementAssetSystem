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

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').
    forEach(link => {
        if(link.href.includes(`${activePage}`)){
            link.classList.add('active');
        }
    })