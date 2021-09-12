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

	let lensString = "";

		for(var i = 0; i < lenses.length; i++) {
		console.log(lenses[i]);
		 lensString = lensString +  `<option value="${i}" selected>${lenses[i]}</option>`;
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
					${lensString}
					</select>
			</div>
				<button class="btn-go-checkout" type="submit">
					<i class="fas fa-shopping-cart"></i>
					<span>Ajouter au panier</span>
				</button>
			</div>
		</div>
	</div>
</section> `;
positionElt.innerHTML = pageCamera;

//selection button dans le DOM
const sentCart = document.querySelector(".btn-go-checkout");

//ecoute du button et envoie dans cart
sentCart.addEventListener("click", (event) => {
	event.preventDefault();

	//ajout dans le panier. Aller dans le localstorage et verifier s'il y a quelquechose: key="produits"
	let cart = JSON.parse(localStorage.getItem("selected_product"));
	//transformer fichier JSON en fichier javascript

	//fonction cartConfirmation
	//const cartConfirmation = () =>{
		//if(window.confirm(`${name}a bien été ajouté au panier`)) {
		//	window.location.href = "cart.html";
		//}else {
		//	window.location.href = "index.html";
		//}
	//}

	//cas ou il y a une clé dans le localstorage
	if(cart){
		cart.push(name, price, lenses, imageUrl, id);
		localStorage.setItem("selected_product", JSON.stringify(cart));
		console.log(cart);
		//cartConfirmation();
	}
	//cas ou il n'y a pas de clés dans le localstorage
	else{
		cart = [];
		cart.push(name, price, lenses, imageUrl, id);
		localStorage.setItem("selected_product", JSON.stringify(cart));
		console.log(cart);
		//cartConfirmation();
	}
});
}
getApiData();
let cart = [];
let singleProduct = {
	name: cart[0],
    price: cart[1],
    lenses: cart[2],
	imageUrl: cart[3],
    id: cart[4],
  };
  cart.push(singleProduct);
  localStorage.setItem('selected_product', JSON.stringify(cart));


