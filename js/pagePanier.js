let panier = JSON.parse(localStorage.data);
let user = localStorage.getItem("user");

const panierProductContainer = document.getElementsByClassName("panier");

const fetchPanier = async () => {
  await fetch("http://localhost:3000/api/cameras").then((res) => res.json());
  let html = "";
  panier.forEach((product) => {
    html += `
          <div class="">
            <h3> ${product.nom} </h3>
          </div>
          <div class="">
            <img class="" src="${product.image}" alt="Photo de ${
      product.nom
    }" />
          </div>
          <div class="">
            <h3> ${product.price / 100}€</h3>
          </div>
          `;
  });
  panierProductContainer[0].innerHTML = html;
};

fetchPanier();
