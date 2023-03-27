/**Author: Thomas Dougherty */

import React, { useState } from 'react';
import Button from '../Components/Button/Button';
import styles from './AddEmployeeForm.module.css';

function AddEmployeeForm({ onAddEmployee, onCancel }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // add state variable

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = { firstName, lastName, email, phoneNumber };
    onAddEmployee(newEmployee);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    //showModal(true);
  };

  const handleCancel = () => {
    onCancel();
    //showModal(false);
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="first-name-input" className={styles.label}>First Name:</label>
        <input
          type="text"
          id="first-name-input"
          className={styles.input}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="last-name-input" className={styles.label}>Last Name:</label>
        <input
          type="text"
          id="last-name-input"
          className={styles.input}
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email-input" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email-input"
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone-number-input" className={styles.label}>Phone Number:</label>
        <input
          type="tel"
          id="phone-number-input"
          className={styles.input}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="submit" variant="form" text="Add Employee" />
        <Button type="button" variant="cancel" text="Cancel" onClick={handleCancel} />
      </div>
    </form>
  );
}

export default AddEmployeeForm;