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
  e.preventDefault();

  //verification all valid inputs before submit
  let testInputs = [];

  //target Values
  let firstName = document.getElementById("first").value;
  let lastName = document.getElementById("last").value;
  let email = document.getElementById("email").value;
  let birthDate = document.getElementById("birthdate").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  let radios = document.querySelectorAll("input[name='location']");
  let acceptTerms = document.getElementById("checkbox1");

  //message error values
  let errorFirstName = document.querySelector(".error-first");
  let errorLastName = document.querySelector(".error-last");
  let errorBirthDate = document.querySelector(".error-birthdate");
  let errorMail = document.querySelector(".error-mail");
  let errorQuantity = document.querySelector(".error-quantity");
  let errorRadio = document.querySelector(".error-radio");
  let errorConditions = document.querySelector(".error-conditions");

  //Regex
  checkName = /[a-zA-Z]{2,}/; // 2 characters or more
  checkQuantity = /[0-9]{1,2}/; // // 1 or 2 character numeric

  console.log("prenom :" + firstName);
  console.log("nom :" + lastName);
  console.log("mail :" + email);
  console.log("anniv :" + birthDate);
  console.log("qté  :" + quantity);

  //Test firstname and lastname with 2 characters
  if (checkName.test(firstName) == false) {
    errorFirstName.style.cssText = `
      display: block;
      color: red;
      `;
    errorFirstName.textContent =
      "Veuillez ajouter au minimum 2 caractères alphabétiques";
  } else {
    errorFirstName.style.display = "block";
    errorFirstName.style.color = "green";
    errorFirstName.textContent = "✔️";
    testInputs.push("ok");
  }

  if (checkName.test(lastName) == false) {
    errorLastName.style.cssText = `
      display: block;
      color: red;
      `;
    errorLastName.textContent =
      "Veuillez ajouter au minimum 2 caractères alphabétiques";
  } else {
    errorLastName.style.display = "block";
    errorLastName.style.color = "green";
    errorLastName.textContent = "✔️";
    testInputs.push("ok");
  }

  //test email
  if (email.length === 0) {
    errorMail.style.cssText = `
      display: block;
      color: red;
      `;
    errorMail.textContent = "Email non valide";
  } else {
    errorMail.style.display = "block";
    errorMail.textContent = "✔️";
    errorMail.style.color = "green";
    testInputs.push("ok");
  }

  //test Date if empty or not
  if (birthDate.length != 10) {
    errorBirthDate.style.cssText = `
      display: block;
      color: red;
      `;
    errorBirthDate.textContent =
      "Veuillez ajouter une date de naissance valide";
  } else {
    errorBirthDate.style.display = "block";
    errorBirthDate.style.color = "green";
    errorBirthDate.textContent = "✔️";
    testInputs.push("ok");
  }

  //test quantity if empty or not
  if (checkQuantity.test(quantity) === false && isNaN(quantity)) {
    errorQuantity.style.cssText = `
      display: block;
      color: red;
      `;
    errorQuantity.textContent = "Veuillez indiquer un nombre";
  } else {
    errorQuantity.style.display = "block";
    errorQuantity.style.color = "green";
    errorQuantity.textContent = "✔️";
    testInputs.push("ok");
  }

  //test input radio

  for (let elem of radios) {
    if (elem.checked) {
      errorRadio.style.display = "block";
      errorRadio.style.color = "green";
      errorRadio.textContent = "✔️";
      testInputs.push("ok");
      break;
    } else {
      errorRadio.style.cssText = `
      display: block;
      color: red;
      `;
      errorRadio.textContent = "Veuillez sélectionner une option";
    }
  }

  // checked accept terms
  if (acceptTerms.checked == false) {
    console.log("Termes non acceptés !");
    errorConditions.style.cssText = `
      display: block;
      color: red;
      `;
    errorConditions.textContent = "Veuillez accepter les conditions";
  } else {
    console.log("Termes acceptés");
    errorConditions.style.display = "block";
    errorConditions.style.color = "green";
    errorConditions.textContent = "✔️";
    testInputs.push("ok");
  }

  console.log(testInputs);
}

validForm.addEventListener("submit", submitForm);
