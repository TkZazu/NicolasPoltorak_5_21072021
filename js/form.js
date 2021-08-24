const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"]');
let firstName, lastName, adress, city, email;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};
const firstNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s-]*$/)) {
    errorDisplay(
      "firstname",
      "Le prénom ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    firstName = null;
    document.getElementById("first-name").classList.add("is-invalid");
  } else {
    errorDisplay("firstname", "", true);
    firstName = value;
    document.getElementById("first-name").classList.remove("is-invalid");
  }
};
const lastNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s-]*$/)) {
    errorDisplay(
      "lastname",
      "Le nom ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    lastName = null;
    document.getElementById("last-name").classList.add("is-invalid");
  } else {
    errorDisplay("lastname", "", true);
    lastName = value;
    document.getElementById("last-name").classList.remove("is-invalid");
  }
};
const adressChecker = (value) => {
  if (!value.match(/^[a-zA-Z0-9|\s.-]*$/)) {
    errorDisplay(
      "adress",
      "L'adresse ne peux pas contenir de caractères spéciaux"
    );
    adress = null;
    document.getElementById("adress").classList.add("is-invalid");
  } else {
    errorDisplay("adress", "", true);
    adress = value;
    document.getElementById("adress").classList.remove("is-invalid");
  }
};
const cityChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s.-]*$/)) {
    errorDisplay(
      "city",
      "La ville ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    city = null;
    document.getElementById("city").classList.add("is-invalid");
  } else {
    errorDisplay("city", "", true);
    city = value;
    document.getElementById("city").classList.remove("is-invalid");
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
    document.getElementById("email").classList.add("is-invalid");
  } else {
    errorDisplay("email", "", true);
    email = value;
    document.getElementById("email").classList.remove("is-invalid");
  }
};
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first-name":
        firstNameChecker(e.target.value);
        break;
      case "last-name":
        lastNameChecker(e.target.value);
        break;
      case "adress":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstName && lastName && adress && city && email) {
    const data = {
      firstName,
      lastName,
      adress,
      city,
      email,
    };
    localStorage.user = JSON.stringify(data);
    inputs.forEach((input) => (input.value = ""));

    firstName = null;
    lastName = null;
    adress = null;
    city = null;
    email = null;
    alert("Formulaire enregistré.");
  } else {
    alert("Veuillez remplir correctement les champs.");
  }
});
