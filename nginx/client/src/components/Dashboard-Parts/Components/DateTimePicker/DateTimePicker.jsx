import React from 'react';
import styles from './DateTimePicker.module.css';

const DateTimePicker = ({text}) => {
    return (
        <div id='date-wrapper' name= 'wrapper' className={styles['wrapper']}>
            <label for="date-input">{text}</label>
        </div>
    );
}

export default DateTimePicker;
