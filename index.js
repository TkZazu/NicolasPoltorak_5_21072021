// let product = [];

// const fetchProduct = async () => {
//   await fetch("http://localhost:3000/api/furniture")
//     .then((res) => res.json())
//     .then((data) => (product = data));

//   console.log(product);
// };

// const productDisplay = async () => {
//   await fetchProduct();

//   document.body.innerHTML += product
//     .map(
//       (item) =>
//         `
//     <div class="container">
//       <h3> ${item.name} </h3>
//       <div> ${item.imageUrl} </div>
//     </div>
//      `
//     )
//     .join(" ");
// };

// productDisplay();
