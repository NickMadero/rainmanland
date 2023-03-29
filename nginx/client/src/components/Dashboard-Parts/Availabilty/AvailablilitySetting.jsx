import React from 'react';
import styles from '../Availabilty/AvailabliltySetting.module.css';
import DateTimePicker from '../Components/DateTimePicker/DateTimePicker'
const AvailabilitySettings = () => {

    return(
        <div id='wrapper' name='availability-wrapper' className={styles.wrapper}>
            <h2 id='heading' className={styles.heading}>Availability</h2>
            <DateTimePicker text={'date input 1'}/>

        </div>
    );
}

export default AvailabilitySettings;