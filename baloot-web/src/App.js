import React from "react";
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
import MainLayout from "./layouts/MainLayout";
import ProviderLayout from "./layouts/ProviderLayout";

const notify = (message) => toast(message);

function App() {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route exact path="/login" element={<LoginPage notify={notify}/>}/>
                <Route exact path="/signup" element={<SignupPage notify={notify}/>}/>

                <Route element={<MainLayout/>}>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/commodities/:id" element={<Commodity/>}/>
                    <Route element={<ProviderLayout/>}>
                        <Route exact path="/providers/:id" element={<Provider/>}/>
                    </Route>
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
