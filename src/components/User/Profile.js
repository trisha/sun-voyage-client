import React, { useState, useEffect } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
const moment = require('moment')
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const REACT_APP_SERVER_URL='http://localhost:8000'
//const APOD_KEY='xjTwiG8eZ4hulBTHXbVWpiSgYxoFUgEmpaLU3Hgo'
const axios = require('axios')

const Profile = (props) => {

    console.log(props.user)
    const [dailyPic, setDailyPic] = useState(null)

    

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
        <h1 className='title bold'>{props.user.name}</h1>
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>DOB:</strong> {props.user.DOB}</p> 
        <p><strong>Age (years):</strong> {moment().diff(`${props.user.DOB}`, 'years')}</p> 
        <p><strong>Weight (pounds):</strong> {props.user.weight}</p> 
        <button>Edit</button>
        <button onClick={viewComments}>View Comments</button>
    </div>) : <h4>Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4 app-main">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <Row className='app-main'>
            < Col >
                { userData }
            </Col>
        </Row>
    );

}

export default Profile;