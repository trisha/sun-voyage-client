import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'
const axios = require('axios')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const ASTROBIN_KEY = process.env.REACT_APP_ASTROBIN_KEY
const ASTROBIN_SECRET = process.env.REACT_APP_ASTROBIN_SECRET

const Planet = (props) => {

    console.log(props)

    let commentList
    
    if (props.planet.comments) {
        commentList = props.planet.comments.map((comment, i) => {
            return < Comment comment={comment} key={`comment-id-${i}`} />
        })
    } else {
        commentList = <p>No comments yet!</p>
    }

    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&count=5`)
    // .then(res => {
    //     console.log(res)
    // })

    // let subject = 'pluto'

    // console.log(ASTROBIN_KEY)
    // console.log(ASTROBIN_SECRET)
    // axios.get(`http://astrobin.com/api/v1/image/?subjects=M31&api_key=${ASTROBIN_KEY}&api_secret=${ASTROBIN_SECRET}&format=json`)
    // .then(res => {
    //     console.log(res)
    // })

    return (
        <div>
            <h2>{props.planet.name}</h2>

            <h4>Info:</h4>
            <p>Mass: {props.planet.mass.massValue}</p>
            <p>Gravity: {props.planet.gravity}</p>

            <h4>Comments: </h4>
            {commentList}

            < Link to={`/comments/add/${props.planet.id}`} ><button>Add To This Entry</button></Link>
        </div>
    );
}

export default Planet;