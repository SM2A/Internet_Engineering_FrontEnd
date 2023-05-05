import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../assets/styles/Provider.css";
import CommodityCard from "../components/commodity/CommodityCard";

export default function Provider() {
    const {id} = useParams();
    const [provider, setProvider] = useState({});
    const [providedCommodities, setProvidedCommodities] = useState([]);

    function doGetProvider() {
        fetch("http://localhost:8080/providers/" + id)
            .then((resp) => resp.json())
            .then((data) => setProvider(data))
    }

    function doGetProvidedCommodities() {
        fetch("http://localhost:8080/commodities/provider?id=" + id)
            .then((resp) => resp.json())
            .then((data) => setProvidedCommodities(data));
    }

    useEffect(() => {
        doGetProvider();
    }, []);

    useEffect(() => {
        doGetProvidedCommodities();
    }, []);

    return (
        <div>
            <section className="d-flex justify-content-center mt-3">
                <div className="provider-info">
                    <img src={provider.image} alt="Provider img"/>
                    <p className="text-right">Since {provider.registryDate}</p>
                    <h1 className="text-left">{provider.name}</h1>
                </div>
            </section>
            <section className="provider-commodities">
                <h3>All provided commodities</h3>
                <div className="d-flex flex-wrap">
                    {providedCommodities.map((commodity, _) => {
                        return <CommodityCard commodity={commodity}/>;
                    })}
                </div>
            </section>
        </div>
    );
}