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
			addEmail: '',
			addPassword: '',
			addPasswordConfirm: '',
			pwSame: false,
			addFirstName: '',
			addLastName: '',
			addPhoneNum: '',
			addCrewNum: '',
			addCurrentlyWorking: false
        };

		this.handleInputChange = this.handleInputChange.bind(this);
    }


    // Update the state whenever the user types in the username or password fields
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

		if (target.name === "addCurrentlyWorking") {
			this.setState(({ addCurrentlyWorking }) => (
				{
					addCurrentlyWorking: !addCurrentlyWorking
				}
			), function () {
				console.log('currently working: ', this.state.addCurrentlyWorking);
			});
			return;
		}

		console.log(`Setting state.${name} to ${value}`); 
        this.setState(prevState => (
			{
				...prevState,
				[name]: value
			}
		), function () {
			console.log(name, value);
			if (name === 'addPassword' || name === 'addPasswordConfirm') {
				this.setState(({ pwSame }) => (
					{
						pwSame: this.state.addPassword === this.state.addPasswordConfirm
					}
				), function () {
					console.log('passwords match? ', this.state.pwSame);
				});
			}
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

	// Handle new employee form submission
	handleAddEmployee = event => {
		event.preventDefault();

		// Alert user if password entries don't match
		if (!this.state.pwSame) {
			alert("Password and password confirmation don't match.");
			return;
		};

		console.log('New employee info submitted.');

		// Call the handler defined in App.js which was passed to this component as a prop
		this.props.onNewEmployeeSubmit(this.state);

		// Clear the form fields after submission
		this.setState({
			addEmail: '',
			addPassword: '',
			addPasswordConfirm: '',
			pwSame: false,
			addFirstName: '',
			addLastName: '',
			addPhoneNum: '',
			addCrewNum: '',
			addCurrentlyWorking: false
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
											<Form.Control type="text" name="addFirstName" placeholder="First Name" value={this.state.addFirstName} onChange={this.handleInputChange} />
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="lastName">
											<Form.Label>Last Name</Form.Label>
											<Form.Control type="text" name="addLastName"  placeholder="Last Name" value={this.state.addLastName} onChange={this.handleInputChange} />
										</Form.Group>
									</Col>
								</Row>

								<Form.Group controlId="addEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" name="addEmail" placeholder="Email" value={this.state.addEmail} onChange={this.handleInputChange} />
								</Form.Group>

								<Form.Group controlId="addPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" name="addPassword" placeholder="Password" value={this.state.addPassword} onChange={this.handleInputChange} />
								</Form.Group>

								<Form.Group controlId="confirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control type="password" name="addPasswordConfirm" placeholder="Confirm Password" value={this.state.addPasswordConfirm} onChange={this.handleInputChange} />
								</Form.Group>
								<Form.Group controlId="phoneNumber">
									<Form.Label>Phone Number</Form.Label>
									<Form.Control
										type="tel"
										inputMode="numeric"
										pattern="\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})"
										name="addPhoneNum"
										placeholder="Phone Number"
										value={this.state.addPhoneNum}
										onChange={this.handleInputChange}
									/>
									<Form.Text className="text-muted">
										Please enter 10 numerical characters. Hyphens and parentheses are allowed but not required.
									</Form.Text>
								</Form.Group>

								<Row>
									<Col>
										<Form.Group controlId="currentlyActive">
											<Form.Check type="checkbox" name="addCurrentlyWorking" onChange={this.handleInputChange} label="Currently Active" />
										</Form.Group>
										<Form.Group controlId="crewNumber">
											<Form.Label>Crew Number</Form.Label>
											<Form.Select name="addCrewNum" value={this.state.addCrewNum} onChange={this.handleInputChange} >
												<option value="" >Select Crew</option>
												<option value="1">Crew 1</option>
												<option value="2">Crew 2</option>
											</Form.Select>
										</Form.Group>
									</Col>
								</Row>
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
