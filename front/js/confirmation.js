//comment obtenir l'ID depuis l'url : on reprend la recette de product.js
const myUrl = window.location.href;
const searchUrl = new URL(myUrl);
const myId = searchUrl.searchParams.get("id");

// on l'injecte dans la page:
const orderId = document.getElementById("orderId")
orderId.innerHTML = myId

// et on vide le panier
let cart = localStorage.getItem("cart");
cart = []
localStorage.setItem("cart", JSON.stringify(cart));