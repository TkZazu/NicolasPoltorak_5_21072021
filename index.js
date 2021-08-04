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
      <figure class="figure">
      <img class="figure-img img-fluid img-cards" id="${item._id}" src=${item.imageUrl} alt="Photo de ${item.name}" />
      </figure>
      <div class="price">
      <p> ${item.price}€</p>
      <button class="btn btn-price" type="button" id="${item._id}">Ajouter au panier</button>
      </div>
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
