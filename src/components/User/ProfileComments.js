import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const axios = require('axios')

// props = user (currentUser), planets (data for all planets)
const ProfileComments = (props) => {
    let [userComments, setUserComments] = useState([])
    useEffect(() => {
        axios({
            url: `http://localhost:8000/auth/profile/comments`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then( res => { // Backend requires that the user be logged in, so it only returns comments belonging to the logged in user.
            // console.log("res is: ", res)
            // console.log("res.data.userComments is: ", res.data.userComments)
            setUserComments(res.data.userComments)
            // userComments is an array of objects, [{…}, {…}, {…}]:
            // 0: {id: "6037ecad8cbb7bb138af86c5", planetName: "1 Ceres", content: "Hello, I'm adding a comment!!"}
            // 1: {id: "60382630c01839d1075f8f98", planetName: "1 Ceres", content: "Editing"}
            // 2: {id: "60382bdd36abb4d5cd2ed28d", planetName: "136199 Eris", content: "Not Trisha adding a comment"}
        })
    }, [props])

    // console.log("planets data we have is: ", props.planets) // Works
    // console.log("props.planets[0] ", props.planets[0]) // Works
    // console.log("props.planets[0].gravity ", props.planets[0].gravity) // Doesn't work; can't find gravity of undefined
    // console.log("props.planets[0] ", props.planets[0].comments) // Doesn't work; can't find comments of undefined
    // Aray of objects: (13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // 0: {mass: {…}, comments: Array(18), _id: "603720f7d1b7a2466c97cf97", name: "1 Ceres", gravity: 0.28, …}
    // 1: {mass: {…}, comments: Array(8), _id: "603720f7d1b7a2466c97d023", name: "Mercury", gravity: 3.7, …}
    // Where props.planets[0].comments:


    // List of planets that the user has commented on.
    let filteredPlanets = []
    userComments.forEach( (comment, i) => {
        if ( !filteredPlanets.includes(comment.planetName) ) {
            filteredPlanets.push(comment.planetName)
        }
    })
    
    let planetComments
    if (userComments.length > 0) {
        planetComments = filteredPlanets.map( (planet, i) => (
            <div>
                <h3>Comments on {planet}</h3>
                {userComments.map( (comment, i) => {
                    if (comment.planetName == planet) {
                        return (
                            <div className="commentBox">                            
                                <div>Content: {comment.content}</div>
                                <div>Created at: {comment.createdAt}</div>
                                <div>Updated at: {comment.updatedAt}</div>
                            </div>
                        )
                    }
                })}
            </div>
        ))
    }
    
    return (
        <div style={{backgroundColor:'white'}}>
            <h1>{props.user.name}'s Comments</h1>
            {planetComments ? planetComments : <p>You don't have any comments yet</p>}
        </div>
    )
}

export default ProfileComments;




