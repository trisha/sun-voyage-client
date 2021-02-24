import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')

const Profile = (props) => {

    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    console.log(props.user)
    const [dailyPic, setDailyPic] = useState(null)

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${props.user.DOB}&end_date=${props.user.DOB}`)
        .then(res => {
            console.log('DOB response')
            console.log(res)
            setDailyPic(res.data[0])
        })
    }, [])

    // DETERMINE WHETHER TO DISPLAY RENDER VIEW OR EDIT VIEW.
    // Call this function when the user clicks on the 'Edit' button.
    const editProfile = () => {
        setEditMode(true)
    }

    // RENDER PROFILE.
    const userData = props.user ? 
    (<div>
        <h1>Profile</h1>
        <p><strong>Name:</strong> {props.user.name}</p> 
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>DOB:</strong> {props.user.DOB}</p> 
        <p><strong>Age (years):</strong> {moment().diff(`${props.user.DOB}`, 'years')}</p> 
        <p><strong>Weight (pounds):</strong> {props.user.weight}</p> 
        <button onClick={editProfile}>Edit</button>
    </div>) : <h4>User information loading...</h4>

    // We don't need below because backend automatically redirects us to Login page if it requires a token, and a user isn't logged in.
    /*
    const errorDiv = () => {
        return (
            <div className="text-center pt-4 app-main">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    */
    
    // EDIT PROFILE. 
    const [editMode, setEditMode] = useState(false) // Toggle on/off when user clicks Edit/Save button.
    // Storing temporary states. 
    const [editingName, setEditingName] = useState('')
    const [editingDOB, setEditingDOB] = useState('')
    const [editingWeight, setEditingWeight] = useState('') 

    const editUserData = (
        <p>This is the edit profile view!!!</p>
    )
    
    return (
        <div className='app-main'>
            { dailyPic ? <p>{dailyPic.explanation}</p> : <p>Loading image...</p> }
            { editMode ? editUserData : userData }
            {/* { props.user ? userData : errorDiv() } */}
        </div>
    );

}

export default Profile;