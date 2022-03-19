// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const order = document.getElementById("order");

const itemQuantity = document.querySelector(".itemQuantity");
const cartOrderFormSubmit = document.querySelector(".cart__order__form__submit");

const backEndProducts = "http://localhost:3000/api/products";

let totalQuantityInTheCart = 0;
let totalPriceOfTheCart = 0;

// 2- ici on va inscrire les fonctions dont on servire par la suite
function askToBack(){
    fetch (backEndProducts)
    .then (function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then (function produits (products){    
        // on va se servir des memes fonctions que dans products.js
            //fonction de sauvegarde du panier
            function saveCart(cart) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            //fonction "d'affichage" du contenu du panier
            function getCart() {
                let cart = localStorage.getItem("cart");
                if (cart == null){   // si le panier est inexistant
                    return [];
                } else {            // si le panier existe deja
                    return JSON.parse(cart);
                }
            }
            // on va "appeler" le contenu du panier
            cart = getCart();
            console.log(cart);
        // combien de lignes a mon panier?
        let howMuchLinesInMyCart = cart.length;
        console.log(howMuchLinesInMyCart);
        // fort de cette information, on va pouvoir "contruire le visuel du panier"
        let i = 0;
        while (i < howMuchLinesInMyCart){ 
            let s = 0;
        //console.log(products[0])
        //console.log(products[0]._id)
        //console.log(products[i]._id)  
        while (cart[i].id !=products[s]._id){
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
                            <p>${products[s].price}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
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
            
            //a verifier ces soucis de mise a jour panier
            const itemQuantity = document.querySelector(".itemQuantity");
            console.log(itemQuantity);
            itemQuantity.addEventListener('input',(n) =>{
                //cart[i].quantity= n.target.value;
                //console.log(cart[i].quantity);
                console.log(n.target.value);
            })

            
            totalQuantityInTheCart += cart[i].quantity
            totalPriceOfTheCart += (cart[i].quantity * products[s].price)
            totalQuantity.innerHTML = totalQuantityInTheCart;
            totalPrice.innerHTML = totalPriceOfTheCart;
            i++;

        }
            
       
    })
}
// 3- ici ce sont les classes que l'on va inscrire pour la suite


// et voici le code tant attendu
cartOrderFormSubmit.addEventListener('load',askToBack());


