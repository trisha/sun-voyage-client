import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')

const ProfileEdit = (props) => {
    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    const [dailyPic, setDailyPic] = useState(null)
    // Our temporary edit states.
    const [editingName, setEditingName] = useState(props.user.name)
    const [editingDOB, setEditingDOB] = useState(props.user.DOB)
    const [editingAge, setEditingAge] = useState(props.user.age)
    const [editingWeight, setEditingWeight] = useState(props.user.weight) 
    
    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${props.user.DOB}&end_date=${props.user.DOB}`)
        .then(res => {
            // console.log('DOB response')
            // console.log(res)
            setDailyPic(res.data[0])
        })
        // Need to include the below within useEffect dependent on [props].
        // Otherwise, when we initialize our useStates, the prop hasn't loaded yet and editingName would start off as empty.
        setEditingName(props.user.name)
        setEditingDOB(props.user.DOB)
        setEditingAge(props.user.age)
        setEditingWeight(props.user.weight) 
    }, [props])    

    // Our onChange functions:
    const editName = (e) => setEditingName(e.target.value)
    const editDOB = (e) => {
        setEditingDOB(e.target.value)
        console.log(moment().diff(`${e.target.value}`, 'years'))
        setEditingAge(moment().diff(`${e.target.value}`, 'years'))
    }
    const editWeight = (e) => setEditingWeight(e.target.value)
    
    // Our onClick submission.
    const saveProfile = () => {
        // Send user information to backend so that it can update the user based on ID.
        // Axios.put 
        console.log("Attempting to save user data.")
        console.log(editingName, editingDOB, editingAge, editingWeight)
    }

    const editUserData = (
        <div>
            <form>
                <p><strong>Name:</strong> <input type='text' value={editingName} onChange={editName} /></p> 
                {/* <p><strong>Name:</strong> <input type='text' defaultValue={props.user.name}>{props</input></p>  */}
                <p><strong>Email:</strong> {props.user.email}</p> 
                <p><strong>DOB:</strong> <input type='text' value={editingDOB} placeholder="YYYY-MM-DD" onChange={editDOB} /></p> 
                <p><strong>Age:</strong> {moment().diff(`${editingDOB}`, 'years')} years old</p> 
                <p><strong>Weight: </strong> <input type='text' value={editingWeight} /> pounds </p> 
                <button onClick={saveProfile}>Save</button>
            </form>
            
        </div>
    )
    
    return (
        <div className='app-main'>
            { dailyPic ? <p>{dailyPic.explanation} {dailyPic.url} or {dailyPic.hdurl}</p> : <p>Loading image...</p> }
            { editUserData }
        </div>
    );

}

export default ProfileEdit;