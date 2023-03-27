/**Author: Thomas Dougherty */

import React, { useState } from 'react';
import Button from '../Components/Button/Button.jsx';
import styles from '../EmployeesTable/EmployeesTable.module.css';
import AddEmployeeForm from '../Forms/AddEmployeeForm.jsx'
import Modal from '../Components/Modal/Modal.jsx'

const SelectableEmployeesTable = ( { EMPLOYEES } ) =>{
    //use state for Add Employee form. false = hidden
    const [showAddEmpForm, setShowAddEmpForm] = useState(false); 
    //handler for Add Employee form
    const handleAddEmployeeClick = () => {
        setShowAddEmpForm(true); 
        toggleModal();
    }
    //state variable and toggle function for modal
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return(
        <div id='wrapper' name='wrapper' className={styles.wrapper}>
            <h2 id='heading-employees' className={styles['heading']}>Employees</h2>
            <div id='table-div' name='table-div' className={styles['table-div']}>
                <EmployeesTable employees = {EMPLOYEES} />
            </div>
            <Button variant={'form'} text={'Add Employee'} type={'submit'} onClick={handleAddEmployeeClick} />
            {showModal && showAddEmpForm && (
                <Modal onClose={toggleModal}>
                    <AddEmployeeForm />
                </Modal>
            )}
            <Button variant={'remove'} text={'Remove Employee'} type={'submit'} />
        </div>
    )
};

function EmployeesTable({ employees = EMPLOYEES }) {
  
    const [selectedRow, setSelectedRow] = useState({});
    const handleRowSelect = (rowId) => {
      setSelectedRow({ user_id: rowId });
    };
    
    const rows = employees.map((employee) => {
        return (
          <EmployeeRow
            key={employee.user_id}
            employee={employee}
            onSelect={handleRowSelect}
            selected={selectedRow.user_id === employee.user_id}
          />
          );
        });
       
    return(
        <table id='table--employees' name='table--employees' className={styles.EmployeeTable}>
            <thead>
                <tr>
                    <th>
                        <h4>User ID</h4>
                    </th>
                    <th>
                        <h4>First Name</h4>
                    </th>
                    <th>
                        <h4>Last Name</h4>
                    </th>
                    <th>
                        <h4>Email Address</h4>
                    </th>
                    <th>
                        <h4>Phone Number</h4>
                    </th>
                    <th>
                        <h4>Currently Working</h4>
                    </th>
                    <th>
                        <h4>User Type</h4>
                    </th>
                </tr>
            </thead>
            <tbody id='table-body--employees' className ={styles['table-body--employees']}>
                {rows}
            </tbody>
        </table>
    );}


function EmployeeRow({ employee, onSelect, selected}){
    const handleClick = () => {
        if (typeof onSelect === 'function') {
          onSelect(employee.user_id);
        }
      };
    return(
        <tr onClick= {handleClick} className={selected ? styles['selected-row'] : ''}>
            <td>{employee.user_id}</td>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone_number}</td>
            <td>{employee.currently_working}</td>
            <td>{employee.user_type}</td>
        </tr>
    );
}


/**TEST DATA */
const EMPLOYEES =[  {   
                        user_id: 1, first_name:'RZA', 
                        last_name:'', email:'rza@wutangclan.com', 
                        phone_number:'(718)687-0316', 
                        currently_working: 1,
                        user_type:'boss'
                    },

                    {   
                        user_id: 2, 
                        first_name:'GZA', 
                        last_name:'The Genius', 
                        email:'gza@wutangclan.com', 
                        phone_number:'(347)607-8668', 
                        currently_working: 1, 
                        user_type:'crew_member'
                    },
                    {
                        user_id: 3, 
                        first_name:'Raewkon', 
                        last_name:'The Chef', 
                        email:'raekwon@wutangclan.com', 
                        phone_number:'(929)900-9380', 
                        currently_working: 1, 
                        user_type:'crew_member'},
                    {   
                        user_id: 4,
                        first_name:'Method',
                        last_name:'Man', 
                        email:'method@wutangclan.com', 
                        phone_number:'(212)649-5602', 
                        currently_working: 0, 
                        user_type:'crew_member'
                    },
                    {
                        user_id: 5,
                        first_name: "U",
                        last_name: "God",
                        email: "ugod@wutangclan.com",
                        phone_number: "(212)988-1733",
                        currently_working: 1,
                        user_type: "crew_member"
                      },
                      {
                        user_id: 6,
                        first_name: "Inspectah",
                        last_name: "Deck",
                        email: "deck@wutangclan.com",
                        phone_number: "(646)445-2733",
                        currently_working: 0,
                        user_type: "crew_member"
                      }];

export default SelectableEmployeesTable;