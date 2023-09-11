$(document).ready(function () {
    var table = $('#example').DataTable({
        responsive: true
    }).columns.adjust().responsive.recalc();
});

document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("apple-imac-20-dropdown-button");
    const dropdown = document.getElementById("apple-imac-20-dropdown");
  
    dropdownButton.addEventListener("click", function() {
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
    window.location.href = "/IT%20Management%20Asset/Frontend/LoginScreen/src/Login.html"; 
}

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

  // When the user clicks on <span> (x), close the modal
  const span = modal.querySelector(".close");
  span.onclick = function () {
      popup.style.display = 'none';
      backdrop.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
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

logoLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
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

  try {
    const response = await fetch("/api/saveData", {
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
//fungsi animasi link navbar
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
