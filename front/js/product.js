// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const pageTitle = document.querySelector("head > title");
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productcolors = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

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
        console.log(i);

        pageTitle.innerHTML = products[i].name
        productImg.innerHTML = `<img src ="${products[i].imageUrl}" alt="${products[i].altTxt}">`
        productTitle.innerHTML = products[i].name
        productPrice.innerHTML = `${products[i].price}`
        productDescription.innerHTML = products[i].description

        //ensuite on continue avec le choix de la couleur
        const colorsOfProduct = products[i].colors;
        console.log(colorsOfProduct.length);

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
            let colorSelected = c.target.value;
            console.log(colorSelected);
        })

        //ensuite ici, le nombre d'articles à ajouter
        productQuantity.addEventListener('input', (n) =>{
            let howMuchProduct = n.target.value;
            console.log(howMuchProduct);
        });

        // on va mettre ici les fonctions qui seront appelées quand on cliquera sur "ajouter au panier"


        //ici on ecoute le bouton "Ajouter au panier"
        //addToCart.addEventListener('click',)
    
    })


    .catch(function(err){
        console.log("souci avec le fetch")
    });
};



// et voici le code tant attendu
productTitle.addEventListener('load',askToBack());
