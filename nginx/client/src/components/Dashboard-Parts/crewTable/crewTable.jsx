import axios from 'axios';
import { Table, Form, Button, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";

function CrewTable() {
    const [crews, setCrews] = useState([]);
    const [selectedCrew, setSelectedCrew] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState('');


    useEffect(() => {
        // Fetch crew data from backend API
        axios.post('/api/get-crew', { name: 'one' })
            .then(response => {
                console.log(response.data);
                setCrews(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleCrewClick = (crew) => {
        setSelectedCrew(crew);
        setShowModal(true);
    }

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
                window.alert(`${memberEmail} has been removed from the crew.`);
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                window.alert(`${newMemberEmail} has been added to the crew.`);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div style={{ position: "absolute", top: 15, left: 0, width: '50%', height: '50%', overflowY: 'scroll' }}>
            <FormGroup>
                <Form.Label>Crew List</Form.Label>
            </FormGroup>
            <Table striped bordered >
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Crew Members for {selectedCrew?.name}
                        <Button variant="primary" onClick={() => setShowAddMemberModal(true)}>
                            Add Member
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {selectedCrew?.members.map(member => (
                            <li key={member.id} className="row">
                                <div className="col" style={{ whiteSpace: 'nowrap' }}>{member.first_name} {member.last_name} {member.emailaddress}</div>
                                <div className="col-auto"><Form.Check>
                                    <Form.Check.Input type="checkbox" onChange={() => handleRemoveMember(member.emailaddress, selectedCrew.name)} />
                                    <Form.Check.Label style={{ fontSize: '12px' }}>Remove</Form.Check.Label>
                                </Form.Check></div>
                            </li>
                        ))}
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
