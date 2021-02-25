import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const moment = require('moment')
//const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')
const APOD_KEY='xjTwiG8eZ4hulBTHXbVWpiSgYxoFUgEmpaLU3Hgo'
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
    const saveProfile = (e) => {
        e.preventDefault() // To prevent refresh.
        const profile = {
            // Set new values.
        }

        axios.put('/profile/edit', profile)
        .then( results => {
            // access results here. 
            // Update login token.
            // Redirect to Profile page.
        })
        console.log("Attempting to save user data.")
        console.log(editingName, editingDOB, editingAge, editingWeight)
    }

    const editUserData = (
        <div>
            <form onSubmit={saveProfile}>
                <p><label><strong>Name:</strong></label>
                <input type='text' value={editingName} onChange={editName} name="name" /></p> 

                <p><label><strong>Email:</strong></label>
                {props.user.email}</p> 

                <p><label><strong>DOB:</strong></label>
                <input type='text' value={editingDOB} placeholder="YYYY-MM-DD" onChange={editDOB} name="DOB" /></p> 
                
                <p><strong>Age:</strong> {moment().diff(`${editingDOB}`, 'years')} years old</p> 
                
                <p><strong>Weight: </strong> <input type='text' value={editingWeight} onChange={editWeight} /> pounds </p> 
                
                <input type="submit" value="Save" onClick={saveProfile} />
                {/* <button onClick={saveProfile}>Save</button> */}
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