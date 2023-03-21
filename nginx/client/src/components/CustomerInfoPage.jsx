import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CustomerInfoPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            outside: false,
            brand: '',
            unitsPerZone: '',
            numZones: '',
            address: ''
        }
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

        // TODO: handle login logic here
        console.log('Customer info saved before going to calendar.');

        // We can call the App.handleEmpLoginButtonClick() method from here (we renamed it to just "onLoginClick" inside
        // of this component) because the App class passed the method to this class (EmployeeSignInPage) as a prop in
        // App.render(). This is one of the main ways components can work together in React. It sounds confusing, but
        // take a quick look at the render() method in App.js and it will make sense.

        this.props.onGoToCalendarButtonClick(this.state);
    };


    render() {
        return (
            <Form style={{
                width: '50%',
                margin: '0 auto',
                border: '1px solid black',
                padding: '20px'
            }} onSubmit={this.props.onGoToCalendarButtonClick}>
                <Row>
                    <Col>
                        <Form.Group controlId="formIsControllerOutside">
                            <Form.Label>Is the controller outside?</Form.Label>
                            <Form.Control name="outside" type="text" placeholder="yes or no" required pattern="yes|no"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formControllerBrand">
                            <Form.Label>What brand is your controller?</Form.Label>
                            <Form.Control name="brand" type="text" placeholder="brand" required pattern="[A-Za-z ]+"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formUnitsPerZone">
                            <Form.Label>How many units per zone?</Form.Label>
                            <Form.Control name="unitsPerZone" type="number" placeholder="# of units" required min="0"/>
                        </Form.Group>
                    </Col>
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
                <Button variant="primary" type="submit"
                        style={{margin: '30px', color: 'white', backgroundColor: 'blue'}}>
                    Book a new appointment
                </Button>
            </Form>
        );
    }
};

export default CustomerInfoPage;