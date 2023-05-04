import "../../assets/styles/header/SearchBar.css";

export default function SearchBar() {
    return (
        <div className="header__search">
            <select className="header__search__options">
                <option value="name">name</option>
                <option value="price">category</option>
                <option value="provider">provider</option>
            </select>
            <input type="text" className="header__search__input" placeholder="search your product ..."/>
            <div className="header__search__magnifier">
                <img src={require("../../assets/images/search.png")} alt=""/>
            </div>
        </div>
    );
}