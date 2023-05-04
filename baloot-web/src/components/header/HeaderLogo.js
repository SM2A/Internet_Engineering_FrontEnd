import "../../assets/styles/header/HeaderLogo.css";

export default function HeaderLogo() {
    return (
        <div className="header__logo">
            <a href="/Users/Morteza Nouri/IdeaProjects/IE-Front/baloot-web/src/pages">
                <img className="header__logo__image" src={process.env.PUBLIC_URL + '/logo.png'} alt="Baloot"/>
            </a>
            <a href="/Users/Morteza Nouri/IdeaProjects/IE-Front/baloot-web/src/pages">
                <div className="header__logo__text text text--xlarge">Baloot</div>
            </a>
        </div>
    );
}