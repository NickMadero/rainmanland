import NewEmployeeForm from './Dashboard-Parts/SettingsTable/NewEmployeeForm.jsx';
import React from 'react'
import styles from '../style/ownerdashboard.module.css'
import SelectableAppointmentTable from './Dashboard-Parts/AppointmentTable/AppointmentTable.jsx'
import crewTable from "./Dashboard-Parts/crewTable/crewTable";
import AvailabilitySettings from '../components/Dashboard-Parts/Availabilty/AvailablilitySetting'
import CrewTable from "./Dashboard-Parts/crewTable/crewTable";
import SettingsTable from './Dashboard-Parts/SettingsTable/SettingsTable.jsx'
import MaxHalfDayTable from "./Dashboard-Parts/MaxHalfDay/MaxHalfDayTable.jsx";
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
                    <label className={styles['page-label']}>Admin Dashboard</label>
                    <div id="container--top" className={styles['top-container']}>
                    <SelectableAppointmentTable />
                </div>

                <div id="container--bottom" className={styles['bottom-container']}>
                    <CrewTable />
                    <SettingsTable />
                    <MaxHalfDayTable />

                </div>
            </div>

			<div>
                <NewEmployeeForm onNewEmployeeSubmit={props.onNewEmployeeSubmit} />
			</div>
        </>
    );
}

export default OwnerHomePage

