import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Profile = (props) => {
    const handleProfile=()=>{
        console.log(`✔✔✔ ${localStorage.getItem('jwtToken')}`)
        console.log(props)
        axios({
            url: `${REACT_APP_SERVER_URL}/api/profile/123`,
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data: props.user.id}).then(res=>{console.log(res.data)})
            .catch(err=>{
                console.log(`🤞 ${err}`)
            })
    }
    console.log('💕')
    console.log(props.user);
    const userData = props.user ? 
    (<div>
        <h1>Profile</h1>
        <p><strong>Email:</strong> {props.user.email}</p> 
        <p><strong>ID:</strong> {props.user.id}</p> 
    </div>) : <h4>Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div>
            { props.user ? handleProfile() : errorDiv() }
        </div>
    );

}

export default Profile;