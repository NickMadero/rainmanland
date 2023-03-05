import React from 'react';

function LandingPage(props) {

	return (
		<div className="App">
			<h1>Rainmanland Self-Booking Calendar</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus odio eget justo dictum, at vestibulum velit interdum. Integer euismod tellus et nisi commodo feugiat.</p>
			<button onClick={props.onBookButtonClick}>Book an Appointment</button>
			<p><a id="employeeLoginLink" title="Click to go to the employee login page"
					  href="#" onClick={props.onEmployeeSignInButtonClick}>Employee Login</a></p>
		</div>
	);
}

export default LandingPage;

