import "../assets/styles/Header.css"

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="/">
                    <img className="header__logo__image" src={process.env.PUBLIC_URL + '/logo.png'} alt="Baloot"/>
                </a>
                <a href="/">
                    <div className="header__logo__text text text--xlarge">Baloot</div>
                </a>
            </div>
            <div className="header__search">
                <select className="header__search__options">
                    <option value="name">name</option>
                    <option value="price">category</option>
                    <option value="provider">provider</option>
                </select>
                <input type="text" className="header__search__input" placeholder="search your product ..."/>
                <div className="header__search__magnifier">
                    <img src={require("../assets/images/search.png")} alt=""/>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <a href="/login">
                    <button type="button" className="btn  login-section btn-info mr-3">Login</button>
                </a>
                <a href="/signup">
                    <button type="button" className="btn  login-section btn-info">Register</button>
                </a>
            </div>
        </header>
    );
}