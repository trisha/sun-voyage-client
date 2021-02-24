import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')

const ProfileEdit = (props) => {
    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    // console.log(props.user)
    const [dailyPic, setDailyPic] = useState(null)
    
    // EDIT PROFILE. 
    const [editMode, setEditMode] = useState(false) // Toggle on/off when user clicks Edit/Save button.
    // Storing temporary states. 
    const [editingName, setEditingName] = useState(props.user.name)
    const [editingDOB, setEditingDOB] = useState('')
    const [editingWeight, setEditingWeight] = useState('') 

    // const editName = (e) => setEditingName(e.target.value)
    // const editDOB = (e) => {
    //     setEditingDOB(e.target.value)
    //     console.log(editingDOB)
    // }
    console.log("Props.user.name BEFORE useEffect: ", props.user.name)

    useEffect(() => {
        console.log("Props.user.name WITHIN useEffect: ", props.user.name)
        setEditingName(props.user.name)
        console.log(editingName)
        // axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${props.user.DOB}&end_date=${props.user.DOB}`)
        // .then(res => {
        //     // console.log('DOB response')
        //     // console.log(res)
        //     setDailyPic(res.data[0])
        // })
    }, [props])

    // Call this function when the user clicks on the 'Edit' button.
    // Needs to be defined above onClick={editProfile}.
    const editProfile = () => {
        setEditMode(true)
    }
    const saveProfile = () => {
        setEditMode(false)
        // Update values with the state values.
        // Send user information to backend so that it can update the user based on ID.
        // Axios, put, 
    }

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
    </div>) : <h4>User information loading...</h4>
    

    const editUserData = (
        <div>
            <p>This is the edit profile view  !!!</p>

            <p><strong>Name:</strong> <input type='text' value={editingName} /></p> 
            {/* <p><strong>Name:</strong> <input type='text' defaultValue={props.user.name}>{props</input></p>  */}
            <p><strong>Email:</strong> <input type='string' defaultValue={props.user.email}></input></p> 
            <p><strong>DOB:</strong> <input type='string' defaultValue={props.user.DOB} placeholder="YYYY-MM-DD"></input></p> 
            <p><strong>Age:</strong> {moment().diff(`${props.user.DOB}`, 'years')} years old</p> 
            <p><strong>Weight: </strong> <input type='string' defaultValue={props.user.weight}></input> pounds </p> 
            <button onClick={saveProfile}>Save</button>
        </div>
    )
    
    return (
        <div className='app-main'>
            { dailyPic ? <p>{dailyPic.explanation}</p> : <p>Loading image...</p> }
            { editMode ? editUserData : userData }
        </div>
    );

}

export default ProfileEdit;