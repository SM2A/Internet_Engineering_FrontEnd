import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import LoginPage from "./pages/Login";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import Commodity from "./pages/Commodity";
import Provider from "./pages/Provider";
import ProviderLayout from "./layouts/ProviderLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

const notify = (message) => toast(message);

function App() {
    const [user, setUser] = useState(null);

    function doGetLoggedInUser() {
        fetch("http://localhost:8080/users/loggedInUser")
            .then((resp) => resp.json())
            .then((data) => setUser(data));
    }

    useEffect(() => {
        doGetLoggedInUser();
    }, []);

    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route exact path="/login" element={<LoginPage notify={notify}/>}/>
                <Route exact path="/signup" element={<SignupPage notify={notify}/>}/>

                <Route element={<MainLayout user={user}/>}>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/commodities/:id" element={<ProtectedRoute user={user}>
                        <Commodity/>
                    </ProtectedRoute>
                    }/>
                    <Route element={<ProtectedRoute user={user}>
                        <ProviderLayout user={user}/>
                    </ProtectedRoute>
                    }>
                        <Route exact path="/providers/:id" element={<ProtectedRoute user={user}>
                            <Provider/>
                        </ProtectedRoute>
                        }/>
                    </Route>
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
