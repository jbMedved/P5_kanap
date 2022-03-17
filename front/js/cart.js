// 1- ici on va inscrire les VARIABLES dont on se servira par la suite


// la classe panier dans laquel on va placer tout ce dont on a besoin pour "jouer" avec le panier
// class panier {
//    constructor(){
// on récupere les données depuis localStorage et on les remet en JS 
//        let panier = localStorage.getItem("panier");
//        if (panier ==null){
//            this.panier = []
//        } else {
//            this.panier = JSON.parse(panier);
//        }   
//    }
    // sauvegarde du panier dans localStorage en chaine de caracteres via JSON pour localstorage
//    save(){
//        localStorage.setItem("panier",JSON.stringify(this.panier));
//    }
    // ajout au panier
//    add(produit){                                       
//    let produitTrouve = this.panier.find(e =>e.id ==produit.id);         // on verifie si le produit est déja dans le panier pour ajouter produit ou modifier quantité
//        let colorTrouve = this.panier.find(f =>f.color ==produit.color);     // on fait pareil avec la couleur
//        if(produitTrouve != undefined && colorTrouve != undefined) {        // on verifie s'il n'est pas deja dans notre panier (id + couleur)
//            produit.quantity ++;                                            // si oui, on ajoute 1 en quantité
//        } else {                                                            // sinon
//            this.panier.push(produit);                                           // on ajoute au panier
//            produit.quantity =1;                                            // avec 1 en quantité                                       
//        }
//        this.save();                                                         // on sauvegarde notre panier dans localStorage
//    }
    // suppression dans le panier
//    remove(produit){
//        this.panier = this.panier.filter(p =>p.id !=produit.id)             // ici ca revient a garder tout de qui est different de produit.id
//        this.save();                                                         // on sauvegarde notre panier dans localStorage
//    }
    // modifier les quantités
//    modifyQuantities(produit, quantite){
//        let produitTrouve = this.panier.find(e =>e.id ==produit.id);            // on verifie si le produit est déja dans le panier pour ajouter produit ou modifier quantité      
//        if(produitTrouve != undefined && colorTrouve != undefined) {            // on verifie s'il est deja dans notre panier (id + couleur)
//            produitTrouve.quantite += quantite;                                 // si oui, on ajoute la quantité
//            if (produitTrouve.quantite <= 0) {                                  // si quantité égal ou inferieur a 0
//                this.remove(produitTrouve);                                  // alors on supprime le produit du panier
//            } else {                                                            // sinon
//                this.save();                                                     // on sauvegarde notre panier dans localStorage
//            }                            
//        } 
//    } 
    // prix total
//    prixTotal(){                           
//        let prix;   
//        for (let produit of this.panier) {                                   // pour chaque produit du panier
//            prix += produit.quantite * produit.prix;                    // on multiplie le prix unitaire par la quantité
//        }
//        return prix;                                                    //on retourne le prix total
//    }
//};
    


// et voici le code tant attendu