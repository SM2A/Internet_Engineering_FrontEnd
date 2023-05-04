import {ProviderPageHeader} from "../components/header/Header";
import {Outlet} from "react-router-dom";

export default function ProviderLayout({user}) {
        return (
            <>
                <ProviderPageHeader user={user}/>
                <Outlet/>
            </>
        );
}