// 1- ici on va inscrire les VARIABLES dont on se servira par la suite
const productName = document.querySelector(".productName");
const productDescription = document.querySelector("productDescription");
const items = document.getElementById("items");
const backEndProducts = "http://localhost:3000/api/products";


function askToBack() {
    fetch(backEndProducts)
        .then(function (res) {
            if (res.ok) {

                return res.json();
            }
        })
        .then(function produits(products) {
            // pour chaque kanap, on fait un inner.html
            products.forEach((product, i) => {

                // contenu 
                items.innerHTML += `
                        <a href =./product.html?id=${product._id}>
                            <article>
                                <img src ="${product.imageUrl}" alt="${product.altTxt}">
                                <h3 class= "productName">${product.name}</h3>
                                <p class = "productDescription">${product.description}</p>
                            </article>
                        </a>
                    `

            })
        })
        .catch(function (err) {
            alert("souci avec le serveur : réessayez ultérieurement")
        });
};


items.addEventListener('load', askToBack());
