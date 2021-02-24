import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import Comment from './Comment.js'
import moment from 'moment'
const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Planet = (props) => {

    const [planetData, setPlanetData] = useState(null)

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/planets/display/${props.planetId}`) 
        // Returns info on the planet.
        .then(rdata => {
            // console.log(rdata.data.planet[0])
            setPlanetData(rdata.data.planet[0])
        })
    }, [props.refreshPage])

    if (!planetData) {
        return (
            <p>Loading...</p>
        )
    } else {
            // Populate a value into comment list if any comments exist
            let commentList
            if (planetData.comments) {
                console.log(planetData)
                commentList = planetData.comments.map((comment, i) => {
                    return < Comment comment={comment} user={props.user} key={`comment-id-${i}`} />
                })
            } else {
                commentList = <p>No comments yet!</p>
            }

            // Planet info is defined here, outside of the return statement, due to the fact
            // that the way the data is processed changes based on which planet we're looking at - planets with days longer than Earth's require a different formula from planets with days shorter than Earth's, for example

            let planetDayLength
            if (Math.abs(planetData.sideralRotation) > 23.93) {
                planetDayLength = <p>A single day on {planetData.name} is {Math.round(( Math.abs(planetData.sideralRotation) / 24 ))} day(s) on Earth!</p>
            } else {
                planetDayLength = <p>{planetData.name} has {Math.round(( 24 / Math.abs(planetData.sideralRotation) ))} day(s) in a single Earth Day!</p>
            } 

            let planetTimeToOrbit
            if (Math.round(planetData.sideralOrbit) > 365.256) {
                planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit / 365.256)} years on Earth for {planetData.name} to orbit the sun</p>
            } else {
                planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit)} days on Earth for {planetData.name} to orbit the sun</p>
            }

            let userData
            if (props.user) {
                userData = props.user
            } else {
                userData = {
                    weight: 150,
                    age: 30,
                    DOB: '2000-01-01'
                }
            }

        return (
            <div className='app-main'>
            <Row className='planet-page'>
                <Col className='col-12' >
                    <div className={`planet-page-image ` + planetData.name.replace(/[0-9]/g, '')}>
                        <h2 className='planet-page-title'>{planetData.name}</h2>

                        <Row>
                            <Col className='planet-info-div col-5'>
                                {planetDayLength}

                                {planetTimeToOrbit}

                                <p>If you weigh {userData.weight} pounds on Earth, you would weigh {Math.round((userData.weight / 9.8) * ( planetData.gravity))} pound(s) on {planetData.name}!</p>

                                <p>On {planetData.name} you would be {Math.round((moment().diff(`${userData.DOB}`, 'years') * 364.25) / ( planetData.sideralOrbit))} years old!</p>

                                <p>Your next birthday on {planetData.name} will be on {moment().diff(`${userData.DOB}`, 'days') / planetData.sideralOrbit}</p>
                            </Col>
                        </Row>                   
                    </div>
                </Col>
                
            </Row>
            <Row className='planet-comment-div'>
                    <h4>Comments: </h4>
                    {commentList}
        
                    < Link to={`/comments/add/${planetData._id}`} ><button className='link-button'>Add To This Entry</button></Link>
                </Row>
            </div>
        );
    }
}

export default Planet;