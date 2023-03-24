import React from 'react';
import styles from './DateTimePicker.module.css';

const DateTimePicker = ({text}) => {
    return (
        <div id='date-wrapper' name= 'wrapper' className={styles['wrapper']}>
            <label for="date-input">{text}</label>
            <input 
                type="datetime-local" 
                id="date-input" 
                name="date-1"
                value='2023-04-19 17:14'
                className={styles['date-input']}
                ></input>
         </div>
    );
}

export default DateTimePicker;