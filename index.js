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
      <img class="figure-img img-fluid img-cards" src=${item.imageUrl} alt="Photo de ${item.name}" />
      </figure>
    </div>
     `
    )
    .join(" ");
};

fetchProductHome();

let productProductPage = [];
const productCardContainer = document.getElementsByClassName("product-cards");
const fetchProductPage = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (productProductPage = data));
  productCardContainer[0].innerHTML += productProductPage
    .map(
      (item) =>
        `
    <div class="row">
      <div class="col-12 col-sm-12	col-md-12	col-lg-12	col-xl-12">
        <h1> ${item.name} </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-4	col-sm-4	col-md-8	col-lg-8	col-xl-8">
        <figure class="figure">
          <img class="figure-img img-fluid img-cards" src=${item.imageUrl} alt="Photo de ${item.name}" />
        </figure>
      </div>
      <div class="col-8	col-sm-8	col-md-4	col-lg-4	col-xl-4">
        <p> ${item.description} </p>
        <p> ${item.price} </p>
      </div>
    </div>
     `
    )
    .join(" ");
};

fetchProductPage();
