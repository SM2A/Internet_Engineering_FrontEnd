import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import BalootLogo from "../components/BalootLogo";

function SignupForm({notify}) {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleBirthdateChange(event) {
        setBirthdate(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password || !username || !name) {
            notify("Error: fields cannot be empty")
            return
        }
        const response = await fetch('http://127.0.0.1:8080/users/signup', {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({
                "name": name,
                "birthdate": birthdate,
                "address": address,
                "email": email,
                "username": username,
                "password": password
            })
        }).then((response) => {
            if (response.ok) {
                notify("signup Successful! Now try to login...")
                navigate("/login")
            } else {
                notify("username is already taken!")
                navigate("/signup")
            }
            return response.json();
        });
        console.log('Signed user: ' + response.body);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input className="form-control"
                               id="name"
                               name="name"
                               type="text"
                               value={name}
                               onChange={handleNameChange}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-group">
                        <label className="form-label">Birth date</label>
                        <input className="form-control"
                               id="birthdate"
                               name="birthdate"
                               type="date"
                               value={birthdate}
                               onChange={handleBirthdateChange}
                        />
                    </div>
                </div>
            </div>
            <div className="form-group mb-4">
                <label className="form-label">Address</label>
                <input className="form-control"
                       id="address"
                       name="address"
                       type="text"
                       value={address}
                       onChange={handleAddressChange}
                />
            </div>
            <div className="form-group mb-4">
                <label className="form-label">Email</label>
                <input className="form-control"
                       id="email"
                       name="email"
                       type="email"
                       value={email}
                       onChange={handleEmailChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Username</label>
                <input className="form-control"
                       id="username"
                       name="username"
                       type="text"
                       value={username}
                       onChange={handleUsernameChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-control"
                       id="password"
                       name="password"
                       type="password"
                       value={password}
                       onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign up
            </button>
            <div>
                Already have an account? <a href="/login" className="text-info">Login</a>
            </div>
        </form>
    );
}

function SignupPage({notify}) {
    return (
        <section className="text-center text-lg-start">
            <div className="container py-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card shadow-lg">
                            <div className="card-body cardbody-color p-5 shadow-5 text-center">
                                <BalootLogo text="Sign up now"/>
                                <SignupForm notify={notify}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignupPage;