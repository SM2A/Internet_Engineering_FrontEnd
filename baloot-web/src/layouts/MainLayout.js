import {Outlet} from "react-router-dom";
import {Header, LoggedInHeader} from "../components/header/Header";

export default function MainLayout({user}) {
    if (user == null) {
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