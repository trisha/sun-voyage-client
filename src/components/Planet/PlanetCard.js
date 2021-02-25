import React from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PlanetCard = (props) => {
    
    return (
        <>
            <Card style={{ width: '90%', height: '15rem' }} key={props.id} fluid="md" className={'planet-card box-shadow ' + props.planet.name.replace(/[0-9]/g, '')}>
                <Card.Body style={{ backgroundImage: `url(../../Images/6033f85cf487a44600fe84af.png)`}}>
                    <Card.Title><h3 className='planet-card-title'>{props.planet.name}</h3></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Comments: {props.planet.comments.length}</Card.Subtitle>
                    
                    < Link to={`/planets/display/${props.planet._id}`} ><span className='exp-color-box '><button className='link-button box-shadow'>See Page</button></span></Link>
                    {/* < Link to={`/planets/display/${props.planet._id}`} ><button className='link-button box-shadow'>View Archives</button></Link> */}
                </Card.Body>
            </Card>
        </>
    );
}

export default PlanetCard;