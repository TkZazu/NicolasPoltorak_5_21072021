let adress = window.location.search;
let productId = adress.replace("?id=", "");
let dataUser = [];
let panier = [];
if (localStorage.data) {
  panier = JSON.parse(localStorage.data);
}

let productPage = [];
const productCardContainer = document.getElementsByClassName("product-cards");
const getProduct = async (id) => {
  await fetch("http://localhost:3000/api/cameras/" + id)
    .then((res) => res.json())
    .then((data) => (productPage = data));

  let lenses = "";
  if (productPage.lenses.length >= 2) {
    lenses += `<select class="form-select">
      <option value=""> Personnalisez l'objectif</option> `;
    for (i = 0; i < productPage.lenses.length; i++) {
      if (productPage.lenses[i]) {
        lenses += `<option value=" ${productPage.lenses[i]}"> ${productPage.lenses[i]} </option>`;
      }
    }
    lenses += `</select>`;
  } else if (productPage.lenses.length == 1) {
    lenses = `<p> ${productPage.lenses[0]} </p>
      `;
  }

  productCardContainer[0].innerHTML = `
      <div class="row">
        <div class="col-12 col-sm-12	col-md-12	col-lg-12	col-xl-12">
          <h1> ${productPage.name} </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6	col-sm-6	col-md-8	col-lg-8	col-xl-8">
          <figure class="figure">
            <img class="figure-img img-fluid rounded" src=${
              productPage.imageUrl
            } alt="Photo de ${productPage.name}" />
          </figure>
        </div>
        <div class="col-6	col-sm-6	col-md-4	col-lg-4	col-xl-4 infos">
          <p card-text> ${productPage.description} </p>
          <p class="card-text"> ${productPage.price / 100} € </p>
            ${lenses}
          <div style="margin-top: 50px;" class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-outline-primary" type="button" id="${
            productPage._id
          }"> Ajouter au panier </btn>
          </div>
        </div>
      </div>
      `;
  if (panier.length > 0) {
    dataUser = panier;
  }
  document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", (e) => {
      let productToAdd = {
        image: productPage.imageUrl,
        id: productPage.id,
        price: productPage.price,
        nom: productPage.name,
      };
      dataUser.push(productToAdd);
      localStorage.data = JSON.stringify(dataUser);
    });
  });
};

getProduct(productId);
