import React, { useState } from 'react';
import PlanetCard from './PlanetCard.js'
import Search from './Search.js'

const AllPlanets = (props) => {

    const [input, setInput] = useState('')
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = () => {
        setSearch(input)
    }

    let list = props.planetData.map((planet) => {
        return (
            < PlanetCard planet={planet} key={`planet-id-${planet.id}`} />
        )
    })

    return (
        <div>
            <div className='list-div'>
                <h2 className='planet-list-title'>List of all Planets</h2>
                <span>
                    < Search handleChange={handleChange} handleSubmit={handleSubmit} />
                </span>
            </div>

            {list}
        </div>
    );
}

export default AllPlanets;