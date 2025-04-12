const display = document.getElementById("display");
const lengthInput = document.getElementById("lengthInput");
const upperCase = document.getElementById("upperCase");
const lowerCase = document.getElementById("lowerCase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+=-[]{};:<>?/";

function savePasswordToLocalStorage(password) {
  localStorage.setItem("password", JSON.stringify(password));
}

generateBtn.addEventListener("click", () => {
  let length = +lengthInput.value;
  let validChars = "";
  let password = "";

  upperCase.checked ? (validChars += upperLetters) : "";
  lowerCase.checked ? (validChars += lowerLetters) : "";
  numbers.checked ? (validChars += numberChars) : "";
  symbols.checked ? (validChars += symbolChars) : "";

  if (!length) {
    display.value = "Enter Password's Length";
    setTimeout(() => {
      display.value = "";
    }, 1000);
    return;
  }

  if (validChars === "") {
    display.value = "Setup The Full Setting First";
    return;
  }

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }

  display.value = password;
  savePasswordToLocalStorage(password);
});

display.addEventListener("click", () => {
  display.select();
  document.execCommand("copy");
  display.value = "Copied";
  setTimeout(() => {
    display.value = JSON.parse(localStorage.getItem("password")) || "";
  }, 700);
});

window.addEventListener("load", () => {
  display.value = JSON.parse(localStorage.getItem("password")) || "";
});
