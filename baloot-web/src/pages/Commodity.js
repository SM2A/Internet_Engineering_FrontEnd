import "../assets/styles/CommodityCard.css";
import "../assets/styles/product.css";
import "../assets/styles/product-card.css";
import "../App.css";
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CommodityCard from "../components/commodity/CommodityCard";
import CommentCard from "../components/Comment/CommentCard";

const Commodity = () => {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [provider, setProvider] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [comments, setComments] = useState([]);
    let token = localStorage.getItem("token")

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:8080/api/commodities/${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const data = await response.json();
            setProduct(data);
            for (let i = 0; i < data.categories.length; i++) {
                let category = document.createElement('li');
                category.className = "product-category";
                category.innerHTML = data.categories[i];
                document.getElementById('category-container').appendChild(category);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product.providerId) {
            const fetchProvider = async () => {
                const response = await fetch(`http://localhost:8080/api/providers/${product.providerId}`, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                const data = await response.json();
                setProvider(data);
            };
            fetchProvider();
        }
    }, [product]);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            const response = await fetch(`http://localhost:8080/api/commodities/suggestions/${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const data = await response.json();
            setSimilarProducts(data);
            data.map((commodity, _) => {
                return <CommodityCard commodity={commodity}/>;
            })
        };
        fetchSimilarProducts();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`http://localhost:8080/api/comments?commodityId=${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const data = await response.json();
            setComments(data);
        };
        fetchComments();
    }, [id]);

    const handleAddToCart = async (productId) => {
        await fetch(`http://localhost:8080/addToBuyList/api/username/${productId}`,{
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`}
        });
    };

    return (
        <div className="content">
            <div id="product-detail">
                <div id="product-img-container">
                    <img src={product.image} alt="Product image" id="product-img"/>
                </div>
                <div id="product-info-container">
                    <h1 id="product-title">{product.name}</h1>
                    <div id="product-stock-rating">
                        <p id="product-stock">{product.inStock} left in stock</p>
                        <div id="product-rate-info">
                            <img src={require("../assets/images/star.png")} alt="Star rating" id="rate-star"/>
                            <label id="product-rating">{product.rating}</label>
                            <label id="product-rate-count">({product.rateCount})</label>
                        </div>
                    </div>
                    <p id="product-provider">by <a id="provider-name"
                                                   href={"/providers/" + provider.id}>{provider.name}</a></p>
                    <p id="category-label">Category(s)</p>
                    <div id="product-category-container">
                        <ul id="category-container"></ul>
                    </div>
                    <div id="buy-product-container">
                        <h2 id="product-price">{product.price}$</h2>
                        <button type="button" className="btn product-add-to-cart" id="product-add-to-cart"
                                onClick={() => handleAddToCart(product.id)}>add to cart
                        </button>
                    </div>
                    <div id="product-rate-action-container">
                        <div>
                            <p id="rate-label">rate now</p>
                            <div>
                                <div className="rating">
                                    <input type="radio" name="rating" value="10" id="10"/>
                                    <label htmlFor="10"></label>
                                    <input type="radio" name="rating" value="9" id="9"/>
                                    <label htmlFor="9"></label>
                                    <input type="radio" name="rating" value="8" id="8"/>
                                    <label htmlFor="8"></label>
                                    <input type="radio" name="rating" value="7" id="7"/>
                                    <label htmlFor="7"></label>
                                    <input type="radio" name="rating" value="6" id="6"/>
                                    <label htmlFor="6"></label>
                                    <input type="radio" name="rating" value="5" id="5"/>
                                    <label htmlFor="5"></label>
                                    <input type="radio" name="rating" value="4" id="4"/>
                                    <label htmlFor="4"></label>
                                    <input type="radio" name="rating" value="3" id="3"/>
                                    <label htmlFor="3"></label>
                                    <input type="radio" name="rating" value="2" id="2"/>
                                    <label htmlFor="2"></label>
                                    <input type="radio" name="rating" value="1" id="1"/>
                                    <label htmlFor="1"></label>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="action-btn">submit</button>
                    </div>
                </div>
            </div>
            <div id="comment-container">
                <div>
                    <label id="comment-label">Comments</label>
                    <label id="comment-count">({comments.length})</label>
                </div>
                {
                    comments.map((comment, _) => {
                        return <CommentCard comment={comment}/>;
                    })
                }
                <div id="submit-comment-container">
                    <label>Submit your opinion</label>
                    <div id="write-comment">
                        <textarea></textarea>
                        <button type="button" className="action-btn">Post</button>
                    </div>
                </div>
            </div>
            <div>
                <h3 id="similar-products-label">You might also like</h3>
                <div id="similar-products">{
                    similarProducts.map((commodity, _) => {
                        return <CommodityCard commodity={commodity}/>;
                    })
                }</div>
            </div>
        </div>
    );
};

export default Commodity;
