import React from 'react';
import styles from './AppointmentTable.module.css';
import Button from '../../Templates/Button/Button';

const SelectableAppointmentTable = () =>{
    return(
        <>
            <h2 id='heading-appt' className={styles['appt-heading']}>Today's Appointments</h2>
            <AppointmentTable appointments={APPOINTMENTS}  />
            <Button variant={'remove'} text={'Remove Appointment'} type={"submit"} />
        </>
    ); 
}

function AppointmentTable({ appointments={APPOINTMENTS}  }){
    const rows = [];
    appointments.sort((a, b) => {
        return a.time.localeCompare(b.time);
    });
    appointments.forEach((appointment) => {
        rows.push(
            <AppointmentRow
            appointment={appointment}
            key={appointment.name} />
            );
        }
    );

    return (
    <table
        id='table--appointments'
        name='table--appointments'
        className={styles['table--appointments']}
        >
        <thead>
            <tr>
            <th>
                <h4>AM/PM</h4>
            </th>
            <th>
                <h4>Name</h4>
            </th>
            <th>
                <h4>Phone</h4>
            </th>
            <th>
                <h4>Address</h4>
            </th>
            <th>
                <h4>ZIP/Service Area</h4>
            </th>
            </tr>
        </thead>
            <tbody id='table-body--appointments' className={styles['table-body--apointments']}>{rows}</tbody>
        </table>
    );
    }
    
   
    
    function AppointmentRow({ appointment }){
        return (
        <tr>
            <td>{appointment.time}</td>
            <td>{appointment.name}</td>
            <td>{appointment.phone}</td>
            <td>{appointment.address}</td>
            <td>{appointment.zip}</td>
        </tr>
        );
    }
    
    const APPOINTMENTS = [
        {time: "PM", name: "Raekwon", phone: "(347)378-6671", address: "22A Julie Ct, Staten Island, NY", zip: "10306"},
        {time: "AM", name: "GZA", phone: "(917)327-2254", address: "212 Lamberts Ln, Staten Island, NY", zip: "10304"},
        {time: "PM", name: "Ghostface Killah", phone: "(646)355-7986", address: "201 Demorest Ave, Staten Island, NY", zip: "10304"},
        {time: "AM", name: "RZA", phone: "(917)812-4547", address: "6701 Amboy Rd, Staten Island, NY", zip: "10312"},
        {time: "PM", name: "Method Man", phone: "(347)996-3606", address: "195 Steuben St Apt 4L Staten Island, NY", zip: "10306"},
        {time: "AM", name: "Inspectah Deck", phone: "(347)996-3606", address: "195 Steuben St Apt 4L Staten Island, NY", zip: "10306"},
    ];
export default SelectableAppointmentTable;