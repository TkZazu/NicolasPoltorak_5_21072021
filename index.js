let productHomePage = [];
let dataUser = [];
let panier = [];
if (localStorage.data) {
  panier = JSON.parse(localStorage.data);
}
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
      <figure class="figure">
      <img class="figure-img img-fluid img-cards" id="${item._id}" src=${
          item.imageUrl
        } alt="Photo de ${item.name}" />
      </figure>
      <div class="price">
      <p> ${item.price / 100}€</p>
      <button class="btn btn-price" type="button" id="${
        item._id
      }">Ajouter au panier</button>
      </div>
    </div>
     `
    )
    .join(" ");

  if (panier.length > 0) {
    dataUser = panier;
  }
  document.querySelectorAll(".img-cards").forEach((item) => {
    item.addEventListener("click", (e) => {
      window.location.assign("./assets/produits.html?id=" + e.target.id);
    });
  });
  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", (e) => {
      let productToAdd = {
        image: "",
        id: e.target.id,
        price: "",
        nom: "",
      };
      productHomePage.forEach((product) => {
        if (product._id == e.target.id) {
          productToAdd["image"] = product.imageUrl;
          productToAdd["nom"] = product.name;
          productToAdd["price"] = product.price;
        }
      });
      dataUser.push(productToAdd);
      localStorage.data = JSON.stringify(dataUser);
    });
  });
};

fetchProductHome();
