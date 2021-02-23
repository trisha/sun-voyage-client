import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'
const axios = require('axios')
const ASTROBIN_KEY = process.env.REACT_APP_ASTROBIN_KEY
const ASTROBIN_SECRET = process.env.REACT_APP_ASTROBIN_SECRET
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Planet = (props) => {

    const [planetData, setPlanetData] = useState('')

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/planets/display/${props.planetId}`)
        .then(rdata => {
          setPlanetData(rdata.data.planet[0])
        })
    }, [])

    let commentList
    
    if (planetData.comments) {
        commentList = planetData.comments.map((comment, i) => {
            return < Comment comment={comment} key={`comment-id-${i}`} />
        })
    } else {
        commentList = <p>No comments yet!</p>
    }

    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&count=5`)
    // .then(res => {
    //     console.log(res)
    // })
    
    // axios.get(`https://astrobin.com/api/v1/image/?subjects=M31&api_key=${ASTROBIN_KEY}&api_secret=${ASTROBIN_SECRET}&format=json`)
    // .then(res => {
    //     console.log('Axios response: ' + res)
    // })

    if (!planetData) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <div>
                <h2>{planetData.name}</h2>
    
                <h4>Info:</h4>
                <p>{planetData.name} has {Math.round(( 24 / planetData.sideralRotation ))} days in a single Earth Day!</p>
                <p>It takes {Math.round(( 24 / planetData.sideralRotation ) * 365.23)} days on Ceres, and {Math.round(planetData.sideralOrbit)} days on Earth for {planetData.name} to orbit the sun</p>
                <p>On {planetData.name} you would weigh {Math.round((120 / 9.8) * ( planetData.gravity))} pounds!</p>
                <p>On {planetData.name} you would be {Math.round((25 * 364.25) / ( planetData.sideralOrbit))} years old!</p>
    
                <h4>Comments: </h4>
                {commentList}
    
                < Link to={`/comments/add/${planetData._id}`} ><button>Add To This Entry</button></Link>
            </div>
        );
    }
}

export default Planet;