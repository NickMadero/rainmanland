import React, { useState } from 'react';
import { Button, Container, Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DayButton = () => {
  const [buttonState, setButtonState] = useState({
	color: 'secondary',
	text: 'Begin Day',
  });

  const handleClick = () => {
	setButtonState({
	  color: 'success',
	  text: 'Day Started - head to first job',
	});
  };

  return (
	<Button
	  variant={buttonState.color}
	  onClick={handleClick}
	>
	  {buttonState.text}
	</Button>
  );
};

const FinishDayButton = () => {
  const [buttonState, setButtonState] = useState({
	color: 'secondary',
	text: 'Finish Day',
  });

  const handleClick = () => {
	setButtonState({
	  color: 'danger',
	  text: 'All jobs finished',
	});
  };

  return (
	<Card className="w-auto" style={{ display: 'inline-block' }}>
	  <Card.Body className="p-0">
		<Button
		  variant={buttonState.color}
		  className="w-100"
		  onClick={handleClick}
		>
		  {buttonState.text}
		</Button>
	  </Card.Body>
	</Card>
  );
};


function EmployeeDashboard(props) {
	const [completedAppointments, setCompletedAppointments] = useState({});

	const markComplete = (appointmentId) => {
		// Update the appointment in the database and set completion status to true
		// After updating, update the completedAppointments state with the appointmentId
		setCompletedAppointments({ ...completedAppointments, [appointmentId]: true });
	};

	const openDirections = (address) => {
		const encodedAddress = encodeURIComponent(address);
		const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
		window.open(url, '_blank');
	};


	let card1 = props.halfDay1.map((val, key) => {
		const isCompleted = completedAppointments[key];
		return (
			<React.Fragment key={key}>
				<Card
					style={{
						borderColor: isCompleted ? 'green' : '',
						borderWidth: isCompleted ? '2px' : '',
					}}
				>
					<Card.Header as="h5">{val.address}</Card.Header>
					<Card.Body>
						<Card.Title>{val.customer_name}</Card.Title>
						<Card.Subtitle>
							Appointment window is {val.start_time} to {val.end_time}.
						</Card.Subtitle>
						<Card.Text>
							{val.controller_location} {val.controller_brand} controller with {val.zone_amount} zone(s).
						</Card.Text>
						<Button
						variant="primary"
						onClick={() => markComplete(key)}
						>
						Mark Complete
						</Button>
						<Button
						variant="primary"
						onClick={() => openDirections(val.address)}
						>
						Open Directions in Google Maps
						</Button>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	});

	let card2 = props.halfDay2.map((val, key) => {
		const isCompleted = completedAppointments[key];
		return (
			<React.Fragment key={key}>
				<Card
					style={{
						borderColor: isCompleted ? 'green' : '',
						borderWidth: isCompleted ? '2px' : '',
					}}
				>
					<Card.Header as="h5">{val.address}</Card.Header>
					<Card.Body>
						<Card.Title>{val.customer_name}</Card.Title>
						<Card.Subtitle>
							Appointment window is {val.start_time} to {val.end_time}.
						</Card.Subtitle>
						<Card.Text>
							{val.controller_location} {val.controller_brand} controller with {val.zone_amount} zone(s).
						</Card.Text>
						<Button
							variant="primary"
							onClick={() => markComplete(key)}
						>
							Mark Complete
						</Button>
						<Button
							variant="primary"
							onClick={() => openDirections(val.address)}
						>
							Open Directions in Google Maps
						</Button>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	});


	return (
		<div className="App">
			<h1>Job list: Crew {props.crewNum}</h1>
			<br />
			<br />
				<Container>

			<div className="d-grid gap-2">
				<DayButton/>
					<Row>{card1}</Row>
					<Row>{card2}</Row>
				<FinishDayButton/>

		</div>
				</Container>
			</div>
	);
}

export default EmployeeDashboard;

