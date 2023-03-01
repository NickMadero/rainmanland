import React, { Component } from 'react';
import './login-form.css';
import axios from "axios";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setUserName: '',
            setPassword: ''
        };
    }

    handleChange = (Event) => {
        let name = Event.target.name;
        let password = Event.target.value;
        this.setState ({
            [name]:password
        })
    };


    submit = (event) => {
        event.preventDefault();
        axios.post('/api/insert', this.state)
            .then(() => {
                alert('success post');
                this.props.navigate('/rainmanland/client/src/pages/customerinfo.js');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleCreateAccount = () => {
        this.props.navigate('/rainmanland/src/pages/signupPage.js');
    };

    render() {
        return (
            <div>
                <div className="login-form-login-form">
                    <form className="login-form-form" onSubmit={this.submit}>
                        <span className="login-form-text">login</span>
                        <span className="login-form-text1">email</span>
                        <input
                            name="setUserName"
                            required
                            placeholder="enter email"
                            className="login-form-textinput input"
                            onChange={this.handleChange}
                        />
                        <span className="login-form-text2">
                            <span>password</span>
                            <br></br>
                        </span>
                        <input
                            name="setPassword"
                            type="password"
                            required
                            placeholder="enter password"
                            className="login-form-textinput1 input"
                            onChange={this.handleChange}
                        />
                        <button className="login-form-button button">forgot password?</button>
                        <button type="submit" className="login-form-button1 button">
                            login
                        </button>
                        <button
                            className="login-form-link"
                            onClick={this.handleCreateAccount}
                        >
                            create account
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
