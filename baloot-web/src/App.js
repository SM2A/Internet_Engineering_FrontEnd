import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './App.css';
import LoginPage from "./pages/Login";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Commodity from "./pages/Commodity";
import Provider from "./pages/Provider";

const notify = (message) => toast(message);

function App() {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/commodities/:id" element={<Commodity/>}/>
                    <Route exact path="/providers/:id" element={<Provider/>}/>
                </Route>
                <Route exact path="/login" element={<LoginPage notify={notify}/>}/>
                <Route exact path="/signup" element={<SignupPage notify={notify}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
