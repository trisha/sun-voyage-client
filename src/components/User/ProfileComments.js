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
                console.log(res.data.searchTerm.length)
                //return JSON.stringify(res.data.searchTerm) 
                if(res.data.searchTerm.length){

                    setUserComments([...userComments,res.data.searchTerm])
                }
            })
    }, [])
// props.user (currentUser and info)
// props.planets (all planets and their infor)
    // const comments = props.planets.forEach( (planet,i) => {

    // })
    if(userComments.length){
        console.log(userComments.length)
        return (
            <div className='app-main'>
                {userComments.map((data,i)=>{
                    
                    return <>
                    {/*----> Elyssa here is would be planet name and contenet so I will fix the state problem tomorrow and here just need design*/}
                        <h1>Planet Name:</h1>
                        <p>{data[0].planetName}</p>
                        <h1>content:</h1>
                        <p>{data[0].content}</p>
                    </>
                })
                }
            </div>
        );
    }
    else{
        return(
            <p>You don't have comment yet</p>
        )
    }
}

export default ProfileComments;