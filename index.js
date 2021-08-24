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
        <div class="col" style="width: 18rem;">
          <div class="card shadow-sm">
            <img class="card-img-top" id="${item._id}" src="${
          item.imageUrl
        }" alt="Photo de ${item.name}" />
            <div class="card-body">
              <h4> ${item.name} </h4>
              <p class="card-text"> ${item.price / 100}€ </p>
              <button type="button" id="${
                item._id
              }" class="btn btn-outline-primary"> Ajouter au panier </button>
            </div>
          </div>
        </div>
     `
    )
    .join(" ");

  if (panier.length > 0) {
    dataUser = panier;
  }
  document.querySelectorAll(".card-img-top").forEach((item) => {
    item.addEventListener("click", (e) => {
      window.location.assign("./assets/produits.html?id=" + e.target.id);
    });
  });
  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(e.target);
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
