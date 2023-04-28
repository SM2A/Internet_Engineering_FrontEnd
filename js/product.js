const COMMODITY_PATH = "http://localhost:8080/commodities/";
const COMMODITY_SUGGESTION_PATH = "http://localhost:8080/commodities/suggestions/";
const ADD_TO_CART_PATH = "http://localhost:8080/addToBuyList/";
const PROVIDER_PATH = "http://localhost:8080/providers/";
const COMMENT_PATH = "http://localhost:8080/comments";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const productName = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productStock = document.getElementById('product-stock');
const productRating = document.getElementById('product-rating');
const productImage = document.getElementById('product-img');
const categoryContainer = document.getElementById('category-container');
const providerName = document.getElementById('provider-name');
const commentsCount = document.getElementById('comment-count');

fetch(COMMODITY_PATH + id)
    .then(response => response.json())
    .then(data => {
        productName.textContent = data.name;
        productPrice.textContent = `${data.price}$`;
        productStock.textContent = `${data.inStock} left in stock`;
        productRating.textContent = data.rating;
        productImage.src = data.imageUrl;
        for (let i = 0; i < data.categories.length; i++) {
            let category = document.createElement('li');
            category.className = "product-category";
            category.innerHTML = data.categories[i];
            categoryContainer.appendChild(category);
        }
        fetch(PROVIDER_PATH + data.providerId)
            .then(response => response.json())
            .then(provider => {
                providerName.textContent = provider.name;
            })
            .catch(e => console.error(e));
    })
    .catch(error => console.error(error));


function getRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
}

function getComments() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", COMMENT_PATH + "?commodityId="+3, false);
    xhr.send(null);
    return JSON.parse(xhr.responseText);
}

document.addEventListener('DOMContentLoaded', () => {

    const response = getRequest(COMMODITY_SUGGESTION_PATH + id);

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
        productImage.src = response[i].imageUrl;

        let productPrice = document.createElement('h4');
        productPrice.className = "product-price";
        productPrice.innerHTML = response[i].price + "$";

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

        document.getElementById("similar-products").appendChild(productCard);
    }

    const comments = getComments();
    commentsCount.textContent = `(${comments.length})`;

    for (let i = 0; i < comments.length; i++) {


        /*<div className="comment-card">
            <h3 className="comment-msg">This was awesome!!!</h3>
            <div className="comment-user-date">
                <p>2023-03-20</p>
                <p>&#x2022;</p>
                <p>#username</p>
            </div>
            <div className="comment-rating-container">
                <p>Is this comment helpful?</p>
                <p>1</p>
                <img src="../assets/thumbs-up.png" alt="Thumbs up">
                    <p>1</p>
                    <img src="../assets/thumbs-down.png" alt="Thumbs Down">
            </div>
        </div>*/



        let comment = document.createElement('div');
        productCard.className = "product-card";


        document.getElementById("comment-container").insertBefore(productCard, document.getElementById("submit-comment-container"));
    }

});
