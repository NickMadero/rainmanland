import React from 'react';

function LandingPage(props) {

	return (
		<div>
			<h1>Rainmanland Self-Booking Calendar</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus odio eget justo dictum, at vestibulum velit interdum. Integer euismod tellus et nisi commodo feugiat.</p>
			<button onClick={props.onBookButtonClick}>Book an Appointment</button>
			<p><a href="client-old/src/components#">Employee sign-in</a></p>
		</div>
	);
}

export default LandingPage;

