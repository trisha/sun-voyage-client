import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'
const axios = require('axios')
const ASTROBIN_KEY = process.env.REACT_APP_ASTROBIN_KEY
const ASTROBIN_SECRET = process.env.REACT_APP_ASTROBIN_SECRET
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Planet = (props) => {

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/planets/display/${props.planetId}`) 
        // Returns info on the planet.
        .then(rdata => {
            console.log(rdata.data.planet[0])
            props.setPlanetData(rdata.data.planet[0])
        })
    }, [props.refreshPage])

    console.log('planet is rerendering')

    if (!props.planetData) {
        return (
            <p>Loading...</p>
        )
    } else {
            // Populate a value into comment list if any comments exist
            let commentList
            if (props.planetData.comments) {
                console.log(props.planetData)
                commentList = props.planetData.comments.map((comment, i) => {
                    return < Comment comment={comment} user={props.user} key={`comment-id-${i}`} />
                })
            } else {
                commentList = <p>No comments yet!</p>
            }

            // Planet info is defined here, outside of the return statement, due to the fact
            // that the way the data is processed changes based on which planet we're looking at - planets with days longer than Earth's require a different formula from planets with days shorter than Earth's, for example

            let planetDayLength
            if (Math.abs(props.planetData.sideralRotation) > 23.93) {
                planetDayLength = <p>A single day on {props.planetData.name} is {Math.round(( Math.abs(props.planetData.sideralRotation) / 24 ))} days on Earth!</p>
            } else {
                planetDayLength = <p>{props.planetData.name} has {Math.round(( 24 / Math.abs(props.planetData.sideralRotation) ))} day(s) in a single Earth Day!</p>
            } 

            let planetTimeToOrbit
            if (Math.round(props.planetData.sideralOrbit) > 365.256) {
                planetTimeToOrbit = <p>It takes {Math.round(props.planetData.sideralOrbit / 365.256)} years on Earth for {props.planetData.name} to orbit the sun</p>
            } else {
                planetTimeToOrbit = <p>It takes {Math.round(props.planetData.sideralOrbit)} days on Earth for {props.planetData.name} to orbit the sun</p>
            }

        return (
            <div>
                <h2>{props.planetData.name}</h2>
    
                <h4>Info:</h4>
                {planetDayLength}

                {planetTimeToOrbit}

                <p>On {props.planetData.name} you would weigh {Math.round((120 / 9.8) * ( props.planetData.gravity))} pounds!</p>

                <p>On {props.planetData.name} you would be {Math.round((25 * 364.25) / ( props.planetData.sideralOrbit))} years old!</p>
    
                <h4>Comments: </h4>
                {commentList}
    
                < Link to={`/comments/add/${props.planetData._id}`} ><button>Add To This Entry</button></Link>
            </div>
        );
    }
}

export default Planet;