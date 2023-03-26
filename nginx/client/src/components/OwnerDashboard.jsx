import React from 'react'
import styles from '../style/ownerdashboard.module.css'
import SelectableAppointmentTable from './Dashboard-Parts/AppointmentTable/AppointmentTable.jsx'
import AvailabilitySettings from '../components/Dashboard-Parts/Availabilty/AvailablilitySetting'
/**
 *  TO-DO: Entry for lists of zipcodes for service areas
 *         Service area map (Leaflet? Google Maps?)
 *
 */


const OwnerHomePage = (props) => {
    /*EVENT LISTENERS & HANDLERS GO HERE */
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>

            <div className={styles['page']}>

                <div id="container--bottom" className={styles['bottom-container']}>
                    <SelectableAppointmentTable />
                </div>
            </div>
        </>
    );
}

export default OwnerHomePage
