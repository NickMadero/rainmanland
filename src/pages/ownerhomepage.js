import React from 'react'
import styles from './Templates/ownerhomepage.module.css'
import SelectableAppointmentTable from './Templates/AppointmentTable/AppointmentTable.jsx'
import AvailabilitySettings from './Templates/Availability/AvailabilitySettings.jsx'
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
        <AvailabilitySettings />
    <div id="container--bottom" className={styles['bottom-container']}>
        <SelectableAppointmentTable />
      </div>
    </div>
    </>
  );
}

export default OwnerHomePage