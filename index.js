let product = [];
const cardContainer = document.getElementsByClassName("row-card");
const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .then((data) => (product = data));

  console.log(product);
};

const productDisplay = async () => {
  await fetchProduct();

  cardContainer[0].innerHTML += product
    .map(
      (item) =>
        `
    <div class="container card col-12">
      <h3> ${item.name} </h3>
      <img class="item" src=${item.imageUrl} alt="Photo de ${item.name}" />
    </div>
     `
    )
    .join(" ");
};

productDisplay();

//-------- Ajout d'une div

// let newDiv = document.createElement("div");
// let newContent = document.createTextNode("Try me");
// const noob = document.getElementsByClassName("card-container");
// console.log(noob);
// newDiv.appendChild(newContent);
// noob[0].appendChild(newDiv);
