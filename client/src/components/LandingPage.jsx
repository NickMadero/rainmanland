import React from 'react';

function LandingPage(props) {

	return (
		<div className="App">
			<h1>Rainmanland Self-Booking Calendar</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus odio eget justo dictum, at vestibulum velit interdum. Integer euismod tellus et nisi commodo feugiat.</p>
			<button onClick={props.onBookButtonClick}>Book an Appointment</button>
			<p><a id="myLink" title="Click to do something"
					  href="#" onClick={props.onEmployeeSignInButtonClick}>link text</a></p>
		</div>
	);
}

export default LandingPage;

