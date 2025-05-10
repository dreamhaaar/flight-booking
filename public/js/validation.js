const toLocation = document.getElementById("to-location");
const fromLocation = document.getElementById("from-location");

const errorMsg1 = document.getElementById("error-msg1");
const errorMsg2 = document.getElementById("error-msg2");

const fName = document.getElementById("first-name");
const lName = document.getElementById("last-name");

const errName1 = document.getElementById("error-name1");
const errName2 = document.getElementById("error-name2");

const phoneNum = document.getElementById("phone-num");
const phoneErr = document.getElementById("error-phone");
const phoneErrDig = document.getElementById("error-phone-digits");

const blockTime = document.getElementById("block-time");
const blockTimeErr = document.getElementById("error-message-block-time");

const takeOff = document.getElementById("take-off-land-fee");
const takeOffErr = document.getElementById("error-message-take-off");

const terFee = document.getElementById("terminal-fee");
const terFeeErr = document.getElementById("error-message-terminal-fee");

const addCycle = document.getElementById("add-cycle");
const addCycleErr = document.getElementById("error-add-cycle");

function validateEmail() {
  const email = document.getElementById("email-add");
  const errEmail = document.getElementById("error-email");
  email.addEventListener("keydown", (event) => {
    const controlKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    if (event.key === " " && !controlKeys.includes(event.key)) {
      event.preventDefault();
    }
  });
  email.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      errEmail.classList.remove("hidden");
    } else {
      errEmail.classList.add("hidden");
    }
  });
}

function characterOnly(id, error) {
  const allowed = /^[a-zA-Z\s]*$/; // * allows empty string

  const validate = () => {
    if (!allowed.test(id.value)) {
      error.classList.remove("hidden");
    } else {
      error.classList.add("hidden");
    }
  };

  // Validate on keydown for real-time typing
  id.addEventListener("keydown", (event) => {
    const key = event.key;
    const allowedKey = /^[a-zA-Z\s]$/;
    const controlKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    if (!allowedKey.test(key) && !controlKeys.includes(key)) {
      event.preventDefault();
      error.classList.remove("hidden");
    }
  });

  // Validate on input (covers typing, paste, autofill, etc.)
  id.addEventListener("input", validate);

  // Validate on change (useful for some edge cases)
  id.addEventListener("change", validate);
}

function numberOnly(id, error) {
  id.addEventListener("keydown", (event) => {
    const key = event.key;
    const allowed = /^[0-9]$/;
    const controlKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    if (!allowed.test(key) && !controlKeys.includes(key)) {
      event.preventDefault();
      error.classList.remove("hidden");
    } else {
      error.classList.add("hidden");
    }
  });

  id.addEventListener("input", () => {
    if (id.value.length > 11 || id.value.length < 11) {
      error.classList.remove("hidden");
      error.innerHTML = "❌ Phone number has only 11 digits";
    } else {
      error.classList.add("hidden");
    }
  });
}

function numberOnlyBill(id, error) {
  id.addEventListener("keydown", (event) => {
    const key = event.key;
    const allowed = /^[0-9.]$/;
    const controlKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    if (!allowed.test(key) && !controlKeys.includes(key)) {
      event.preventDefault();
      error.classList.remove("hidden");
    } else {
      error.classList.add("hidden");
    }
  });
}

function currentDate() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const dateInput = document.getElementById("date");
  dateInput.setAttribute("min", formattedDate);
}

function validatePrincipalsSelection() {
  const checkboxes = document.querySelectorAll(
    "#main-form input[type='checkbox']"
  );
  const errorMessage = document.getElementById("error-message-principal");

  // Check if any checkbox is checked
  const isChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

  // Toggle error message visibility based on validation
  errorMessage.classList.toggle("hidden", isChecked);

  return isChecked;
}

document.addEventListener("DOMContentLoaded", function () {
  characterOnly(toLocation, errorMsg2);
  characterOnly(fromLocation, errorMsg1);
  characterOnly(fName, errName1);
  characterOnly(lName, errName2);
  validateEmail();
  numberOnly(phoneNum, phoneErr);
  numberOnlyBill(blockTime, blockTimeErr);
  numberOnlyBill(takeOff, takeOffErr);
  numberOnlyBill(terFee, terFeeErr);
  numberOnlyBill(addCycle, addCycleErr);
  currentDate();
});

document.getElementById("main-form").addEventListener("submit", function (e) {
  if (!validatePrincipalsSelection()) {
    e.preventDefault(); // Prevent form submission if no checkbox is checked
  }
});


var countPrincipal = 0;
document.getElementById("submit-btn").addEventListener("click", () => {
  const selected = [];

  for (let i = 1; i <= 7; i++) {
    const checkbox = document.getElementById("checkbox-" + i);
    if (checkbox && checkbox.checked) {
      if (i === 7) {
        const otherText = document.getElementById("other-text").value.trim();
        if (otherText) {
          selected.push(otherText);
        }
      } else {
        selected.push(checkbox.value);
      }
    }
  }
  countPrincipal = selected.length;

  // 👇 Set the hidden input value before submitting
  document.getElementById("selectedNames").value = JSON.stringify(selected);
});

function toMin() {
  const hour = document.getElementById("block-time");
  hour.addEventListener("input", () => {
    let minutes = 60 * hour.value;

    if(hour.value == "" || hour.value == null){
      document.getElementById("block-time-min").value = '';
    } else {
      document.getElementById("block-time-min").value = minutes.toLocaleString();
    }
  });
}
toMin();


function terminalFee() {
  const checkboxes = document.querySelectorAll('.principal-checkbox');
  const terminalFeeInput = document.getElementById('terminal-fee');

  function updateTerminalFee() {
    let countPrincipal = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        countPrincipal++;
      }
    });

    const terFee = (countPrincipal) * 500; // +1 if you want to include a base fee
    if(countPrincipal <= 0){
      terminalFeeInput.value = "";
    } else{
    terminalFeeInput.value = terFee.toLocaleString(); // display with commas
    }
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateTerminalFee);
  });

  // Initialize it once when the page loads
  updateTerminalFee();
}

terminalFee(); // Call the function

