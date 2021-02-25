import React from 'react';
import { Card, Col } from 'react-bootstrap'

const Moon = (props) => {
    
    return (
        <Card key={props.id} fluid="md" className='moon-card box-shadow' >
                <Card.Title>
                    <h3 className='planet-card-title'>{props.moon.name}</h3>
                </Card.Title>
        </Card>
    );
}

export default Moon;