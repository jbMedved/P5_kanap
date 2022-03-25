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
let totalQuantityInTheCart=0;
let totalPriceOfTheCart=0;
let totalPriceOfTheLine = [];


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
            //console.log(cart);
        
        //fonction du bouton "supprimer"
            function removeFromCart(product){
            let cart = getCart();
            cart = cart.filter(p => id != product.id || p.color != product.color);
            }
            // combien de lignes a mon panier?
            //console.log(cart.length);
            // fort de cette information, on va pouvoir "contruire le visuel du panier"
            let i = 0;
        if (cart.length == 0) {
            cartItems.innerHTML = " PANIER VIDE"
            cartItems.style.color = "black"
            cartItems.style.textAlign = "center"
            cartItems.style.fontWeight = "bold"
        }else {
            while (i < cart.length){ 
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
            const itemQuantity = document.querySelectorAll(".itemQuantity");
            //console.log(itemQuantity);
            itemQuantity.forEach((lineItem) => {
                const article = lineItem.closest('article'); //on recupere l'id en fonction du contenu le la ligne article
                const dataId = article.dataset.id; // on en récupere l'id
                const dataColor = article.dataset.color; // on en récupere la couleur

                lineItem.addEventListener('input',() =>{ 
                    const kanap = cart.find(p => p.id == dataId && p.color == dataColor) //kanap = id+couleur produit              
                    //    console.log(n.target.value);
                    //    console.log(cart[i]);
                    //    console.log(i);
                    if(lineItem.value < 1){
                        alert ("veuillez verifier vos quantités svp")
                    } else if (lineItem.value > 100){
                        alert ("pas plus de 100 svp")
                    }else {
                        kanap.quantity= Number(lineItem.value); // on modifie la valeur
                        saveCart(cart);                         // on l'enregistre cette nouvelle quantité
                        console.log(kanap);
                        //    console.log(cart[i].quantity);
                        //    calcul(kanap)
                    }
                })   
            })

            //le bouton "supprimer"
            const deleteItem = document.querySelectorAll(".deleteItem");
            //console.log(deleteItem);
            
            deleteItem.forEach((suppButton) => {
                //console.log(suppButton);
                const article = suppButton.closest('article'); //on recupere l'id en fonction du contenu le la ligne article
                //console.log(article);
                const dataId = article.dataset.id; // on en récupere l'id
                //console.log(dataId);
                const dataColor = article.dataset.color; // on en récupere la couleur
                //console.log(dataColor);
                suppButton.addEventListener('click',() => {
                //   console.log('clic');
                    const kanap = cart.find(p => p.id == dataId && p.color == dataColor);   // kanap = id + couleur du canapé
                    article.remove();
                //    console.log(kanap); 
                 //   removeFromCart(kanap);    
                    cart = cart.filter(p => p.id != dataId || p.color != dataColor);       // on supprime l'article
                    saveCart(cart); 
                })
            })           
            i++;
        

            }
        }
            const itemQuantity = document.querySelectorAll(".itemQuantity");
            itemQuantity.forEach((lineItem) => {
            const article = lineItem.closest('article'); //on recupere l'id en fonction du contenu le la ligne article
            //console.log(article);
            const dataId = article.dataset.id; // on en récupere l'id
            //console.log(dataId);
            const dataColor = article.dataset.color; // on en récupere la couleur            
            //console.log(dataColor);
            //ici, on va trouver la quantité en fonction de l'id ET de la couleur
            function calcul() {
                if(cart.length == 0){
                    totalQuantityInTheCart = 0;
                    totalPriceOfTheCart = 0; 
                } else {
                    totalQuantityInTheCart = 0;
                    totalPriceOfTheCart = 0;
                    let i = 0;
                    while (cart[i].id != dataId || cart[i].color != dataColor ){
                        i++;
                    } 
                    let s = 0;

                    // on additionne les quantités du panier
                    for (let l1=0; l1< cart.length; l1++){                
                        totalQuantityInTheCart += Number(cart[l1].quantity);
                        //console.log(totalQuantityInTheCart);
                    }
                    //on multiplie id.quantité * id.prix
                    for (let l2=0; l2< cart.length; l2++){                
                        let quantityId = cart[l2].id; 
                        //console.log(quantityId);
                        s = 0
                        while (products[s]._id != cart[l2].id ){
                            s++; 
                        }  
                    
                        totalPriceOfTheCart += Number(cart[l2].quantity) * Number(products[s].price)
                    }

                        //console.log(totalPriceOfTheCart);
                
                    totalQuantity.innerHTML = totalQuantityInTheCart;
                    totalPrice.innerHTML = totalPriceOfTheCart;
                }
            }

            lineItem.addEventListener('input',calcul);
            const deleteItem = document.querySelector(".deleteItem")
            deleteItem.addEventListener('click',calcul);
            cartItems.addEventListener('load',calcul());
            }) 
    })
    .catch(function(err){
        alert("souci avec le serveur : réessayez ultérieurement")
    });
}
cartOrderFormSubmit.addEventListener('load',askToBack());

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
regexName =    /[a-z]{1,20}/g;
regexOther =  /[a-z0-9]{1,20}/g;
regexMail =   /[A-z0-9-.]{1,}[@][A-z-]{2,}[.][A-z]{2,}/g;

    // on récupere les informations des differents champs
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

order.addEventListener('click', (e)=>{ //ici on ecoute le bouton "commander" 
    e.preventDefault()
        //on controle si on a des articles dans le panier
    if (cart.length == 0) { 
        alert("le panier est vide") 
        //on controle si les infos sont saisie
    } else if (firstNameText.match (regexName) == null) {
        firstNameErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (lastNameText.match (regexName) == null) {
        lastNameErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (addressText.match (regexOther) == null) {
        addressErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (cityText.match (regexName) == null) {
        cityErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else if (emailText.match (regexMail) == null) {
        emailErrorMsg.innerHTML = "Champ non rempli / non valide"
    } else {     
        let contact =  {"firstName":firstNameText, "lastName":lastNameText, "address":addressText, "city" :cityText, "email": emailText}
        let products = []
        for(let i=0; i<cart.length; i++) {
            products.push(cart[i].id)
        }
        let bodyToSend = {contact, products}
        
        fetch("http://localhost:3000/api/products/order",{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(bodyToSend) 
        })
        .then (function(res){
            if (res.ok){
                return res.json();
            }
        })
        .then (function produits (commandId){

            console.log(commandId)
            location.href=`./confirmation.html?id=${commandId.orderId}`
        })
        // .catch(function(err){
        //     alert("souci avec le serveur : réessayez ultérieurement")
        // });
    };

})

// si tous les champs sont bien remplis, on crée la validation de commande

//alert();
//      
//      
//     


