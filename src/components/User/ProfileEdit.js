import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
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
    // For redirecting to profile page after we save our changes.
    const [redirect, setRedirect] = useState(false)
    
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
        setRedirect(false)
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
            name: editingName,
            DOB: editingDOB,
            age: editingAge,
            weight: editingWeight
        }

        // axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/profile/edit`, profile)
        // .then( results => {
        //     console.log(results)
        //     // access results here. 
        //     // Update login token.
        //     // Redirect to Profile page.
        // })

        axios({
            url: `${process.env.REACT_APP_SERVER_URL}/auth/profile/edit`,
            method: 'PUT',
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data:{
              'profile': JSON.stringify(profile) // Convert to JSON object so we can pass it via axios.
            }
        }).then( res => {
            console.log(res.data)
            setRedirect(true)
            props.refreshPage ? props.setRefreshPage(false) : props.setRefreshPage(true) // Toggle between the two every time a change is made, to refresh redirected profile view with new info.
        })
        .catch(err=>{
        console.log(`We have an error 🤞: ${err}`)
        })
        // console.log("Attempting to save user data.")
        // console.log("Profile is: ", profile)
    }

    // If we hit the save button.
    if (redirect) return <Redirect to={'/profile'} />

    const editUserData = (
        <div>
            {/* How to submit form data: https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html */}
            <form onSubmit={saveProfile}>
                <p><label for="name"><strong>Name:</strong></label>
                <input type='text' value={editingName} onChange={editName} name="name" /></p> 

                <p><label for="email"><strong>Email:</strong></label>
                {props.user.email}</p> 

                <p><label for="Date of Birth"><strong>DOB:</strong></label>
                <input type='text' value={editingDOB} placeholder="YYYY-MM-DD" onChange={editDOB} name="DOB" /></p> 
                
                <p><label for="age"><strong>Age:</strong></label> {moment().diff(`${editingDOB}`, 'years')} years old</p> 
                
                <p><label for="weight"><strong>Weight: </strong></label> <input type='text' value={editingWeight} onChange={editWeight} /> pounds </p> 
                
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