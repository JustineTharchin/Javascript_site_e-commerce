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
            .then(result => {
				console.log(result);
				displayProduct(result.name, result.price, result.description, result.imageUrl, result.lenses, result._id);
			})
            .catch(error => {
                // en cas d'erreur de chargement de l'API affichage d'un message sur l'écran de l'utilisateur + message d'erreur dans la console
                apiFail = document.querySelector('.bloc2');
                console.error(error);
            });
};

function displayProduct(name, price, description, imageUrl, lenses, id) {

	//récupération de la chaîne de requête dans l'url
	const queryString_url_id = window.location.search;
	console.log(queryString_url_id);

	const reccupId = queryString_url_id.slice(4);

	const idProduitSelectionne = parent.find(element => element._id === id);
	console.log(idProduitSelectionne);
	const positionElt = document.querySelector(".product_card");

	const lensString = document.querySelector(".options");
		for(var i = 0; i <lenses.length; i++) {
		console.log(lenses[i]);
		}
	

    const pageCamera = `
	<section class="product_card" id="product_card">
	<h1>${name}</h1>
			<img src="${imageUrl}" class="product__image" style="width: 500px;">
		<div class="product__description">
			<h2>${price/100} €</h2>
			<p>${description}</p>
		</div>
			<div class="quantity-wrapper">
					<label for="options" style="margin-right: 0.5rem;">Lenses:</label>
					<select id="options" style="margin-bottom: 1rem;">
					<option value disabled>Lentilles</option>
						<option value="1" selected>${lenses[0]}</option>
						<option value="2">${lenses[1]}</option>
						<option value="2">${lenses[2]}</option>
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

getApiData();












//const btnCart = document.querySelector(".btn-go-checkout");
//console.log(btnCart);

//btnCart.addEventListener("click", (event)=>{
	//event.preventDefault();

//const idOption = document.querySelector("#option");

//const choiceOption = idOption.lenses;
//console.log(choiceOption);

//reccuperation des valeurs

//let optionsProduct = {
	//options : choiceOption
//}

//console.log(optionsProduct);
//});
