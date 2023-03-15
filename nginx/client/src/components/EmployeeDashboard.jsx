import React from 'react';
import { Button, Container, Card, Row } from 'react-bootstrap'

function EmployeeDashboard(props) {

    let card = props.jobsToday.map((val, key) => {
        if (val.is_outdoor) {
            val.controller_location = "Outdoor";
        }
        else {
            val.controller_location = "Indoor";
        }
        return (
            <React.Fragment>
                <Card>
                    <Card.Header as="h5">{val.job_address}</Card.Header>
                    <Card.Body>
                        <Card.Title>{val.customer_name}</Card.Title>
                        <Card.Subtitle>Appointment window is {val.time_range}</Card.Subtitle>
                        <Card.Text>
                            {val.controller_location} {val.controller_brand} controller with {val.num_zones} zones, {val.heads_per_zone} sprinklers per zone.
                        </Card.Text>
                        <Button variant="primary">Mark Complete</Button>
                        <Button variant="primary">Open Directions in Google Maps</Button>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    })

    return (
        <div className='App'>
            <h1>Today's Jobs for Crew {props.crewNum}</h1>
            <br /><br />
            <Container>
                <Row>
                    {card}
                </Row>
            </Container>
        </div>
    );
}

export default EmployeeDashboard;