const Url = `http://localhost:3000/api/cameras/`;

fetch(Url)
    .then((response) => response.json())
    .then((data) => {
        addCameras(data);
    })

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(price / 100);
    return price;
}

function addCameras(data) {
    for (produit of data) {
        const card = document.getElementById("liste");
        const price = convertPrice(produit.price);
        card.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
          <div class="card border bg-light shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                  <div class="row">
                      <a href="product.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                      <div class="col-6 col-sm-7 mt-3" >
                          <h5 class="card-title">${produit.name}</h5>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h5 class="card-title">${price}</h5>
                      </div>
                  </div>
                  <a href="product.html?_id=${produit._id}" class="btn btn-light" style="color: black;">Afficher le produit</a>
              </div>
          </div>
      </div>`;
    }
}
