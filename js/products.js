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

pageProduct();

function displayProduct(name, price, description, imageUrl, id) {

	//récupération de la chaîne de requête dans l'url
	const queryString_url_id = window.location.search;
	console.log(queryString_url_id);

	//enlever le ? qui se trouve avant l'id dans la console: methode 1 extraire juste l'id
	const reccupId = queryString_url_id.slice(4);

	//affichage du produit selectionné par l'id: avec fetch et en mettant la valeur de l'id à la fin de l'url
//methode .find()
	const idProduitSelectionne = parent.find(element => element._id === id);
	console.log(idProduitSelectionne);
	const positionElt = document.querySelector(".product_card");

    const pageCamera = `
	<section class="product_card" id="product_card">
	<h1>${idProduitSelectionne.name}</h1>
			<img src="${idProduitSelectionne.imageUrl}" class="product__image" style="width: 500px;">
		<div class="product__description">
			<h2>${idProduitSelectionne.price} €</h2>
			<p>${idProduitSelectionne.description}</p>
		</div>
			<div class="quantity-wrapper">
					<label for="option" style="margin-right: 0.5rem;">Lenses:</label>
					<select name="option" style="margin-bottom: 1rem;">
						<option value disabled>Options<h1>${idProduitSelectionne.lenses}</h1></option>
						<option value="1" selected>1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
			</div>
				<button class="btn-go-checkout">
					<i class="fas fa-shopping-cart"></i>
					<span>Ajouter au panier</span>
				</button>
			</div>
		</div>
	</div>
</section> `;
positionElt.innerHTML = pageCamera;
}

displayProduct();