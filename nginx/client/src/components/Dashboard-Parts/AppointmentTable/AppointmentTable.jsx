
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

function SelectableAppointmentTable() {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchAppointments = () => {
        const formattedDate =  new Date(selectedDate).toISOString().split('T')[0];
        console.log('Formatted date:', formattedDate);

        axios.post('/api/show-appointments', {
            date:  formattedDate
        })
            .then(response => {
                console.log(response.data);
                setAppointments(response.data);
            })
            .catch(error => console.log(error));
    }

    const renderYesNo = (value) => {
        return value ? "Yes" : "No";
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}></div>
            <div style={{ flex: 2, overflowY: 'scroll' }}>
                <Form.Group controlId="formDate">
                    <Form.Label>Select Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={fetchAppointments}>Show Appointments</Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Finished</th>
                        <th>Num Zones</th>
                        <th>Controller Brands</th>
                        <th>Outside</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>zip code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.address}</td>
                            <td>{appointment.date}</td>
                            <td>{renderYesNo(appointment.finished)}</td>
                            <td>{appointment.numZones}</td>
                            <td>{appointment.controller_Brands}</td>
                            <td>{renderYesNo(appointment.outside)}</td>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.zipcode}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default SelectableAppointmentTable;
