let adress = window.location.search;
let productId = adress.replace("?id=", "");

let productPage = [];
const productCardContainer = document.getElementsByClassName("product-cards");
const getProduct = async (id) => {
  await fetch("http://localhost:3000/api/cameras/" + id)
    .then((res) => res.json())
    .then((data) => (productPage = data));

  let lenses = "";
  if (productPage.lenses.length >= 2) {
    lenses += `<select class="lense">
      <option value=""> Personnaliez votre lense</option> `;
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
        <div class="col-4	col-sm-4	col-md-8	col-lg-8	col-xl-8">
          <figure class="figure">
            <img class="figure-img img-fluid img-cards" src=${productPage.imageUrl} alt="Photo de ${productPage.name}" />
          </figure>
        </div>
        <div class="col-8	col-sm-8	col-md-4	col-lg-4	col-xl-4 infos">
          <p> ${productPage.description} </p>
          <p class="price"> ${productPage.price}€ </p>
            ${lenses}
          <button class="btn btn-price" type="button" id="${productPage._id}"> Ajouter au panier </btn>
        </div>
      </div>
      `;
};

getProduct(productId);
