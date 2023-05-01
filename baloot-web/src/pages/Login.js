import React, {useState} from 'react';
import BalootLogo from '../components/BalootLogo';
import {useNavigate} from "react-router-dom";

import "../assets/styles/signing.css"

function LoginForm({notify}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8080/users/login', {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({"username": username, "password": password})
        }).then((response) => {
            if (response.ok) {
                notify("Login Successful!")
                navigate("/")
            } else {
                notify("Wrong username or password!")
                navigate("/login")
            }
            return response.json();
        });
        console.log('A name was submitted: ' + response.body);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <label className="form-label">Username</label>
                <input className="form-control"
                       id="username"
                       name="username"
                       type="text"
                       value={username}
                       onChange={handleUsernameChange}
                       placeholder="Enter username"
                       required
                />
            </div>
            <div className="form-group mb-4">
                <label className="form-label">Password</label>
                <input className="form-control"
                       id="password"
                       name="password"
                       type="password"
                       value={password}
                       onChange={handlePasswordChange}
                       placeholder="Enter password"
                       required
                />
            </div>
            <button className="btn btn-primary btn-block mb-4" type="submit">
                Login
            </button>
            <div>
                Not registered? <a href="/signup" className="text-info">Sign up</a>
            </div>
        </form>
    );
}

function LoginPage({notify}) {
    return (
        <section className="text-center text-lg-start">
            <div className="container py-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card shadow-lg">
                            <div className="card-body cardbody-color p-5 shadow-5 text-center">
                                <BalootLogo text="Sign in now"/>
                                <LoginForm notify={notify}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;