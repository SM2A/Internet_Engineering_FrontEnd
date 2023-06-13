import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import LoginPage from "./pages/Login";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import Commodity from "./pages/Commodity";
import Provider from "./pages/Provider";
import MainLayout from "./layouts/MainLayout";
import ProviderLayout from "./layouts/ProviderLayout";
import User from "./pages/User";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";

const notify = (message) => toast(message);

let token = localStorage.getItem("token")

function App() {
    if (token !== null) {
        return (
            <BrowserRouter>
                <ToastContainer/>
                <Routes>
                    <Route exact path="/login" element={<Navigate  to="/" />}/>
                    <Route exact path="/signup" element={<Navigate  to="/" />}/>
                    <Route element={<MainLayout/>}>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/commodities/:id" element={<Commodity/>}/>
                    </Route>
                    <Route element={<ProviderLayout/>}>
                        <Route exact path="/providers/:id" element={<Provider/>}/>
                        <Route exact path="/users/:id" element={<User notify={notify}/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <ToastContainer/>
                <Routes>
                    <Route exact path="/login" element={<LoginPage notify={notify}/>}/>
                    <Route exact path="/signup" element={<SignupPage notify={notify}/>}/>
                    <Route exact path="/" element={<Navigate  to="/login" />}/>
                    <Route exact path="/commodities/:id" element={<Navigate  to="/login" />}/>
                    <Route exact path="/providers/:id" element={<Navigate  to="/login" />}/>
                    <Route exact path="/users/:id" element={<Navigate  to="/login" />}/>
                    <Route exact path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        );

    }
}

export default App;
