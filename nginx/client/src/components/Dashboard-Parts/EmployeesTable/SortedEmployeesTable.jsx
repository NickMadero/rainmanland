import React from 'react';
import Button from '../Components/Button/Button.jsx';
import styles from '../EmployeesTable/EmployeesTable.module.css';

const SortedEmployeesTable = () =>{
    return(
        <div id='wrapper' name='wrapper' className={styles.wrapper}>
            <h2 id='heading-employees' className={styles['heading']}>Employees</h2>
            <EmployeesTable />
            <Button variant={'form'} text={'Add Employee'} type={'submit'} />
            <Button variant={'remove'} text={'Remove Employee'} type={'submit'} />
        </div>
    )
};

function EmployeesTable({ employees = EMPLOYEES }) {
    const rows = [];
    employees.sort(); //probably doesn't work they way i expect it to
    employees.forEach((employee) => {
        rows.push(<EmployeeRow employee={employee} key={employee.name} />);
    });
    return(
        <table id='table--employees' name='table--employees' className={styles.EmployeeTable}>
            <thead>
                <tr>
                    <th>
                        <h3>Name</h3>
                    </th>
                    <th>
                        <h3>Date Hired</h3>
                    </th>
                    <th>
                        <h3>Crew Number</h3>
                    </th>
                </tr>
            </thead>
        </table>
    )
    }


function EmployeeRow({ employee }){
    return(
        <tr>
            <td>{employee.name}</td>
            <td>{employee.date_hired}</td>
            <td>{employee.crew}</td>
        </tr>
    );
}


/**TEST DATA */
const EMPLOYEES =[  {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'},
                    {name: "RZA", date_hired: "09/31/22", crew: '1'}];

export default SortedEmployeesTable;