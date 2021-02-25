import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
const moment = require('moment')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')

const Profile = (props) => {

    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    // console.log(props.user)
    const [dailyPic, setDailyPic] = useState(null)

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${props.user.DOB}&end_date=${props.user.DOB}`)
        .then(res => {
            // console.log('DOB response')
            // console.log(res)
            setDailyPic(res.data[0])
        })
    }, [])

    const [editMode, setEditMode] = useState(false) // Toggle on when user clicks Edit button.
    const [viewCommentsMode, setViewCommentsMode] = useState(false) // Toggle on when user clicks 'View Comments' button.
    
    // Editing state triggers React to refresh. (Unable to directly return the Redirect)
    const editProfile = () => setEditMode(true)
    const viewComments = () => setViewCommentsMode(true)

    if (editMode) return <Redirect to={'/profile/edit'} />
    if (viewCommentsMode) return <Redirect to={'/profile/comments'} />

    // RENDER PROFILE.
    const userData = props.user ? 
    (<div>
        <h1>Profile</h1>
        <p><strong>Name:</strong> {props.user.name}</p> 
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>DOB:</strong> {props.user.DOB}</p> 
        <p><strong>Age:</strong> {moment().diff(`${props.user.DOB}`, 'years')} years old</p> 
        <p><strong>Weight:</strong> {props.user.weight} pounds</p> 
        <button onClick={editProfile}>Edit</button>
        <button onClick={viewComments}>View Comments</button>
    </div>) : <h4>User information loading...</h4>
    
    return (
        <div className='app-main'>
            { dailyPic ? <p>{dailyPic.explanation}</p> : <p>Loading image...</p> }
            { userData }
        </div>
    );
}

export default Profile;