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
  } else {
    errorDisplay("firstname", "", true);
    firstName = value;
  }
};
const lastNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s-]*$/)) {
    errorDisplay(
      "lastname",
      "Le nom ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    lastName = null;
  } else {
    errorDisplay("lastname", "", true);
    lastName = value;
  }
};
const adressChecker = (value) => {
  if (!value.match(/^[a-zA-Z0-9|\s.-]*$/)) {
    errorDisplay(
      "adress",
      "L'adresse ne peux pas contenir de caractères spéciaux"
    );
    adress = null;
  } else {
    errorDisplay("adress", "", true);
    adress = value;
  }
};
const cityChecker = (value) => {
  if (!value.match(/^[a-zA-Z|\s.-]*$/)) {
    errorDisplay(
      "city",
      "La ville ne peux pas contenir de caractères spéciaux ou de chiffres"
    );
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
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
    console.log(data);
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
