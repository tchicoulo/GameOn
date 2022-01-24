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

  //Regex
  checkName = /^[a-zA-Z]{2,}$/; // 2 characters or more
  checkQuantity = /^[0-9]{1,2}$/; // // 1 or 2 character numeric
  checkMail = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i; // email checker

  //Function Display error
  function errorDisplay(tag, message, valid) {
    const container = document.querySelector(".error-" + tag);

    if (!valid) {
      container.classList.add("test-invalid");
      container.textContent = message;
    } else {
      container.classList.add("test-valid");
      container.textContent = message;
    }
  }

  //Test firstname and lastname with 2 characters
  if (!checkName.test(firstName)) {
    errorDisplay(
      "first",
      "Veuillez ajouter au minimum 2 caractères alphabétiques"
    );
  } else {
    errorDisplay("first", "✔️", true);
    localStorage.setItem("prenom", firstName);
    testInputs.push("ok");
  }

  if (!checkName.test(lastName)) {
    errorDisplay(
      "last",
      "Veuillez ajouter au minimum 2 caractères alphabétiques"
    );
  } else {
    errorDisplay("last", "✔️", true);
    testInputs.push("ok");
  }

  //Test email
  if (email.length === 0) {
    errorDisplay("mail", "Veuillez entrer une adresse email");
  } else if (!checkMail.test(email)) {
    errorDisplay("mail", "Veuillez entrer une adresse mail valide");
  } else {
    errorDisplay("mail", "✔️", true);
    testInputs.push("ok");
  }

  //Test Date if empty or not
  if (birthDate.length != 10) {
    errorDisplay("birthdate", "Veuillez ajouter une date de naissance valide");
  } else {
    errorDisplay("birthdate", "✔️", true);
    testInputs.push("ok");
  }

  //Test quantity if empty or not
  if (!checkQuantity.test(quantity)) {
    errorDisplay("quantity", "Veuillez indiquer un nombre entre 0 et 99");
  } else {
    errorDisplay("quantity", "✔️", true);
    testInputs.push("ok");
  }

  //Test input radio checked
  for (let elem of radios) {
    if (elem.checked) {
      errorDisplay("radio", "✔️", true);
      testInputs.push("ok");
      break;
    } else {
      errorDisplay("radio", "Veuillez sélectionner une option");
    }
  }

  // Test accept terms checked
  if (!acceptTerms.checked) {
    errorDisplay("conditions", "Veuillez accepter les conditions");
  } else {
    errorDisplay("conditions", "✔️", true);
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
