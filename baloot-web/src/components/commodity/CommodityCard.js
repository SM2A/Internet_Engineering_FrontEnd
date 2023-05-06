import "../../assets/styles/CommodityCard.css";

export default function CommodityCard({commodity}) {
    return (
        <div className="card col-md-3">
            <div className="card-body">
                <a href={"/commodities/" + commodity.id}>
                    <h2 className="card-title">{commodity.name}</h2>
                </a>
                <p className="card-text">{commodity.inStock} left in stock</p>
            </div>
            <a href={"/commodities/" + commodity.id}>
                <img className="img-fluid" src={commodity.image} alt={commodity.name}/>
            </a>
            <div className="commodity-card-footer">
                <p>{commodity.price}$</p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}