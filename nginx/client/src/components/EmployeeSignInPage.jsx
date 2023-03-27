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
			<Container>
				<Row className="justify-content-md-center">
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
								<Button variant="primary" type="submit">
									Log In
								</Button>
							</Form>
						</Card>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md="auto">
						<Card className="mt-4 mb-4 p-4">
							<Card.Title>Add New Employee</Card.Title>
							<Form onSubmit={this.handleAddEmployee}>
								<Row>
									<Col>
										<Form.Group controlId="firstName">
											<Form.Label>First Name</Form.Label>
											<Form.Control type="text" placeholder="First Name" />
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="lastName">
											<Form.Label>Last Name</Form.Label>
											<Form.Control type="text" placeholder="Last Name" />
										</Form.Group>
									</Col>
								</Row>

								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Email" />
								</Form.Group>

								<Form.Group controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>

								<Form.Group controlId="confirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control type="password" placeholder="Confirm Password" />
								</Form.Group>

								<Form.Group controlId="phoneNumber">
									<Form.Label>Phone Number</Form.Label>
									<Form.Control type="tel" placeholder="Phone Number" />
								</Form.Group>

								<Form.Group controlId="currentlyActive">
									<Form.Check type="checkbox" label="Currently Active" />
								</Form.Group>

								<Button variant="primary" type="submit">
									Add Employee
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
