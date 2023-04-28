/**
 * Author: Nick Madero
 * Max Half table displays all Max half days for each zip code and updating max half days.
 */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, Form, Button, FormGroup, Modal} from 'react-bootstrap';
import styles from './MaxHalfDayTable.module.css';


function MaxHalfDayTable () {

    const [allMaxhalf, setallMaxHalf]  = useState([]);
    const [showUpdateModal , setShowUpdateModal] = useState(false);
    const [selectedZipcode, setSelectedZipcode] = useState(null);
    const [newMax, setNewMax] = useState('');
    // use effect is for showing all the current max days for each zip code.
    useEffect(() => {
        // api call
        axios.post('/api/show-maxHalf',)
            .then(response => {
                console.log(response.data);
                // setting the allMaxhalf array to fill with the data.
                setallMaxHalf(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    /**
     * allows for zip code to appear in the title.
     * @param Maxhalfs
     */
    const handleZipClick = (Maxhalfs) => {
        setSelectedZipcode(Maxhalfs);
        setShowUpdateModal(true);
    }

    const updateMaxHalfDay = (newMax) => {
        axios.post('/api/update-maxHalf', {
            max_half_days: newMax,
            zip_code: selectedZipcode.zipcode,
        } )
            .then(response => {
                console.log(response.data)
                const updatedMaxHalfs = allMaxhalf.map(maxHalf => {
                    if (maxHalf.zipcode === selectedZipcode.zipcode) {
                        return {
                           maxHalf, max : [
                               maxHalf.max,
                                {newhalf: newMax}
                            ]

                        };
                    }
                    return maxHalf;
                });
                setallMaxHalf(updatedMaxHalfs);
                setShowUpdateModal(false);


            })
            .catch(error => {
                console.log(error);
            });
        window.alert(`${selectedZipcode.zipcode} max day has been update`)

        window.location.reload();
    };





    return (

        <div className={styles['halfday-wrapper']}>
               <FormGroup>
                   <Form.Label className={styles['halfday-label']}>Maximum Half-Days </Form.Label>
               </FormGroup>
               <div className={styles['halfday-table']}>                
               <Table   >
                    <thead>
                        <tr>
                            <th>ZIP Code/Servicee Area</th>
                            <th>Max Number of Half-Days</th>
                            <th>Change Max Half-Days</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allMaxhalf.map((Maxhalfs) => (
                        <tr key={Maxhalfs.id}>
                            <td>{Maxhalfs.zipcode}</td>
                            <td>{Maxhalfs.maxhalfdays}</td>
                            <td>
                                <Button onClick={() => handleZipClick(Maxhalfs)} >change</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/*modal for updating the max half*/}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Max Half Day for {selectedZipcode?.zipcode}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                    <Form.Label>New Max Half Day</Form.Label>
                    <Form.Control type="newMax" placeholder="enter New Max" value={newMax} onChange={(event) =>setNewMax(event.target.value)} />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => updateMaxHalfDay(newMax)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>



    );
}

export default MaxHalfDayTable;