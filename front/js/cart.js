// 1- ici on va inscrire les VARIABLES dont on se servira par la suite


// 2- ici on va inscrire les fonctions dont on servire par la suite

    //sauvegarde du panier dans localStorage en chaine de caracteres via JSON pour localstorage
function saveCart(basket){
    localStorage.setItem("basket",JSON.stringify(basket));
};
    //on récupere les données et on les remet en JS 
function getCart(){
    return JSON.parse(localStorage.getItem("basket"));
}
    //ajout au panier
function addToCart(produit){
    let panier = getCart();
    panier.push(produit);
}


// 3- ici ce sont les classes que l'on va inscrire pour la suite


// et voici le code tant attendu