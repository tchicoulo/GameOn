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
const modalValidBg = document.querySelector(".bground-valid");

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
  checkName = /^[a-zA-Z]{2,}$/; // 2 characters or more
  checkQuantity = /^[0-9]{1,2}$/; // // 1 or 2 character numeric

  //Test firstname and lastname with 2 characters
  if (checkName.test(firstName) == false) {
    errorFirstName.style.cssText = `
      display: block;
      color: red;
      `;
    errorFirstName.textContent =
      "Veuillez ajouter au minimum 2 caractères alphabétiques";
  } else {
    localStorage.setItem("prenom", firstName);
    errorFirstName.classList.add("test-valid");
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
    errorLastName.classList.add("test-valid");
    errorLastName.textContent = "✔️";
    testInputs.push("ok");
  }

  //Test email
  if (email.length === 0) {
    errorMail.style.cssText = `
      display: block;
      color: red;
      `;
    errorMail.textContent = "Email non valide";
  } else {
    errorMail.classList.add("test-valid");
    errorMail.textContent = "✔️";
    testInputs.push("ok");
  }

  //Test Date if empty or not
  if (birthDate.length != 10) {
    errorBirthDate.style.cssText = `
      display: block;
      color: red;
      `;
    errorBirthDate.textContent =
      "Veuillez ajouter une date de naissance valide";
  } else {
    errorBirthDate.classList.add("test-valid");
    errorBirthDate.textContent = "✔️";
    testInputs.push("ok");
  }

  //Test quantity if empty or not
  if (checkQuantity.test(quantity) == false && isNaN(quantity)) {
    errorQuantity.style.cssText = `
      display: block;
      color: red;
      `;
    errorQuantity.textContent = "Veuillez indiquer un nombre";
  } else {
    errorQuantity.classList.add("test-valid");
    errorQuantity.textContent = "✔️";
    testInputs.push("ok");
  }

  //Test input radio checked
  for (let elem of radios) {
    if (elem.checked) {
      errorRadio.classList.add("test-valid");
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

  // Test accept terms checked
  if (acceptTerms.checked == false) {
    errorConditions.style.cssText = `
      display: block;
      color: red;
      `;
    errorConditions.textContent = "Veuillez accepter les conditions";
  } else {
    errorConditions.classList.add("test-valid");
    errorConditions.textContent = "✔️";
    testInputs.push("ok");
  }

  // if all tests inputs are 'ok'
  if (testInputs.length == 7) {
    console.log("tests validés !");
    launchValid();
  } else {
    console.log("error test inputs");
  }
}

// Open Content page validation
function launchValid() {
  let localStorageName = localStorage.getItem("prenom");

  closeModalForm();
  modalValidBg.style.display = "block";
  modalValidBg.innerHTML = `
        <div class="valid-content">
          <div class="icon-valid">✅</div>
          <span>Merci ${localStorageName}</span>
          <span>Votre inscription à bien été enregistrée</span>
        </div>`;

  setTimeout(() => {
    window.location = "./index.html";
    localStorage.clear();
  }, 3000);
}

validForm.addEventListener("submit", submitForm);
