import "../../assets/styles/CommodityCard.css";

export default function CommodityCard({commodity}) {
    return (
        <div className="card col-md-3">
            <div className="card-body">
                <h2 className="card-title">{commodity.name}</h2>
                <p className="card-text">{commodity.inStock} left in stock</p>
            </div>
            {/*todo: replace this with commodity.imageUrl*/}
            <img className="img-fluid" src={require("../../assets/images/phone.png")} alt={commodity.name}/>
            <div className="commodity-card-footer">
                <p>{commodity.price}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}