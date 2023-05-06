import "../../assets/styles/header/Header.css"
import SearchBar from "./SearchBar";
import HeaderLogo from "./HeaderLogo";
import LoginSection from "./LoginSection";
import UserInfo from "./UserInfo";

export function Header() {
    return (
        <header className="header">
            <HeaderLogo/>
            <SearchBar/>
            <LoginSection/>
        </header>
    );
}

export function LoggedInHeader({user}) {
    return (
        <header className="header">
            <HeaderLogo/>
            <SearchBar/>
            <UserInfo user={user}/>
        </header>
    );
}

export function ProviderPageHeader({user}) {
    return (
        <header className="header">
            <HeaderLogo/>
            <div className="w-50">
                <UserInfo user={user}/>
            </div>
        </header>
    )
}