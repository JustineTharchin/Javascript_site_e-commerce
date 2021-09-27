const cart = JSON.parse(localStorage.getItem("cameras")) || [];
const order = JSON.parse(localStorage.getItem("order")) || [];

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {style: "currency",currency: "EUR",}).format(price / 100);
    return price;
}

function totalCart() {
    let totalCart = 0;
    cart.forEach((camera) => {
        totalCart = totalCart + camera.price * camera.quantity;
        
    });
    return totalCart;
}

const informations = document.getElementById("contact");
informations.innerHTML += `
    <p class="fs-5 fs-5 text-center">Merci ${order.contact.firstName} pour votre commande chez Orinoco !</p>
    <p class="fs-5 fs-5 text-center"> Votre commande a bien été validée.</p>
    <p class="fs-5 fs-5 text-center">Référence: <span class="fw-bold">${order.orderId}</span></p>
    <p class="fs-5 fs-5 text-center">Vous recevrez votre facture par mail à : <span class="fw-bold">${order.contact.email}</span></p>
    <p class="fs-5 fs-5 text-center">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}, ${order.contact.city}</p>
    </div>`;

for (product of cart) {
    const indexProduct = cart.indexOf(product);
    const productList = document.getElementById("productsInCart");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imageUrl}" class="img-fluid img-thumbnail">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
        </td>
        <td class="align-middle">
            <span>${convertPrice(product.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(product.quantity * product.price)}</span>
        </td>
    </tr>`;
}

function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${convertPrice(totalCart())}`;
}

totalPrice();

const print = document.getElementById("print");
print.addEventListener("click", (e) => {
    e.preventDefault;
    window.print();
});

const clickCart = document.getElementById("cartPreview");
clickCart.addEventListener("click", () => {
    clearCart();
});
