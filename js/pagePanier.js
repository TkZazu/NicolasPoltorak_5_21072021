let panier = JSON.parse(localStorage.data);
let user = localStorage.getItem("user");

const panierProductContainer = document.getElementsByClassName("panier");

const fetchPanier = async () => {
  await fetch("http://localhost:3000/api/cameras").then((res) => res.json());
  let html = "";
  panier.forEach((product, index) => {
    html += `
        <div class="row panier-row">
          <div class="col-3 col-sm-3	col-md-3	col-lg-3	col-xl-3 border">
            <h4> ${product.nom} </h3>
          </div>
          <div class="col-2 col-sm-2	col-md-2	col-lg-2	col-xl-2 border">
            <img class="card-img" src="${product.image}" alt="Photo de ${
      product.nom
    }" />
          </div>
          <div class="col-3 col-sm-3 col-md-3	col-lg-3 col-xl-3 border">
            <h4> ${(product.price / 100) * product.quantity}€</h4>
          </div>
          <div class="col-3 col-sm-3 col-md-3	col-lg-3 col-xl-3 border quantity">
            <div>
              <button class="btn btn-quantity-minus" id="${index}"> - </button>
            </div>
            <div>
              <h4> ${product.quantity} </h4>
            </div>
            <div>
              <button class="btn btn-quantity-plus" id="${index}"> + </button>
            </div>
          </div>
          <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 border">
            <button class="btn btn-panier " id="${index}"><i  class="fas fa-ban"></i></button>
          </div>
        </div>
          `;
    if (panier.length > 0) {
      dataUser = panier;
    }
  });
  panierProductContainer[0].innerHTML = html;

  document.querySelectorAll(".btn-quantity-minus").forEach((item) => {
    item.addEventListener("click", (e) => {
      panier.splice(e.target.id, 1);
      localStorage.data = JSON.stringify(panier);
    });
  });

  document.querySelectorAll(".btn-quantity-plus").forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log("click");
    });
  });

  document.querySelectorAll(".btn-panier").forEach((item) => {
    item.addEventListener("click", (e) => {
      panier.splice(e.target.id, 1);
      if (panier.length == 0) {
        localStorage.clear();
      } else {
        localStorage.data = JSON.stringify(panier);
      }
      fetchPanier();
    });
  });
};

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
    if (localStorage.data.length > 0) {
      window.location.assign("./confirmationPage.html");
    }
  } else {
    alert("Veuillez remplir correctement les champs.");
  }
});

fetchPanier();
