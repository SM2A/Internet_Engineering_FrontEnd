import {Outlet} from "react-router-dom";
import {Header, LoggedInHeader} from "../components/header/Header";
import {useEffect, useState} from "react";

export default function MainLayout() {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function getLoggedInUser() {
        fetch("http://localhost:8080/users/loggedInUser")
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

    if (!isLoggedIn) {
        return (
            <>
                <Header/>
                <Outlet/>
            </>
        );
    } else {
        return (
            <>
                <LoggedInHeader user={user}/>
                <Outlet/>
            </>
        );
    }
}