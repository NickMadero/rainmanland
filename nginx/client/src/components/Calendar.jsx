import React, { useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const NewCalendar = (props) => {

	// state attributes belonging to the Calendar component
	const [showModal, setShowModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	// Parses the calendar object and formats the halfDay array to make it easier for creating calendar events
  	const formatEvents = (data) => {
    const formattedEvents = data.halfDays.map((halfDay, index) => {
        const startDate = new Date(halfDay.date + "T" + halfDay.startTime);
        const endDate = new Date(halfDay.date + "T" + halfDay.endTime);

        return {
            id: index,
            title: halfDay.whichHalf === "first" ? "AM Time Slot" : "PM Time Slot",
            start: startDate,
            end: endDate,
            isAvailable: halfDay.isAvailable,
            appointmentCount: halfDay.appointment_count,
            originalHalfDay: halfDay
        };
    });

    const availableHalfDays = formattedEvents.filter((halfDay) => halfDay.isAvailable);

    availableHalfDays.sort((a, b) => {
        if (b.appointmentCount !== a.appointmentCount) {
            return b.appointmentCount - a.appointmentCount;
        } else {
            return a.start - b.start;
        }
    });

    for (let i = 0; i < availableHalfDays.length && i < 2; i++) {
        availableHalfDays[i].discountEligible = true;
    }

    const updatedEvents = formattedEvents.map((halfDay) => {
        const availableHalfDay = availableHalfDays.find((ahd) => ahd.id === halfDay.id);
        return {
            ...halfDay,
            discountEligible: availableHalfDay ? availableHalfDay.discountEligible : false
        };
    });

    return updatedEvents;
};

	// Handlers for what happens when you click a specific time slot / halfDay
	const handleSelectEvent = (event) => {
		if (event.isAvailable) {
			setSelectedEvent(event);
			setShowModal(true);
		} else {
			alert("This time slot is not available.");
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleConfirmBooking = async () => {

		// Attempt to add the new appointment
		const success = await props.addNewAppointment(selectedEvent.originalHalfDay);
		if (success) {
			alert(`Booking confirmed for ${selectedEvent.title}`);
		} else {
			alert(`Problem while booking appointment.`);
		}
		setShowModal(false);

		// go back to landing page if an appointment was booked successfully
		props.goToPage('/');
	};

	// Now actually format the halfDay array from the calendar object (passed as a prop)
	const halfDays = formatEvents(props.calendar);

	return (
		<div>
			<Calendar
				localizer={localizer}
				defaultDate={new Date()}
				defaultView="month"
				events={halfDays}
				style={{ height: "95vh" }}
				views={["month", "week", "agenda"]}
				onSelectEvent={handleSelectEvent}
				eventPropGetter={(event) => {
					const backgroundColor = event.isAvailable ? event.discountEligible ? "green" : "blue" : "red";
					return { style: { backgroundColor } };
				}}
			/>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Booking Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedEvent && (
						<>
							<p>
								Time range: {moment(selectedEvent.start).format("hh:mm A")} -{" "}
								{moment(selectedEvent.end).format("hh:mm A")}
							</p>
							// TODO: get calculated price of booking and display it here
							<p>Price: {"CALCULATED PRICE GOES HERE"}</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleConfirmBooking}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default NewCalendar;
