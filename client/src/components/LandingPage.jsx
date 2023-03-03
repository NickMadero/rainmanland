import React from 'react';

class LandingPage extends React.Component{

    render() {
		return (
			<div className='App'>
				<h1 id="title">Rainmanland Self-Booking Calendar</h1>
				<p id="paragraph1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus odio eget justo dictum, at vestibulum velit interdum. Integer euismod tellus et nisi commodo feugiat.</p>
				<p id="paragraph2">Etiam convallis lorem non nisl euismod placerat. Sed venenatis lectus sit amet est commodo, eget pharetra lacus laoreet. Sed ac aliquet magna.</p>
				<button id="bookButton">Book an Appointment</button>
				<p id="employeeLink"><a href="#" id="employeeSignInLink">Employee sign-in</a></p>
			</div>
		);
    }
}

export default LandingPage;

