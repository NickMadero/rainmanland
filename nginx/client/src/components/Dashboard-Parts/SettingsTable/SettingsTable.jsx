
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

function SelectableAppointmentTable() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
    axios.post('/api/get-settings')
        .then(response => {
            console.log(response.data);
            setAppointments(response.data);
        })
        .catch(error => console.log(error));
    }, []);



    const handleButtonClick = (setting) => {
        const value = prompt("enter for setting: " + setting.id)
        if (value != null && setting.name != null) {
            axios.post('/api/put-setting', {setting_name: setting.name, setting_value: value})
                .then(res => {
                    console.log('setting updated');
                })
                .catch(err => console.log(err));
        }
        else {
        }
        axios.post('/api/get-settings')
            .then(response => {
                console.log(response.data);
                setAppointments(response.data);
            })
            .catch(error => console.log(error));

    };

    return (
        <div style={{ position: 'absolute', top: 400, right: 0, width: '100%', height: '50%', overflowY: 'scroll' }}>
            <Form.Label>Settings</Form.Label>
            <Table striped bordered >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((setting,index) => (
                    <tr>
                        <td>{setting.name}</td>
                        <td>{setting.value}</td>
                        <td>
                            <Button onClick={() => handleButtonClick(appointments[index])}>Update</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SelectableAppointmentTable;