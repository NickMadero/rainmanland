import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {renderIntoDocument} from "react-dom/test-utils";
import {withRouter} from "./withRouter";

class EmployeeSignInPage extends React.Component {
    constructor(props) {
        super(props);

        // Initialize the component state
        this.state = {
            email: '',
            password: ''
        };
    }

    // Update the state whenever the user types in the username or password fields
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };

    // Handle form submission
    handleSubmit = event => {
        event.preventDefault();

        // TODO: handle login logic here
        console.log('User credentials submitted.');

        // We can call the App.handleEmpLoginButtonClick() method from here (we renamed it to just "onLoginClick" inside
        // of this component) because the App class passed the method to this class (EmployeeSignInPage) as a prop in
        // App.render(). This is one of the main ways components can work together in React. It sounds confusing, but
        // take a quick look at the render() method in App.js and it will make sense.
        this.props.onLoginClick(this.state.email, this.state.password)

        // Clear the form fields after submission
        this.setState({
            email: '',
            password: ''
        });
    };

    render() {
        return (
            <div>
                <h1>Employee Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EmployeeSignInPage);
