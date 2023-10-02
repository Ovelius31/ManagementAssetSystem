document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi fungsi passwordToggle
    initPasswordToggle();
});

// Fungsi untuk menampilkan/sembunyikan password
export function initPasswordToggle() {
    const toggleButton = document.querySelector("#password-toggle");
    const toggleButtonOff = document.querySelector("#password-toggle-off");
    const passwordInput = document.querySelector('input[type="password"]');

    toggleButton.addEventListener("click", function () {
        togglePasswordVisibility(true);
    });

    toggleButtonOff.addEventListener("click", function () {
        togglePasswordVisibility(false);
    });

    function togglePasswordVisibility(show) {
        const newType = show ? "text" : "password";
        passwordInput.setAttribute("type", newType);

        if (show) {
            toggleButton.classList.add("hidden");
            toggleButtonOff.classList.remove("hidden");
        } else {
            toggleButton.classList.remove("hidden");
            toggleButtonOff.classList.add("hidden");
        }
    }
}

var urlParams = new URLSearchParams(window.location.search);
var errorMessage = urlParams.get('error');

// Tampilkan pesan kesalahan jika ada
if (errorMessage === '1') {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.style.display = 'block';
}