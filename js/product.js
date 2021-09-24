const Url = `http://localhost:3000/api/cameras/`;
const cart = JSON.parse(localStorage.getItem("cameras")) || [];

class Camera {
    constructor(id, name, description, price, option, quantity, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.option = option;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }
}

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR",}).format(price / 100);
    return price;
}

const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");

const newUrl = `http://localhost:3000/api/cameras/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCamera(data);

        function addCamera(product) {
            const selectCameraImage = document.getElementById("productImage");
            selectCameraImage.innerHTML += 
            `<img src="${product.imageUrl}" class="img-fluid img-thumbnail">`;

            const selectCameraName = document.getElementById("productName");
            selectCameraName.innerHTML += 
            `<h5 class="card-title">${product.name}</h5>`;

            const selectCameraPrice = document.getElementById("productPrice");
            selectCameraPrice.innerHTML += 
            `<h5 class="card-title">${convertPrice(product.price)}</h5>`;

            const selectCameraDescription = document.getElementById("productDescription");
            selectCameraDescription.innerHTML += 
            `<p class="card-text">${product.description}</p>`;

            const optionChoice = document.getElementById("option");
            for (let lenses of product.lenses) {
                optionChoice.innerHTML += `<option value="${lenses}">${lenses}</option>`;
            }
        }

        const btnAddToCart = document.getElementById("btnAddToCart");
        btnAddToCart.addEventListener("click", (event) => { event.preventDefault();

        const option = document.getElementById("option");
        const quantity = document.getElementById("quantity");

            let objectCamera = new Camera(
                newId,
                product.name,
                product.description,
                product.price,
                option.value,
                Number(quantity.value),
                product.imageUrl
            );

            const idx = cart.findIndex((camera) => camera.id ===  newId);
                console.log(idx)
                
            if(idx === -1){
                cart.push(objectCamera);
            }else {
                cart[idx].quantity = cart[idx].quantity + objectCamera.quantity;
            }
                
                
                
                localStorage.setItem("cameras", JSON.stringify(cart));
            // }
        });
    });