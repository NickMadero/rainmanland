import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton} from "react-bootstrap";
import axios from "axios";
class CustomerInfoPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            outside: false,
            controllerBrands: [],
            brand: '',
            unitsPerZone: '',
            numZones: '',
            address: ''
        }
    }
    componentDidMount() {
        axios.post('/api/get-controller-brand')
            .then(res => {
                this.setState({
                    controllerBrands: res.data
                });
            })
            .catch(err => console.log(err));
    }
    // Update the state whenever the user enters information in the form
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value

        });
    };

    // handles what happens after the user hits submit
    handleSubmit = event => {
        event.preventDefault();

        const { email, First_Name, Last_Name } = this.state;

        axios.post('/api/insert-newcustomer', {
            email: email,
            first_name: First_Name,
            last_name: Last_Name
        })
            .then(res => {
                console.log('Customer info saved before going to calendar.');
                this.props.onGoToCalendarButtonClick(this.state);
            })
            .catch(err => console.log(err));
    };



    render() {
        const { controllerBrands } = this.state;
        return (
            <Form style={{
                width: '50%',
                margin: '0 auto',
                border: '1px solid black',
                padding: '20px'
            }} onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formIsControllerOutside">
                            <Form.Label>Is the controller outside?</Form.Label>
                            <Form.Control name="outside" type="text" placeholder="yes or no" required pattern="yes|no"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formControllerBrand">
                            <DropdownButton id="dropdown-basic-button" title="brand of controller">
                                {controllerBrands.map((brand, index) => (
                                    <Dropdown.Item key={index} eventKey={index} onSelect={(eventKey, event) => { this.setState({ brand: brand }); }}>
                                        {brand}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/*<Col>*/}
                    {/*    <Form.Group controlId="formUnitsPerZone">*/}
                    {/*        <Form.Label>How many units per zone?</Form.Label>*/}
                    {/*        <Form.Control name="unitsPerZone" type="number" placeholder="# of units" required min="0"/>*/}
                    {/*    </Form.Group>*/}
                    {/*</Col>*/}
                    <Col>
                        <Form.Group controlId="formNumZones">
                            <Form.Label>How many zones?</Form.Label>
                            <Form.Control name="numZones" type="number" placeholder="# of zones" required min="0"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formAddress">
                    <Form.Label>What is your address?</Form.Label>
                    <Form.Control name="address" type="text" placeholder="enter address" required/>
                </Form.Group>
                <Form.Group controlId="formEmailAddress">
                    <Form.Label>What is your Email address?</Form.Label>
                    <Form.Control name="EmailAddress" type="text" placeholder="enter Email address" required/>
                </Form.Group>
                <Form.Group controlId="formFirstName">
                    <Form.Label>What is First Name?</Form.Label>
                    <Form.Control name="First_Name" type="text" placeholder="First Name" required/>
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>What is Last Name?</Form.Label>
                    <Form.Control name="Last_Name" type="text" placeholder="Last Name" required/>
                </Form.Group>
                <Button variant="primary" type="submit"
                        style={{margin: '30px', color: 'white', backgroundColor: 'blue'}}>
                    Book a new appointment
                </Button>
            </Form>
        );
    }
};

export default CustomerInfoPage;