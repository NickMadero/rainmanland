import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
function LandingPage(props) {

	let navigate = useNavigate();

	// Use functions like this to make buttons/handlers that navigate through react-router
	const goToCalendar = () => {
		let path = `appointment-info`;
		navigate(path);
	}

	const goToEmployeeLogin = () => {
		let path = 'employee-login';
		navigate(path);
	}

	return (
		<div className="App">
			<h1>Rainmanland Self-Booking Calendar</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus odio eget justo dictum, at vestibulum velit interdum. Integer euismod tellus et nisi commodo feugiat.</p>
			<Button variant="primary" size="lg" onClick={goToCalendar}>
				Book Now!
			</Button>{' '}
			<Button onClick={goToEmployeeLogin} variant="outline-secondary">
				Employee Login
			</Button>{' '}
		</div>
	);
}

export default LandingPage;

