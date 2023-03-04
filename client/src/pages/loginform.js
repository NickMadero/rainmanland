import React, { useState } from 'react';
import './login-form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/insert', { username, password })
            .then(() => {
                alert('success post');
                navigate('/rainmanland/client/src/pages/customerinfo.js');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCreateAccount = () => {
        navigate('/rainmanland/client/src/pages/signupPage.js');
    };

    return (
        <div>
            <div className="login-form-login-form">
                <form className="login-form-form" onSubmit={handleSubmit}>
                    <span className="login-form-text">login</span>
                    <span className="login-form-text1">email</span>
                    <input
                        name="username"
                        required
                        placeholder="enter email"
                        className="login-form-textinput input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="login-form-text2">
            <span>password</span>
            <br />
          </span>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="enter password"
                        className="login-form-textinput1 input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-form-button button">forgot password?</button>
                    <button type="submit" className="login-form-button1 button">
                        login
                    </button>
                    <button className="login-form-link" onClick={handleCreateAccount}>
                        create account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;

