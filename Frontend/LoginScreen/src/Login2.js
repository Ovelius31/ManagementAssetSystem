// Login2.js

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
      const currentType = passwordInput.getAttribute("type");
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
  