function getCart(name, price, lenses, imageUrl, id) {

    const selectedProducts = document.querySelector(".main");
    
    let cart = [name, price, lenses, imageUrl, id];
    cart = JSON.parse(localStorage.getItem("selected_product"));

        for (let i = 0; i < localStorage.length; i++) {//obtenir toutes les clés
            
            localStorage.setItem('name', cart[0]);
            localStorage.setItem('price', cart[1]);
            localStorage.setItem('lenses', cart[2]);
            localStorage.setItem('imageURL', cart[3]);
            localStorage.setItem('id', cart[4]);
        
        cart.push();
        console.log(localStorage.getItem(localStorage.key(i)));
        }
        if(cart === null) {
            const emptyCart = `
                <main id="main">
                <div> Le panier est vide </div>
                </main>
            `;
            selectedProducts.innerHTML = emptyCart;
            
        } else {
        const selectedProductsInCart = `
        <main id="main">
        <div class="center-wrapper">
            <div class="content">
            <nav>
                <div class="icons">
                    <i class="fas fa-search"></i>
                    <i class="fas fa-shopping-bag"></i><span style="margin-left: 0.3rem;">1</span>
                </div>
            </nav>
            <div class="top-bar">
                <a href="index.html"><i class="fas fa-arrow-left"></i>
                <span>Continue shopping</span></a>
            </div>
            <div class="bag">
                <p class="bag-head"><span style="text-transform: uppercase">Votre panier</span> - x élément</p>
            </div>
            <div class="bag-product">
                <div class="image">
                    <img src="" class="product-image">
                </div>
                <div class="description">
                    <h1>${cart[0]}</h1>
                    <h2>${cart[1]/100}€</h2>
                    <div class="quantity-wrapper">
                        <div>
                            <label for="quantity" style="margin-right: 0.5rem;">Quantité:</label>
                            <select name="quantity" style="margin-bottom: 1rem;">
                                <option value disabled>Selectionner</option>
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <button class="btn-remove">Retirer</button>
                    </div>
                </div>
            </div>
            <div class="bag-total">
                <div class="total">
                    <h3>Total:</h3>
                    <h3>825.00</h3>
                </div>
                <button class="btn-go-checkout">
                    <i class="fas fa-lock"></i>
                    <a href="info_client.html"><span>Procéder au paiement</span></a>
                </button>
            </div>
        </div>
        </div>
        </main>`;
        localStorage.innerHTML = selectedProductsInCart;
        }
    }
getCart();