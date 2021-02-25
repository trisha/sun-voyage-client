import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL ='http://localhost:8000'
//const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(false)

    let handleEmail = (e) => {
        setEmail(e.target.value);
    }

    let handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email, password };
        console.log(REACT_APP_SERVER_URL)
        axios.post(`${REACT_APP_SERVER_URL}/auth/login`, userData)
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
        })
        .catch(error => {
            console.log(`Login error`, error)
            setError(true)
        });
    }

    if (props.user) return <Redirect to="/profile" user={props.user} />;

    let errorMessage = error ? (
        <p className='error'>Error logging in: Bad Credentials</p>
    ) : (null)

    return (
        <div className="card card-body signup-page">
            <h2 className="py-2 title bold signup-title-div">
                <span className='signup active-page'>Login</span>
            </h2>

            {errorMessage}

            <Form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmail} className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" required />
                </div>
                <button type="submit" className="btn link-button btn-primary float-right">Submit</button>
            </Form>
        
        </div>
    );
}

export default Login;   
