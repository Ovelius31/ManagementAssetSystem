import * as database from './Database.js';
import { initPasswordToggle } from './Login2.js'; // Mengimpor fungsi ini dari Login2.js

document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi fungsi passwordToggle
  initPasswordToggle();

  // Bagian dari kode yang mengirim permintaan login ke server
  const loginButton = document.querySelector("#login-button");
  const usernameInput = document.querySelector("#username");
  const errorMessage = document.querySelector("#error-message");
  const passwordInput = document.querySelector("#password-input"); 

  loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    database.validateLogin(username, password, function (success) {
      if (success) {
        window.location.href = "/IT%20Management%20Asset/Frontend/Pages/dashboard/src/Dashboard.html";
      } else {
        errorMessage.classList.remove("hidden");
      }
    });
  });

  // Tambahan: Menyembunyikan pesan kesalahan saat input berubah
  usernameInput.addEventListener("input", function () {
    errorMessage.classList.add("hidden");
  });
});
