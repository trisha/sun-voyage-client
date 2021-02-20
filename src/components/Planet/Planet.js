import React from 'react';

const Planet = (props) => {
    return (
        <div>
            <p>Hello, this is {props.planet.name}</p>

            <p>Here are some cool planet facts! Wow!</p>
        </div>
    );
}

export default Planet;