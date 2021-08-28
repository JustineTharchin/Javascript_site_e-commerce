// Javascript pour l'affichage en liste des produits

//Définition d'une constante pour l'url de la requête GET Api
const URL = "http://localhost:3000/api/cameras/";
// initialisation d'une variable idParams qui sera utilisé pour compléter l'url produit et comme "key" pour le stockage dans le session.storage
let idParams;

//creation d'une condition pour attribuer une valeur à la variable "idParams"
const URLParams = new URLSearchParams(window.location.search);
let objectId = URLParams.get('id');
if (objectId === null) {
    idParams = "";
} else {
    idParams = objectId;
}

// promise pour la requete API avec méthode Fetch
getApiData = () => {
        return fetch((URL + idParams))
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
                apiFail = document.querySelector('.bloc2');
                apiFail.classList.add('fail__msg');
                apiFail.innerHTML = "Veuillez démarrer le serveur";
                console.error(error);
            });
};

//fonction pour l'affichage des produits en liste sur la page index.html
async function pageProduct() {
    let cameras = await getApiData();
    console.table(cameras);
}

function displayProduct(name, lenses, price, description, imageUrl, id) {

    const parent = document.getElementById("product_card");
    console.log(parent)
     // création des éléments du DOM pour l'affichage des items
     let cardElt = document.createElement('section');
     cardElt.classList.add("product_card");
     let contentElt = document.createElement('div');
     let picElt = document.createElement('img');
     let nameElt = document.createElement('h1');
     let descriptionElt = document.createElement('h2');
     let btnElt = document.createElement('button');
}

pageProduct();

//récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//enlever le ? qui se trouve avant l'id dans la console: methode 1 extraire juste l'id
const leId = queryString_url_id.slice(4);
console.log(leId);

//affichage du produit selectionné par l'id: avec fetch et en mettant la valeur de l'id à la fin de l'url
//methode .find()
const idProduitSelectionne = parent.find(element => element.id === _id);
console.log(idProduitSelectionne);