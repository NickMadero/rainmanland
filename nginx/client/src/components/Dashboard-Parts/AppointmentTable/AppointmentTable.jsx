import React, { useEffect, useState } from 'react';
import styles from './AppointmentTable.module.css';
import Button from '../Components/Button/Button';
import axios from 'axios';

const SelectableAppointmentTable = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('/api/show-appointments', { date: '2023-03-23' });
            setAppointments(result.data);
        };
        fetchData();
    }, []);

    return (
        <div id='wrapper' name='wrapper' className={styles.wrapper}>
            <h2 id='heading-appt' className={styles['appt-heading']}>
                Today's Appointments
            </h2>
            <AppointmentTable appointments={appointments} />
            <Button variant={'remove'} text={'Remove Appointment'} type={'submit'} />
        </div>
    );
};

function AppointmentTable({ appointments = [] }) {
    const rows = [];
    appointments.sort((a, b) => {
        return a.time.localeCompare(b.time);
    });
    appointments.forEach((appointment) => {
        rows.push(<AppointmentRow appointment={appointment} key={appointment.name} />);
    });

    return (
        <table id='table--appointments' name='table--appointments' className={styles['table--appointments']}>
            <thead>
            <tr>
                <th>
                    <h4>address</h4>
                </th>
                <th>
                    <h4>date</h4>
                </th>
                <th>
                    <h4>finished</h4>
                </th>
                <th>
                    <h4># of zones</h4>
                </th>
                <th>
                    <h4>controller brand</h4>
                </th>
                <th>
                    <h4>controller outside</h4>
                </th>
                <th>
                    <h4>first name</h4>
                </th>
                <th>
                    <h4>last name</h4>
                </th>
                <th>
                    <h4>email</h4>
                </th>
            </tr>
            </thead>
            <tbody id='table-body--appointments' className={styles['table-body--apointments']}>
            {rows}
            </tbody>
        </table>
    );
}

function AppointmentRow({ appointment }) {
    return (
        <tr>
            <td>{appointment.address}</td>
            <td>{appointment.date}</td>
            <td>{appointment.finished}</td>
            <td>{appointment.numZones}</td>
            <td>{appointment.controllerBrands}</td>
            <td>{appointment.outside}</td>
            <td>{appointment.first_name}</td>
            <td>{appointment.last_name}</td>
            <td>{appointment.email}</td>
        </tr>
    );
}

export default SelectableAppointmentTable;
