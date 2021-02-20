import React from 'react';
import PlanetCard from './PlanetCard.js'

const AllPlanets = (props) => {

    let list = props.planetData.map(planet => {
        return (
            <div>
                < PlanetCard planet={planet} />
            </div>
        )
    })

    return (
        <div>
            <p>List of all Planets</p>
            {list}
        </div>
    );
}

export default AllPlanets;