let data = JSON.parse(localStorage.data);
let user = JSON.parse(localStorage.user);

let price = [];
let identifiant = "";
const messageContainer = document.querySelector(".message");
for (p = 0; p < data.length; p++) {
  for(i=1; i<= data[p].quantity;i++){
    price.push(data[p].price);
  }
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = price.reduce(reducer, 0);
let productId = [];
data.forEach((element) => {
  for(i=1; i<= element.quantity;i++){
    productId.push(element.id);
  }
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

fetch("http://localhost:3000/api/cameras/order", init)
  .then((res) => res.json())
  .then((data) => {
    messageContainer.innerHTML = `
        <h1> Votre commande a bien été enregistrée </h1>
        <p> Votre commande N° ${
          data.orderId
        } sera envoyé prochainement, vous pourrez suivre l'envoie grâce à son numéro. </p>
        <h2> Prix total : ${totalPrice / 100}€ </p>
        `;
    localStorage.clear();
  })
  .catch((err) => {
    console.log(err);
  });
