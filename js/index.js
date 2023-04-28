const COMMODITIES_PATH = "http://localhost:8080/commodities";
const ADD_TO_CART_PATH = "http://localhost:8080/commodities";

function getRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
}

document.addEventListener('DOMContentLoaded', () => {

    const response = getRequest(COMMODITIES_PATH);

    for (let i = 0; i < response.length; i++) {

        let productTitle = document.createElement('h3');
        productTitle.className = "product-title";
        productTitle.innerHTML = response[i].name;

        let stockCount = document.createElement('p');
        stockCount.className = "product-stock";
        stockCount.innerHTML = response[i].inStock + " left in stock";

        let cardHeader = document.createElement('div');
        cardHeader.className = "card-header";
        cardHeader.appendChild(productTitle);
        cardHeader.appendChild(stockCount);

        let productImage = document.createElement('img');
        productImage.className = "product-img";
        productImage.src = response[i].image;

        let productPrice = document.createElement('h4');
        productPrice.className = "product-price";
        productPrice.innerHTML = "$ " + response[i].price;

        let addToCart = document.createElement('button');
        addToCart.className = "btn product-add-to-cart";
        addToCart.innerHTML = "add to cart";
        addToCart.type = "button";
        addToCart.onclick = function () {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", ADD_TO_CART_PATH + "username" + "/" + response[i].id, false); // TODO: change username
            xhr.send(null);
        }

        let cardFooter = document.createElement('div');
        cardFooter.className = "card-footer";
        cardFooter.appendChild(productPrice);
        cardFooter.appendChild(addToCart);

        let productCard = document.createElement('div');
        productCard.className = "product-card";
        productCard.appendChild(cardHeader);
        productCard.appendChild(productImage);
        productCard.appendChild(cardFooter);

        let url = new URL("http://localhost:3000/static/product.html");
        url.searchParams.append("id", response[i].id);
        let value = "window.location=" + "'" + url + "'";

        productTitle.setAttribute("onclick", value);
        productImage.setAttribute("onclick", value);

        document.getElementById("products-container").appendChild(productCard);
    }

});
