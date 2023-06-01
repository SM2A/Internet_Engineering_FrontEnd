import {useEffect, useState} from "react";
import "../../assets/styles/BuyList.css";

export function BuyListItem({item}) {
    return (
        <tr className="item-row">
            <td><img src={item.commodity.image} alt=""/></td>
            <td>{item.commodity.name}</td>
            <td>{item.commodity.categories}</td>
            <td>${item.commodity.price}</td>
            <td>{item.commodity.providerId}</td>
            <td className="yellow-color">{item.commodity.rating}</td>
            <td className="red-color">{item.commodity.inStock}</td>
            <td>
                <div className="votes-box">
                    <button className="vote voteDown" type="submit">-</button>
                    <div className="vote votes">{item.quantity}</div>
                    <button className="vote voteUp" type="submit">+</button>
                </div>
            </td>
        </tr>
    );
}

function PurchasedItem({item}) {
    return (
        <tr className="history-item-row">
            <td><img src={item.commodity.image} alt=""/></td>
            <td>{item.commodity.name}</td>
            <td>{item.commodity.categories}</td>
            <td>${item.price}</td>
            <td>{item.commodity.providerId}</td>
            <td className="yellow-color">{item.commodity.rating}</td>
            <td className="red-color">{item.commodity.inStock}</td>
            <td>{item.quantity}</td>
        </tr>
    );
}

export function BuyList({username}) {
    const [buyItems, setBuyItems] = useState([]);

    function getBuyList() {
        fetch("http://localhost:8080/api/" + username + "/buyList")
            .then((resp) => resp.json())
            .then((data) => {
                setBuyItems(data.buyItems);
                console.log(data.buyItems);
            })
    }

    useEffect(() => {
        getBuyList();
    }, []);

    return (
        <table className="table-cart">
            <tr className="title-row">
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Price</th>
                <th>Provider ID</th>
                <th>Rating</th>
                <th>In Stock</th>
                <th>In Card</th>
            </tr>
            {buyItems.map((item, _) => {
                return <BuyListItem item={item}/>
            })}
        </table>
    );
}

export function PurchasedList({username}) {
    const [purchased, setPurchased] = useState([]);

    function getPurchasedList() {
        fetch("http://localhost:8080/api/purchased?username=" + username)
            .then((resp) => resp.json())
            .then((data) => setPurchased(data));
    }

    useEffect(() => {
        getPurchasedList();
    }, []);

    return (
        <table className="history-cart">
            <tr className="title-row">
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Price</th>
                <th>Provider ID</th>
                <th>Rating</th>
                <th>In Stock</th>
                <th>Quantity</th>
            </tr>
            {purchased.map((item, _) => {
                return <PurchasedItem item={item} />
            })}
        </table>
    );

}