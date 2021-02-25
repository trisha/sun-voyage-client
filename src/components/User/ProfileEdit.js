import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from '../../utils/setAuthToken';
const moment = require('moment')
//const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')
const APOD_KEY='xjTwiG8eZ4hulBTHXbVWpiSgYxoFUgEmpaLU3Hgo'
const ProfileEdit = (props) => {
    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    let [dailyPic, setDailyPic] = useState(null)
    // Our temporary edit states.
    let [editingName, setEditingName] = useState(props.user.name)
    let [editingDOB, setEditingDOB] = useState(props.user.DOB)
    let [editingAge, setEditingAge] = useState(props.user.age)
    let [editingWeight, setEditingWeight] = useState(props.user.weight) 
    // For redirecting to profile page after we save our changes.
    let [redirect, setRedirect] = useState(false)
    
    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${props.user.DOB}&end_date=${props.user.DOB}`)
        .then(res => {
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
        axios({
            url: `${process.env.REACT_APP_SERVER_URL}/auth/profile/edit`,
            method: 'PUT',
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data:{
              'profile': JSON.stringify(profile) // Convert to JSON object so we can pass it via axios.
            }
        })
        .then( res => {
            console.log("The response data is: ", res.data)
            console.log("updateUser is currently: ", props.updateUser)
            redirect ? setRedirect(false) : setRedirect(true)

            console.log("updateUser is: ", props.updateUser)
            props.updateUser ? props.setUpdateUser(false) : props.setUpdateUser(true)
            console.log("updateUser is now: ", props.updateUser)

            // props.refreshPage ? props.setRefreshPage(false) : props.setRefreshPage(true)
            // console.log("updateUser is now: ", props.updateUser)
        })


        // Below code is the combined code. Doesn't work because it says "We have an error 🤞: InvalidTokenError: Invalid token specified"
        // My guess is that when I create a new token, it invalidates the old one. And then I never reassign the new token.
        // Had to use localStorage.clear() command in console to undo the mess.
        // https://stackoverflow.com/questions/43886878/auth0-and-vue-error-in-render-function-invalidtokenerror-invalid-token-speci
        /*
        .then(response => {
            const { token } = response.data;
            console.log("😍 token: ", token)
            console.log("🥳 { token }: ", { token })
            // Save token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            console.log(decoded)
            // Set current user
            props.nowCurrentUser(decoded);

            redirect ? setRedirect(false) : setRedirect(true)
        })
        */



        // .then(response => {
        //     const { token } = response.data;
        //     console.log("😍 token: ", token)
        //     console.log("🥳 { token }: ", { token })
        //     // Save token to localStorage
        //     localStorage.setItem('jwtToken', token);
        //     // Set token to auth header
        //     setAuthToken(token);
        //     // Decode token to get the user data
        //     const decoded = jwt_decode(token);
        //     console.log(decoded)
        //     // Set current user
        //     props.nowCurrentUser(decoded);
        // })
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
                <p><label htmlFor="name"><strong>Name:</strong></label>
                <input type='text' value={editingName} onChange={editName} name="name" /></p> 

                <p><label htmlFor="email"><strong>Email:</strong></label>
                {props.user.email}</p> 

                <p><label htmlFor="Date of Birth"><strong>DOB:</strong></label>
                <input type='text' value={editingDOB} placeholder="YYYY-MM-DD" onChange={editDOB} name="DOB" /></p> 
                
                <p><label htmlFor="age"><strong>Age:</strong></label> {moment().diff(`${editingDOB}`, 'years')} years old</p> 
                
                <p><label htmlFor="weight"><strong>Weight: </strong></label> <input type='text' value={editingWeight} onChange={editWeight} /> pounds </p> 
                
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