let data = JSON.parse(localStorage.data);
let user = JSON.parse(localStorage.user);

let price = [];
let identifiant = "";
const messageContainer = document.querySelector(".message");
for (p = 0; p < data.length; p++) {
  price.push(data[p].price);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = price.reduce(reducer, 0);
let productId = [];
data.forEach((element) => {
  productId.push(element.id);
});

const order = {
  contact: {
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
    address: user.adress,
    email: user.email,
  },
  products: productId,
};
const init = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(order),
};
console.log(init);
fetch("http://localhost:3000/api/cameras/order", init)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    messageContainer.innerHTML = `
        <h1> Votre commande a bie été enregistrée </h1>
        <p> Votre commande N° ${
          data.orderId
        } sera envoyé prochainement, vous pourrez suivre l'envoie grâce à son numéro. </p>
        <p> Prix total : ${totalPrice / 100}€ </p>
        `;
  })
  .catch((err) => {
    console.log(err);
  });
