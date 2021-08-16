let panier = JSON.parse(localStorage.data);
let user = localStorage.getItem("user");

const panierProductContainer = document.getElementsByClassName("panier");

const fetchPanier = async () => {
  await fetch("http://localhost:3000/api/cameras").then((res) => res.json());
  let html = "";
  panier.forEach((product, index) => {
    html += `
        <div class="row panier-row">
          <div class="col-4 col-sm-4	col-md-4	col-lg-4	col-xl-4 border">
            <h3> ${product.nom} </h3>
          </div>
          <div class="col-3 col-sm-3	col-md-3	col-lg-3	col-xl-3 border">
            <img class="img-fluid" src="${product.image}" alt="Photo de ${
      product.nom
    }" />
          </div>
          <div class="col-4 col-sm-4 col-md-4	col-lg-4 col-xl-4 border">
            <h3> ${product.price / 100}€</h3>
          </div>
          <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 border">
            <button class="btn btn-panier" id="${index}"><i  class="fas fa-ban"></i></button>
          </div>
        </div>
          `;
    if (panier.length > 0) {
      dataUser = panier;
    }
  });
  panierProductContainer[0].innerHTML = html;
  document.querySelectorAll(".btn-panier").forEach((item) => {
    item.addEventListener("click", (e) => {
      panier.splice(e.target.id, 1);
      localStorage.data = JSON.stringify(panier);
      fetchPanier();
    });
  });
  document.querySelectorAll(".valide").forEach((item) => {
    item.addEventListener("click", (e) => {
      window.location.assign("./confirmationPage.html");
    });
  });
};

fetchPanier();
