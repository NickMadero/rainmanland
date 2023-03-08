import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CustomerInfoPage = (props) => {
    return (
        <Form style={{
            width: '50%',
            margin: '0 auto',
            border: '1px solid black',
            padding: '20px'
        }}>
            <Row>
                <Col>
                    <Form.Group controlId="formIsControllerOutside">
                        <Form.Label>Is the controller outside?</Form.Label>
                        <Form.Control type="text" placeholder="yes or no" required pattern="yes|no" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formControllerBrand">
                        <Form.Label>What brand is your controller?</Form.Label>
                        <Form.Control type="text" placeholder="brand" required pattern="[A-Za-z ]+" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formNumZones">
                        <Form.Label>How many zones?</Form.Label>
                        <Form.Control type="number" placeholder="# of zones" required min="0" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="emailAddress">
                        <Form.Label>What is your email address?</Form.Label>
                        <Form.Control type="number" placeholder="email Address" required min="0" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="formAddress">
                <Form.Label>What is your address?</Form.Label>
                <Form.Control type="text" placeholder="enter Address" required />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId="FirstName">
                        <Form.Label>Enter First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" required pattern="[A-Za-z ]+" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="LastName">
                        <Form.Label>Enter Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" required pattern="[A-Za-z ]+" />
                    </Form.Group>
                </Col>
            </Row>
            <Button  onClick={props.onGoToCalendarButtonClick} variant="primary" type="submit" style={{ margin: '30px', color: 'white', backgroundColor: 'blue' }}>
                Book a new appointment
            </Button>
        </Form>
    );
};

export default CustomerInfoPage;
