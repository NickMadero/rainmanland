import React, { useState } from 'react';
import styles from './Modal.module.css';
import AddEmployeeForm from '../../Forms/AddEmployeeForm.jsx'



function Modal(props) {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
