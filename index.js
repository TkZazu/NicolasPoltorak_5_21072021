let productHomePage = [];
const cardContainer = document.getElementsByClassName("card-container");
const fetchProductHome = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (productHomePage = data));
  cardContainer[0].innerHTML += productHomePage
    .map(
      (item) =>
        `
    <div class="container cards">
      <h1> ${item.name} </h1>
      <div class="price">
      <p> ${item.price}€</p>
      <button class="btn btn-price" type="button">Ajouter au panier</button>
      </div>
      <figure class="figure">
      <img class="figure-img img-fluid img-cards" id="${item._id}" src=${item.imageUrl} alt="Photo de ${item.name}" />
      </figure>
    </div>
     `
    )
    .join(" ");
  document.querySelectorAll(".img-cards").forEach((item) => {
    console.log("texte");
    item.addEventListener("click", (e) => {
      // getProduct(e.target.id);
      window.location.assign("./assets/produits.html?id=" + e.target.id);
    });
  });
};

fetchProductHome();

/* ------------------------------------ Formulaire ----------------------------- */
const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"]');
let firstname, lastname, adress, city, email;

const error = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  }
};

const nameChecker = (value) => {
  if (value.length < 0) {
    firstname = null;
  } else if (!value.match(/^[a-zA-Z]*$/)) {
    errorDisplay(
      "firstname",
      "Votre prénom ne peux pas contenir de caractère spéciaux ou de chiffres"
    );
    firstname = null;
  } else {
    errorDisplay("firstname", "", true);
    pseudo = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstname":
        nameChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});
