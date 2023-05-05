import {useEffect, useState} from "react";
import "../assets/styles/User.css";
import {useParams} from "react-router-dom";
import {BuyList, PurchasedList} from "../components/user/BuyList";

export default function User({notify}) {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [addCredit, setAddCredit] = useState('');

    function handleNewCredit(event) {
        setAddCredit(event.target.value);
    }

    async function handleAddCredit(event) {
        event.preventDefault();
        await fetch("http://localhost:8080/users/" + id + "/credit?credit=" + addCredit, {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow'
        }).then((resp) => {
            if (resp.ok)
                notify("credit increased successfully");
            else
                notify(resp.error);
            return resp.json()
        })
    }

    async function handlePay(event) {
        event.preventDefault();
        await fetch("http://localhost:8080/buyList/pay?username=" + id, {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow'
        }).then((resp) => {
            if (resp.ok)
                notify("Buy list purchased successfully");
            else
                notify(resp.error);
            return resp.json();
        })
    }

    function getLoggedInUser() {
        fetch("http://localhost:8080/users/loggedInUser")
            .then((resp) => resp.json())
            .then((data) => setUser(data));
    }

    useEffect(() => {
        getLoggedInUser();
    }, [addCredit]);

    return (
        <div className="p-5">
            <div className="user-information">
                <div className="user-data">
                    <div className="user-pic first-row">
                        <img src={require("../assets/images/avatar.png")} alt=""/>
                        <div>{user.username}</div>
                    </div>

                    <div className="user-pic">
                        <img src={require("../assets/images/mail.png")} alt=""/>
                        <div>{user.email}</div>
                    </div>

                    <div className="user-pic">
                        <img src={require("../assets/images/calendar.png")} alt=""/>
                        <div>{user.birthDate}</div>
                    </div>

                    <div className="user-pic">
                        <img src={require("../assets/images/location.png")} alt=""/>
                        <div>{user.address}</div>
                    </div>
                </div>
                <form className="add-user-credit" onSubmit={handleAddCredit}>
                    <div className="user-amount">$ {user.credit}</div>
                    <input className="add-amount"
                           type="text"
                           name="credit"
                           value={addCredit}
                           onChange={handleNewCredit}
                           placeholder="$ Amount"
                    />
                    <button className="add-more-credit" type="submit">add more credit</button>
                </form>
            </div>

            <div className="table-title">
                <img src={require("../assets/images/cart.png")} alt=""/>
                <div>Cart</div>
            </div>

            <BuyList username={id} />

            <button className="pay-now" onClick={handlePay}>Pay now!</button>

            <div className="table-history-title">
                <img src={require("../assets/images/history.png")} alt=""/>
                <div>History</div>
            </div>

            <PurchasedList username={id} />

        </div>
    );
}