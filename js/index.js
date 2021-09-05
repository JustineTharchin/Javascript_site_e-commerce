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
                alert("sds");
            });
};

//fonction pour l'affichage des produits en liste sur la page index.html
async function objectsList() {
    let cameras = await getApiData();
    console.table(cameras);


    // création d'une boucle FOR OF pour l'affichage en liste des objets
    for (let camera of cameras) {
        displayProduct(camera.name, camera.imageUrl, camera._id);
    };
};

function displayProduct(name, imageUrl, id) {

    const parent = document.getElementById("products");
    console.log(parent)
     // création des éléments du DOM pour l'affichage des items
     let cardElt = document.createElement('article');
     cardElt.classList.add("product");
     let contentElt = document.createElement('div');
     let picElt = document.createElement('img');
     let nameElt = document.createElement('h3');
     let descriptionElt = document.createElement('p');
     let btnElt = document.createElement('a');

     // Récupération des données correspondantes à afficher dans les différents éléments du DOM

     picElt.src = imageUrl;
     nameElt.textContent = name;
     btnElt.textContent = "Afficher le produit";

     cardElt.appendChild(picElt);
     cardElt.appendChild(contentElt)
     contentElt.appendChild(nameElt);
     contentElt.appendChild(descriptionElt);
     contentElt.appendChild(btnElt);

     // attribution de class au éléments du DOM nouvellement créés
     cardElt.classList.add('products');
     picElt.classList.add('img');
     contentElt.classList.add('p');
     btnElt.classList.add('card__btn');

     btnElt.setAttribute('href', 'product.html?id=' + id);

     parent.append(cardElt);
}

objectsList();