/**
 * Author: Nick Madero
 * Crew Table displays / add / remove of crews and zip code.
 */
import axios from 'axios';
import { Table, Form, Button, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import styles from './crewTable.module.css'

function CrewTable() {

    // constants for the crew / members proportion of the code
    const [crews, setCrews] = useState([]);
    const [selectedCrew, setSelectedCrew] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState('');

    // constants for the zip code proportion of the code
    const [zipcodes, setZipCodes] = useState([]);
    const [showZipCodeModal, setShowZipCodeModal] = useState(false);
    const [currentCrewName, setCurrentCrewName] = useState('');
    const [showAddZipModal, setShowAddZipModal] = useState(false);
    const [NewZipCode, setNewZipCode] = useState('');


    const [showAddCrewModal, setAddCrewModal] = useState(false);
    const [NewCrew, setNewCrew] = useState('');
    const [startLoc , setStartLoc] = useState('');


    // this just gets the list of crews
    useEffect(() => {
        // Fetch crew data from backend API
        axios.post('/api/get-crew',)
            .then(response => {
                console.log(response.data);
                setCrews(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //removal of crew function
    useEffect(() => {
        console.log(zipcodes);
    }, [zipcodes]);


    const showzipCode = (crewname) => {
        // Fetch zip data from backend API
        axios.post('/api/get-zip-by-crew', { crew_name:  crewname })
            .then(response => {
                console.log(response.data);
                setZipCodes(response.data);
                setShowZipCodeModal(true);
                setCurrentCrewName(crewname);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleCrewClick = (crew) => {
        setSelectedCrew(crew);
        setShowModal(true);
    }

    // handles closing the zip code modal
    const handleCloseZipCodeModal = () => {
        setShowZipCodeModal(false);
        setZipCodes([]);
    }


    // handles the addition of a crew member to a crew
    const handleAddMember = (newMemberEmail) => {
        axios.post('/api/add-crewmember', { email: newMemberEmail, crew_name: selectedCrew.name })
            .then(response => {
                console.log(response.data);
                // Update the crew list to reflect the addition of the crew member
                const updatedCrews = crews.map(crew => {
                    if (crew.crew_name === selectedCrew.crew_name) {
                        return {
                            ...crew,
                            members: [
                                ...crew.members,
                                { emailaddress: newMemberEmail }
                            ]
                        };
                    }
                    return crew;
                });
                setCrews(updatedCrews);
                setNewMemberEmail('');

            })
            .catch(error => {
                console.log(error);
            });
        window.alert(`${newMemberEmail} has been added to the crew.`);
        window.location.reload();
    }

    const handleAddZip = (crewName, zip) => {
        axios.post('/api/add-zip-to-crew', {crew_name:crewName , zip_code: zip})
            .then(response => {
                console.log(response.data)
                const UpdateZip = crews.map(crew => {
                    if (crew.crew_name == selectedCrew.crew_name) {
                        return {
                            ...crew, zip : [
                                ...crew.zip,
                                {zipcode: zip}
                            ]
                        };
                    }
                    return crew
                });
                setZipCodes(UpdateZip);
                setNewZipCode('');

            })
        window.alert(`${zip} has been added to the zip Codes for this crew`)
        window.location.reload();
    }



    // handles the removal of a crew member from a crew
    const handleRemoveMember = (memberEmail, crewName) => {
        axios.post('/api/remove-crewmember', { email: memberEmail, crew_name: crewName })
            .then(response => {
                console.log(response.data);
                // Update the crew list to reflect the removal of the crew member
                const updatedCrews = crews.map(crew => {
                    if (crew.crew_name === selectedCrew.crew_name) {
                        return {
                            ...crew,
                            members: crew.members.filter(member => member.emailaddress !== memberEmail)
                        };
                    }
                    return crew;
                });
                setCrews(updatedCrews);

            })
            .catch(error => {
                console.log(error);
            });
        window.alert(`${memberEmail} has been removed from the crew.`);
        window.location.reload();
    }

    const handleRemovalZip = (zip, crewName) => {
        axios.post('/api/remove-zip-from-crew', { zip_code: zip, crew_name: crewName })
            .then(response => {
                console.log(response.data);
                // Update the zip codes to reflect the removal of the zip code
                const updatedZipCodes = zipcodes.filter(z => z.zipcode !== zip);
                setZipCodes(updatedZipCodes);
                // Update the zipcode list to reflect the removal of the zip code
                const updatedCrews = crews.map(c => {
                    if (c.crew_name === selectedCrew.crew_name) {
                        return {
                            ...c,
                            zipcodes: c.zipcodes.filter(z => z !== zip)
                        };
                    }
                    return c;
                });
                setCrews(updatedCrews);

            })
            .catch(error => {
                console.log(error);
            });
        window.alert(`${zip} has been removed from the crew.`);
        window.location.reload();
    };

    const handleAddCrew = (newCrewName , startLocation) => {
        axios.post('/api/add-new-crew', { crew_name: newCrewName , starting_location: startLocation })
            .then(response => {
                console.log(response.data);
                // Update the crew list to reflect the addition of the new crew
                setCrews([...crews, { crew_name: newCrewName, members: [], zipcodes: [] }]);
                setNewCrew('');

            })
            .catch(error => {
                console.log(error);
            });
        window.alert(`${newCrewName} has been added to the crews.`);
        window.location.reload();
    }

    const handleRemovalOfCrew = async (crewName) => {
        try {
            const response1 = await axios.post('/api/get-zip-by-crew', { crew_name: crewName });
            console.log(response1.data);

            const crewZipCodes = response1.data;

            if (selectedCrew?.members.length > 0 || crewZipCodes.length > 0) {
                window.alert("please delete all crew members first and/or zip codes.");
            } else {
                const response2 = await axios.post('/api/remove-crew', { crew_name: crewName });
                console.log(response2.data);
                window.alert(`Crew ${crewName} has been deleted`);

                // Update the state to remove the crew
                setCrews(crews.filter(c => c.crew_name !== crewName));

                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }





    // window.location.reload();


    return (
        // displays the crew table
        <div>
            <div  className={styles['form-wrapper']}>
            <FormGroup>
                <Form.Label className={styles['crew-label']}>Crew List</Form.Label>
                <Button onClick={() => setAddCrewModal(true)} className={styles['btn-add']}>Add Crew</Button>
            </FormGroup>
            <Table className={styles['table']} >
                <thead>
                <tr>
                    <th>Crews</th>
                </tr>
                </thead>
                <tbody>
                {crews.map(crew => (
                    <tr key={crew.name}>
                        <td>
                            <Button variant="link" onClick={() => handleCrewClick(crew)}>
                                {crew.name}
                            </Button>
                            <Button variant="link" onClick={() => showzipCode(crew.name)}>
                                Zip Codes
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
    
            {/*Modal for adding a new crew */}
            <Modal show={showAddCrewModal} onHide={() => setAddCrewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Crew</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Crew</Form.Label>
                        <Form.Control type="NewCrew" placeholder="Enter Crew Name" value={NewCrew} onChange={(event) => setNewCrew(event.target.value)} />
                        <Form.Control type="NewCrew" placeholder="Enter start location" value={startLoc} onChange={(event) => setStartLoc(event.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {handleAddCrew(NewCrew,startLoc)} }>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>





            {/* Modal for displaying zip codes */}
            <Modal show={showZipCodeModal} onHide={handleCloseZipCodeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Zip Codes
                        <Button   style={{fontSize:"x-small", marginLeft:"5px"}} variant="primary" onClick={() => setShowAddZipModal(true)}>
                            Add zip code
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {zipcodes.length > 0 ? (
                            zipcodes.map((zip) => (
                                <li key={zip.id}>
                                    <div className="col">{zip.zip}</div>
                                    <div className="col-auto"><Form.Check>
                                        <Form.Check.Input type="checkbox" onChange={() => handleRemovalZip(zip.zip,currentCrewName)} />
                                        <Form.Check.Label style={{ fontSize: '12px' }}>Remove</Form.Check.Label>
                                    </Form.Check></div>
                                </li>
                            )
                            )
                        ) : (
                            <div>No zip codes found.</div>

                        )}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseZipCodeModal}>
                        Close
                    </Button>
                </Modal.Footer>


                {/* New modal for adding zipcodes */}
                <Modal show={showAddZipModal} onHide={() => setShowAddZipModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Zip Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="zip" placeholder="Enter zip code" value={NewZipCode} onChange={(event) => setNewZipCode(event.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleAddZip(currentCrewName,NewZipCode)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Modal>

            {/*for showing the crew members for the crew that is clicked on*/}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Crew Members for {selectedCrew?.name}
                        <Button   style={{fontSize:"x-small", marginLeft:"5px"}} variant="primary" onClick={() => setShowAddMemberModal(true)}>
                            Add Member
                        </Button>
                        <Button style={{fontSize:"x-small", marginLeft:"5px"}} variant="primary" onClick={() => handleRemovalOfCrew(selectedCrew?.name)  } >
                            Delete Crew
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {selectedCrew?.members.length > 0 ? (
                            selectedCrew.members.map((member) => (
                                <li key={member.id} className="row">
                                    <div className="col" style={{ whiteSpace: 'nowrap' }}>{member.first_name} | {member.last_name} | {member.emailaddress}</div>
                                    <div className="col-auto"><Form.Check>
                                        <Form.Check.Input type="checkbox" onChange={() => handleRemoveMember(member.emailaddress, selectedCrew.name)} />
                                        <Form.Check.Label style={{ fontSize: '12px' }}>Remove</Form.Check.Label>
                                    </Form.Check></div>
                                </li>
                            ))
                        ) : (
                            <div>No crew members yet.</div>
                        )}

                    </ul>
                </Modal.Body>



                {/* New modal for adding crew members */}
                <Modal show={showAddMemberModal} onHide={() => setShowAddMemberModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Member to {selectedCrew?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={newMemberEmail} onChange={(event) => setNewMemberEmail(event.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleAddMember(newMemberEmail)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Modal>
        </div>
    );
}

export default CrewTable;
