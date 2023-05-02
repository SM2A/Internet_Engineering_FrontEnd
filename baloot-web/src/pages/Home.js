import {useEffect, useRef, useState} from "react";
import "../assets/styles/Home.css";
import CommodityCard from "../components/commodity/CommodityCard";

export default function Home() {
    const [showAvailableCommodities, setShowAvailableCommodities] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const availableCommoditiesToggle = useRef(null);
    const [commodities, setCommodities] = useState([]);

    function sortByName() {
        setSortBy("name");
        console.log("name");
    }

    function sortByPrice() {
        setSortBy("price");
        console.log("price");
    }

    function handleShowAvailableCommodities() {
        setShowAvailableCommodities(!showAvailableCommodities);
    }

    function deGetCommodities() {
        fetch("http://localhost:8080/commodities")
            .then((resp) => resp.json())
            .then((data) => setCommodities(data));
    }

    function sortCommodities() {
        let sorted = commodities;
        if (sortBy === "name") {
            sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "price") {
            sorted = sorted.sort((a, b) => b.price - a.price);
        }
        return showAvailableCommodities
            ? sorted.filter((c) => c.inStock > 0)
            : sorted;
    }

    useEffect(() => {
        availableCommoditiesToggle.current.checked = true;
    }, []);

    useEffect(() => {
        deGetCommodities();
    }, [commodities]);

    const currentCommodities = sortCommodities();
    return (
        <main className="commodities">
            <section className="filter-container">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="filter-label">Available commodities </h2>
                    <label className="toggle">
                        <input className="toggle-checkbox"
                               type="checkbox"
                               ref={availableCommoditiesToggle}
                               onClick={handleShowAvailableCommodities}
                        />
                        <div className="toggle-switch"></div>
                    </label>
                </div>
                <div className="sort-options">
                    <label className="filter-label">sort by: </label>
                    <button className="sort-button" onClick={sortByName}>Name</button>
                    <button className="sort-button" onClick={sortByPrice}>Price</button>
                </div>
            </section>
            <section className="commodities-list">
                {currentCommodities.map((commodity, index) => {
                    return <CommodityCard commodity={commodity}/>;
                })}
            </section>
        </main>
    );
}