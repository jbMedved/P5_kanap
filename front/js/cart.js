// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

const order = document.getElementById("order");

//const itemQuantity = document.querySelector(".itemQuantity");
const cartOrderFormSubmit = document.querySelector(".cart__order__form__submit");
//const deleteItem = document.querySelector(".deleteItem");

const backEndProducts = "http://localhost:3000/api/products";

let totalQuantityInTheLine = [];
let totalQuantityInTheCart = 0;
let totalPriceOfTheCart = 0;
let totalPriceOfTheLine = [];


// 2- ici on va inscrire les fonctions dont on servire par la suite
function askToBack() {
    fetch(backEndProducts)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function produits(products) {
            // on va se servir des memes fonctions que dans products.js
            //fonction de sauvegarde du panier
            function saveCart(cart) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            //fonction "d'affichage" du contenu du panier
            function getCart() {
                let cart = localStorage.getItem("cart");
                if (cart == null) {   // si le panier est inexistant
                    return [];
                } else {            // si le panier existe deja
                    return JSON.parse(cart);
                }
            }

            // on va "appeler" le contenu du panier
            cart = getCart();

            //fonction du bouton "supprimer"
            function removeFromCart(product) {
                let cart = getCart();
                cart = cart.filter(p => id != product.id || p.color != product.color);
            }

            // fort de cette information, on va pouvoir "contruire le visuel du panier"
            let i = 0;
            if (cart.length == 0) {
                cartItems.innerHTML = " PANIER VIDE"
                cartItems.style.color = "black"
                cartItems.style.textAlign = "center"
                cartItems.style.fontWeight = "bold"
            } else {
                while (i < cart.length) {
                    let s = 0;

                    while (cart[i].id != products[s]._id) {
                        s++;
                    }
                    cartItems.innerHTML +=
                        `
                <article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                    <div class="cart__item__img">
                        <img src="${products[s].imageUrl}" alt="${products[s].altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${products[s].name}</h2>
                            <p>${cart[i].color}</p>
                            <p>${products[s].price}???</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qt?? : </p>
                                <input type="number" class="itemQuantity" 
                                name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `


                    const itemQuantity = document.querySelectorAll(".itemQuantity");

                    itemQuantity.forEach((lineItem) => {
                        const article = lineItem.closest('article'); //on recupere l'id en fonction du contenu le la ligne article
                        const dataId = article.dataset.id; // on en r??cupere l'id
                        const dataColor = article.dataset.color; // on en r??cupere la couleur

                        lineItem.addEventListener('input', () => {
                            const kanap = cart.find(p => p.id == dataId && p.color == dataColor) //kanap = id+couleur produit              

                            if (lineItem.value < 1) {
                                alert("veuillez verifier vos quantit??s svp")
                            } else if (lineItem.value > 100) {
                                alert("pas plus de 100 svp")
                            } else {
                                kanap.quantity = Number(lineItem.value); // on modifie la valeur
                                saveCart(cart);                         // on l'enregistre cette nouvelle quantit??
                            }
                        })
                    })

                    //le bouton "supprimer"
                    const deleteItem = document.querySelectorAll(".deleteItem");

                    deleteItem.forEach((suppButton) => {

                        const article = suppButton.closest('article'); //on recupere l'id en fonction du contenu le la ligne article

                        const dataId = article.dataset.id; // on en r??cupere l'id

                        const dataColor = article.dataset.color; // on en r??cupere la couleur

                        suppButton.addEventListener('click', () => {
                            article.remove();
                            cart = cart.filter(p => p.id != dataId || p.color != dataColor);       // on supprime l'article
                            saveCart(cart);
                            calcul()
                        })
                    })
                    i++;


                }
            }
            function calcul() {
                if (cart.length == 0) {
                    totalQuantityInTheCart = 0;
                    totalPriceOfTheCart = 0;
                } else {
                    totalQuantityInTheCart = 0;
                    totalPriceOfTheCart = 0;

                    // on additionne les quantit??s du panier
                    for (let l1 = 0; l1 < cart.length; l1++) {
                        totalQuantityInTheCart += Number(cart[l1].quantity);
                    }
                    //on multiplie id.quantit?? * id.prix
                    for (let l2 = 0; l2 < cart.length; l2++) {

                        let s = 0
                        while (products[s]._id != cart[l2].id) {
                            s++;
                        }

                        totalPriceOfTheCart += Number(cart[l2].quantity) * Number(products[s].price)
                    }

                    totalQuantity.innerHTML = totalQuantityInTheCart;
                    totalPrice.innerHTML = totalPriceOfTheCart;
                }
            }
            const itemQuantity = document.querySelectorAll(".itemQuantity");
            itemQuantity.forEach((lineItem) => {

                //ici, on va trouver la quantit?? en fonction de l'id ET de la couleur
                lineItem.addEventListener('input', calcul);;
                cartItems.addEventListener('load', calcul());
            })
        })
        .catch(function (err) {
            console.error(err);
            alert("souci avec le serveur : r??essayez ult??rieurement")
        });
}
cartOrderFormSubmit.addEventListener('load', askToBack());

////////////////////////////////////////////////////////
///////////////// FINI AVEC LE PANIER //////////////////
/////////////// ON PASSE AU FORMULAIRE /////////////////
////////////////////////////////////////////////////////

let firstNameText
let lastNameText
let addressText
let cityText
let emailText
let errSaisie = 0
validation = []
regexName = /[a-z]{1,20}/g;
regexOther = /[a-z0-9]{1,20}/g;
regexMail = /[A-z0-9-.]{1,}[@][A-z-]{2,}[.][A-z]{2,}/g;

// on r??cupere les informations des differents champs
firstName.addEventListener('input', (f) => {
    firstNameText = f.target.value;
});

lastName.addEventListener('input', (l) => {
    lastNameText = l.target.value;
});

address.addEventListener('input', (a) => {
    addressText = a.target.value
});

city.addEventListener('input', (c) => {
    cityText = c.target.value;
});

email.addEventListener('input', (e) => {
    emailText = e.target.value
});

order.addEventListener('click', (e) => { //ici on ecoute le bouton "commander" 
    e.preventDefault()
    //on controle si on a des articles dans le panier
    if (cart.length == 0) {
        alert("le panier est vide")
        //on controle si les infos sont saisie
    } else if (firstNameText.match(regexName) == null) {
        firstNameErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (lastNameText.match(regexName) == null) {
        lastNameErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (addressText.match(regexOther) == null) {
        addressErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (cityText.match(regexName) == null) {
        cityErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (emailText.match(regexMail) == null) {
        emailErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else {
        let contact = { "firstName": firstNameText, "lastName": lastNameText, "address": addressText, "city": cityText, "email": emailText }
        let products = []
        for (let i = 0; i < cart.length; i++) {
            products.push(cart[i].id)
        }
        let bodyToSend = { contact, products }

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyToSend)
        })
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function produits(commandId) {
                location.href = `./confirmation.html?id=${commandId.orderId}`
            })
            .catch(function (err) {
                console.error(err)
                alert("souci avec le serveur : r??essayez ult??rieurement")
            });
    };

})
