import "../../assets/styles/CommodityCard.css";

export default function CommodityCard({commodity}) {
    return (
        <div className="commodity-card">
            <div className="commodity-card-header">
                <h2>{commodity.name}</h2>
                <p>{commodity.inStock} left in stock</p>
            </div>
            {/*todo: replace this with commodity.imageUrl*/}
            <img src={require("../../assets/images/phone.png")} alt={commodity.name}/>
            <div className="commodity-card-footer">
                <p>{commodity.price}$</p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}