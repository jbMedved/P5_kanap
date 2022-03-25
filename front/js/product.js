// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const pageTitle = document.querySelector("head > title");
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productcolors = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");
let colorSelected = "";
let howMuchProduct = 0;

const backEndProducts = "http://localhost:3000/api/products";

//comment obtenir l'ID depuis l'url
const myUrl = window.location.href;
//console.log(myUrl);
const searchUrl = new URL(myUrl);
const myId = searchUrl.searchParams.get("id");
//console.log(myId);


function askToBack(){
    fetch (backEndProducts)
    .then (function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then (function produits (products){
        //obtenir l'index en fonction de l'ID
        //const positionProducts = products.indexOf(myId);
        //productsLength = products.length;
        let i = 0;
        //console.log(products[0])
        //console.log(products[0]._id)
        //console.log(products[i]._id)  
        while (myId !=products[i]._id){
            i++;
        } 
        //console.log(i);

        pageTitle.innerHTML = products[i].name
        productImg.innerHTML = `<img src ="${products[i].imageUrl}" alt="${products[i].altTxt}">`
        productTitle.innerHTML = products[i].name
        productPrice.innerHTML = `${products[i].price}`
        productDescription.innerHTML = products[i].description

        //ensuite on continue avec le choix de la couleur
        const colorsOfProduct = products[i].colors;
        //console.log(colorsOfProduct.length);

        if (colorsOfProduct.length == 1){
            productcolors.innerHTML=`
            <option value=>Sélectionnez votre mood</option>
            <option value=${colorsOfProduct}>${colorsOfProduct}</option>`;
        } else if (colorsOfProduct.length == 2){
            productcolors.innerHTML=`
            <option value=>Sélectionnez votre mood</option>
            <option value=${colorsOfProduct[0]}>${colorsOfProduct[0]}</option>
            <option value=${colorsOfProduct[1]}>${colorsOfProduct[1]}</option>`;
        } else if (colorsOfProduct.length == 3){
            productcolors.innerHTML=`
            <option value=>Sélectionnez votre mood</option>
            <option value=${colorsOfProduct[0]}>${colorsOfProduct[0]}</option>
            <option value=${colorsOfProduct[1]}>${colorsOfProduct[1]}</option>
            <option value=${colorsOfProduct[2]}>${colorsOfProduct[2]}</option>`;
        } else {
            productcolors.innerHTML=`
            <option value=>Sélectionnez votre mood</option>
            <option value=${colorsOfProduct[0]}>${colorsOfProduct[0]}</option>
            <option value=${colorsOfProduct[1]}>${colorsOfProduct[1]}</option>
            <option value=${colorsOfProduct[2]}>${colorsOfProduct[2]}</option>
            <option value=${colorsOfProduct[3]}>${colorsOfProduct[3]}</option>`
        }
        // maintenant que l'on a le choix des couleurs, il faut la choisir
        productcolors.addEventListener('input', (c) => {
            colorSelected = c.target.value;
            //console.log(colorSelected);
        })

        //ensuite ici, le nombre d'articles à ajouter
        productQuantity.addEventListener('input', (n) =>{
            howMuchProduct = Number(n.target.value);
            //console.log(howMuchProduct);
        });

        // on va mettre ici les fonctions qui seront appelées quand on cliquera sur "ajouter au panier"
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
                //fonction d'ajout au panier
            function addToCart(product){
                let cart = getCart();   // on appelle le panier
                let alreadyInCart = cart.find(p => p.id ==product.id && p.color ==product.color);  // le produit qu'on ajoute : existe deja dans notre panier? 
                if (alreadyInCart !== undefined) {               //  oui :
                    if (alreadyInCart.quantity+howMuchProduct >100){
                        alert( "pas plus de 100 canapés de meme couleur svp")
                    } else if (howMuchProduct<1){
                        alreadyInCart.quantity
                    } else {
                    alreadyInCart.quantity += howMuchProduct ; // on modifie les quantités
                    }
                } else {                      //non :
                cart.push(product);     // on y ajoute notre produit
                }
                saveCart(cart);         // on sauvegarde le tout
            }
            //ici on ecoute le bouton "Ajouter au panier"
            addToCartButton.addEventListener('click',()=>{
                if (colorSelected == "") {
                    alert("Veuillez Choisir une couleur svp") //on controle si une couleur est choisie
                } else if (howMuchProduct <1) {
                    alert("Veuillez définir une quantité svp") //on controle si une quantité est saisie
                } else {                
                    addToCart({
                    id:myId,
                    "name": products[i].name, 
                    "color":colorSelected,
                    "quantity":howMuchProduct})
                    alert("ajout effectué")
                };
                
            })
    })


    .catch(function(err){ 
        alert("souci avec le serveur : réessayez ultérieurement")
    });
};


productTitle.addEventListener('load',askToBack());


        