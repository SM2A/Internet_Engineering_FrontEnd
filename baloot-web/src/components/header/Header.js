import "../../assets/styles/header/Header.css"
import SearchBar from "./SearchBar";
import HeaderLogo from "./HeaderLogo";
import LoginSection from "./LoginSection";
import UserInfo from "./UserInfo";
import {useEffect, useState} from "react";

export function Header() {
    return (
        <header className="header">
            <HeaderLogo/>
            <SearchBar/>
            <LoginSection/>
        </header>
    );
}

export function ProviderPageHeader() {
    const [user, setUser] = useState({});

    function doGetLoggedInUser() {
        fetch("http://localhost:8080/users/loggedInUser")
            .then((resp) => resp.json())
            .then((data) => setUser(data));
    }

    useEffect(() => {
        doGetLoggedInUser();
    }, []);

    return (
        <header className="header">
            <HeaderLogo/>
            <UserInfo user={user}/>
        </header>
    )
}