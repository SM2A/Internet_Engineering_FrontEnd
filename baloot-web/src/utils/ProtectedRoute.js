import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute({user, redirectPath = "/", children}) {
    if (user == null) {
        return <Navigate to={redirectPath} replace/>;
    }
    return (
        children ? children : <Outlet/>
    );
}