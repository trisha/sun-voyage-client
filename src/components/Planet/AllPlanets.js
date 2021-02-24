import React, { useState } from 'react';
import { CardColumns } from 'react-bootstrap'
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

    let list = props.planetData.map((planet, i) => {
        return (
            < PlanetCard planet={planet} id={i} key={`planet-id-${planet.name}`} />
        )
    })

    return (
        <div className='list-div container'>
            <div>
                < CardColumns >
                    {list}
                </ CardColumns >
            </div>
            {/* <span>
                < Search handleChange={handleChange} handleSubmit={handleSubmit} />
            </span> */}
        </div>
    );
}

export default AllPlanets;