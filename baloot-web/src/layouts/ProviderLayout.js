import {ProviderPageHeader} from "../components/header/Header";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ProviderLayout() {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function getLoggedInUser() {
        fetch("http://localhost:8080/api/users/loggedInUser")
            .then((resp) => {
                if (resp.ok) {
                    setIsLoggedIn(true);
                }
                return resp.json();
            })
            .then((data) => setUser(data));
    }

    useEffect(() => {
        getLoggedInUser();
    }, []);
    return (
        <>
            <ProviderPageHeader user={user}/>
            <Outlet/>
        </>
    );
}