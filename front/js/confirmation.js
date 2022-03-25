//comment obtenir l'ID depuis l'url : on reprend la recette de product.js
const myUrl = window.location.href;
const searchUrl = new URL(myUrl);
const myId = searchUrl.searchParams.get("id");

//et on l'injecte dans la page:
const orderId = document.getElementById("orderId")
orderId.innerHTML = myId