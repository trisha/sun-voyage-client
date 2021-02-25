import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const axios = require('axios')

const ProfileComments = (props) => {
    let [userComments, setUserComments] = useState([])
    useEffect(() => {
        axios({
            url: `http://localhost:8000/auth/profile`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
            })
            .then(res=>{
                // console.log('✌✌✌')
                // console.log(res)
                return JSON.stringify(res.data.searchTerm) 
                //setUserComments([...userComments,res.data.searchTerm])
            })
            .then(response=>{
                setUserComments([...userComments,response])
                console.log(response)
            })
    }, [])
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