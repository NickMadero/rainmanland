import React from 'react';
import {ReactComponent as ReactLogo} from './RmlLogo.svg';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../style/LandingPage.css';

function LandingPage(props) {
    let navigate = useNavigate();

    const goToCalendar = () => {
        let path = `appointment-info`;
        navigate(path);
    }

    const goToEmployeeLogin = () => {
        let path = 'employee-login';
        navigate(path);
    }

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col className="text-center">
                        <ReactLogo className="logo" width="500" height="350" />
                        <Card className="custom-card">
                            <Card.Body>
                                <h1>Rainmanland Self-Booking Calendar</h1>
                                <p>
                                    Welcome to Rainmanland Self-Booking Calendar, an intelligent scheduling solution that
                                    optimizes appointment organization and delivers cost savings right to your pocket.
                                    Discover how easy it is to book your next appointment with our intuitive interface and
                                    enjoy a seamless experience.
                                </p>
                                <Button variant="primary" size="lg" onClick={goToCalendar}>
                                    Book Now!
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className="employee-login">
                <Button onClick={goToEmployeeLogin} variant="outline-secondary">
                    Employee Login
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;

