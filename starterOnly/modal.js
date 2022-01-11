function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const validForm = document.querySelector(".valid-form");

const contentModal = document.querySelector(".bground");
const closeModal = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close Modal Form
closeModal.addEventListener("click", closeModalForm);

function closeModalForm() {
  contentModal.style.display = "none";
}

//Valid & send form

function submitForm(e) {
  //target Values
  let firstName = document.getElementById("first").value;
  let lastName = document.getElementById("last").value;
  let email = document.getElementById("email").value;
  let birthDate = document.getElementById("birthdate").value;
  let quantity = document.getElementById("quantity").value;
  let radio = document.getElementsByName("location");
  let acceptTerms = document.getElementById("checkbox1");
  let radioValue = "";

  //Regex
  checkName = /[a-zA-Z]{2,}/; // 2 characters or more

  //tests inputs form

  e.preventDefault();

  console.log("prenom :" + firstName);
  console.log("nom :" + lastName);
  console.log("mail :" + email);
  console.log("anniv :" + birthDate);
  console.log("qté  :" + quantity);

  radio.forEach((elem) => {
    if (elem.checked) {
      radioValue = elem.value;
      console.log(radioValue);
    }
  });

  if (acceptTerms.checked) {
    console.log("Termes acceptés !");
  } else {
    console.log("Termes non acceptés");
  }
}

validForm.addEventListener("submit", submitForm);
