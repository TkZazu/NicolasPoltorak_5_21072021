let data = JSON.parse(localStorage.data);
let user = JSON.parse(localStorage.data);
let price = [];
let identifiant = Math.floor(Math.random() * 100000000);
for (p = 0; p < data.length; p++) {
  price.push(data[p].price);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = price.reduce(reducer, 0);

const messageContainer = document.querySelector(".message");
priceMessage = () => {
  messageContainer.innerHTML = `
    <h1> Votre commande a bie été enregistrée </h1>
    <p> Votre commande N° ${identifiant} sera envoyé prochainement, vous pourrez suivre l'envoie grâce à son numéro. </p>
    <p> Prix total : ${totalPrice / 100}€ </p>
    `;
};

priceMessage();
