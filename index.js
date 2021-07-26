let product = [];
const cardContainer = document.getElementsByClassName("card-container");
const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (product = data));
  cardContainer[0].innerHTML += product
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

fetchProduct();

//-------- Ajout d'une div

// let newDiv = document.createElement("div");
// let newContent = document.createTextNode("Try me");
// const noob = document.getElementsByClassName("card-container");
// console.log(noob);
// newDiv.appendChild(newContent);
// noob[0].appendChild(newDiv);
