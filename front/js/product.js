// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const PageTitle = document.querySelector("body > title");
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
    })
    

    .catch(function(err){
        console.log("souci avec le fetch")
    });
};


// 3- ici ce sont les classes que l'on va inscrire pour la suite


// et voici le code tant attendu
productTitle.addEventListener('load',askToBack());
