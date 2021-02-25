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
                console.log('✌✌✌')
                console.log(res)
                //return JSON.stringify(res.data.searchTerm) 
                setUserComments([...userComments,res.data.searchTerm])
            })
    }, [])
// props.user (currentUser and info)
// props.planets (all planets and their infor)
    // const comments = props.planets.forEach( (planet,i) => {

    // })
    
    return (
        <div className='app-main'>
            {userComments.map((data,i)=>{
                console.log(`👏👏${data.planetName}`)
                return <>
                {/*----> Elyssa here is would be planet name and contenet so I will fix the state problem tomorrow and here just need design*/}
                    <h1>Planet Name:</h1>
                    <p>{data[0].planetName}</p>
                    <h1>content:</h1>
                    <p>{data[0].content}</p>
                </>
            })
            }
            { props.user.name }'s Comments
        </div>
    );
}

export default ProfileComments;