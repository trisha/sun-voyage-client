import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const axios = require('axios')

const ProfileComments = (props) => {
    let [userComments, setUserComments] = useState([])
// props.user (currentUser and info)
// props.planets (all planets and their infor)
    // const comments = props.planets.forEach( (planet,i) => {

    // })
    
    return (
        <div className='app-main'>
            <p>comments</p>
        </div>
    );
}

export default ProfileComments;