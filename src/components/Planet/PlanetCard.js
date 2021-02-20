import React from 'react';
import { Link } from 'react-router-dom';

const PlanetCard = (props) => {
    return (
        <div>
            <span>Hello, this is {props.planet.name}......</span>

            < Link to={`/planets/display/${props.planet.id}`} ><button>Click me to see page</button></Link>
        </div>
    );
}

export default PlanetCard;