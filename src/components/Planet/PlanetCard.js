import React from 'react';
import { Link } from 'react-router-dom';

const PlanetCard = (props) => {
    return (
        <div className='planet-card' key={props.id}>
            <span>
                <h3 className='planet-card-name'>{props.planet.name}{'   '}</h3>
                <span className='planet-card-comments text-muted'>Comments: {props.planet.comments.length}</span>
            </span>

            < Link to={`/planets/display/${props.id}`} ><button className='link-button'>Click me to see page</button></Link>
        </div>
    );
}

export default PlanetCard;