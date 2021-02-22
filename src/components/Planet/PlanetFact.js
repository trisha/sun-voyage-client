import React, { useState } from 'react';
import PlanetCard from './PlanetCard.js'
import Search from './Search.js'

const PlanetFact = (props) => {
    return (
        <li>
            {props.key}: {props.value}
        </li>
    );
}

export default PlanetFact;