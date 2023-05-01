import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Card, Container, Form, Button, Col, Row, InputGroup, FormControl, FormCheck } from 'react-bootstrap';
import {renderIntoDocument} from "react-dom/test-utils";
import {withRouter} from "./withRouter";

class EmployeeSignInPage extends React.Component {
    constructor(props) {
        super(props);

        // Initialize the component state
        this.state = {
            email: '',
            password: '',
       };

		this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Update the state whenever the user types in the username or password fields
    handleInputChange = event => {

		// if the user is attempting to log in while already logged in, prompt them to log out first
		if (this.props.mainState.userInfo) {
			// eslint-disable-next-line no-restricted-globals
			const userWantsToLogout = confirm("You are already logged in. Log out now?");
			if (!userWantsToLogout) {
				if (this.props.mainState.userInfo.user_type === "boss") {
					this.props.goToPage('/owner-dashboard');
				}
				else if (this.props.mainState.userInfo.user_type === "crew_member") {
					this.props.getJobsTodayForCrew(this.props.mainState.userInfo.crewName)
					this.props.goToPage('/employee-dashboard');
				}
			} else {
				// Change the mainState userInfo to false to log out
				this.props.clearUserInfo();
			}
		}

		// collect info from event trigger
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => (
			{
				...prevState,
				[name]: value
			}
		), function () {
			console.log(`Setting state.${name} to ${value}`); 
		});
	};

    // Handle login form submission
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
            password: '',
        });
    };

    render() {
        const rowStyle = {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
        };

        const buttonStyle = {
            display: 'block',
            margin: '1rem auto',
        };

        return (
            <Container>
                <Row className="justify-content-md-center" style={rowStyle}>
                    <Col md="auto">
                        <Card className="mt-4 mb-4 p-4">
                            <Card.Title>Employee Login</Card.Title>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" style={buttonStyle}>
                                    Log In
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(EmployeeSignInPage);

