import {useEffect, useRef, useState} from "react";
import "../assets/styles/Home.css";
import CommodityCard from "../components/commodity/CommodityCard";
import {Pagination} from "@mui/material";

export default function Home() {
    const [showAvailableCommodities, setShowAvailableCommodities] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const availableCommoditiesToggle = useRef(null);
    const [commodities, setCommodities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [commodityPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(1);

    function sortByName() {
        setSortBy("name");
    }

    function sortByPrice() {
        setSortBy("price");
    }

    function handleShowAvailableCommodities() {
        setShowAvailableCommodities(!showAvailableCommodities);
    }

    function handlePageChange(event, value) {
        setCurrentPage(value);
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
        setTotalPages(Math.ceil(commodities.length / commodityPerPage));
    }, []);

    const lastCommodityIndex = currentPage * commodityPerPage;
    const firstCommodityIndex = lastCommodityIndex - commodityPerPage;
    const currentCommodities = sortCommodities().slice(firstCommodityIndex, lastCommodityIndex);

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
                {currentCommodities.map((commodity, _) => {
                    return <CommodityCard commodity={commodity}/>;
                })}
            </section>
            <div className="pagination">
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}>
                </Pagination>
            </div>
        </main>
    );
}