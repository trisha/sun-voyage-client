import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
//const REACT_APP_SERVER_URL ='http://localhost:8000'
const REACT_APP_SERVER_URL=process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
    let [email, setEmail] = useState('') 
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [weight, setWeight] = useState(null)
    let [DOB, setDOB] = useState(null)
    let [confirmPassword, setConfirmPassword] = useState('')
    let [redirect, setRedirect] = useState(false)
    let [error, setError] = useState(false)

    const handleName = (e) => setName(e.target.value)
    const handleWeight = (e) => setWeight(e.target.value)
    const handleDOB = (e) => setDOB(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)

    // Have to set props to constants, since props.nowCurrentUser unavailable at nested child levels--get error message that it's not a function.
    // const nowCurrentUser = () => props.nowCurrentUser 
    // const setUpdateUser = () => props.setUpdateUser
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(password, confirmPassword)
        if (password === confirmPassword) {
            const newUser = { name, weight, DOB, email, password }
            // console.log(`${REACT_APP_SERVER_URL}/auth/signup`)
            axios.post(`${REACT_APP_SERVER_URL}/auth/signup`, newUser)
            .then(response => {
                setRedirect(true)
                /* Unable to automatically log in and redirect to profile after signing up.
                const token = response.data
                // console.log("⭐️ token: ", token)
                // Save token to localStorage.
                localStorage.setItem('jwtToken', token);
                // Set token to auth header.
                setAuthToken(token);
                // Decode token to get the user data.
                const decoded = jwt_decode(token);
                console.log("JWT decoded token is: ", decoded)
                // Set current user.
                nowCurrentUser(decoded)
                setUpdateUser(true)
                // Redirect to profile page after signing up and being logged in.
                // https://stackoverflow.com/questions/53900739/redirection-using-axios-and-react
                window.location = "/profile" 
                */
            })        
            .catch(error => {
                console.log("Error signing up: ", error)
                setError(true)
            });
        }
    }

    // Trisha wrote an article on how to pass in props through Redirects: https://patricia-pan.medium.com/react-router-dom-how-to-pass-in-props-within-a-redirect-d414a46bcd60
    if (redirect) return <Redirect to={ {pathname: '/login', state: {email: email}} } />

    let errorMessage = error ? (
        <p className='error'>Error creating account</p>
    ) : (null)

    return (
        <div className="card card-body signup-page">
        <h2 className="py-2 title bold signup-title-div">
            <span className='signup'>Signup</span>
        </h2>
        {errorMessage}
        <Form onSubmit={handleSubmit} className='signup-form'>
            <Form.Row className="form-group">
                <label htmlFor="name">Name<span className="red-asterisk">*</span></label>
                <input type="text" name="name" value={name} onChange={handleName} className="form-control" required />
            </Form.Row>
            <Form.Row className="form-group">
                <Col>
                <label htmlFor="weight">Weight (lbs)</label>
                <input type="number" name="weight" value={weight} onChange={handleWeight} className="form-control"/>
                </Col>
                <Col>
                <label htmlFor="DOB">Date of Birth</label>
                <input type="date" name="DOB" value={DOB} onChange={handleDOB} className="form-control"/>
                </Col>
            </Form.Row>
            <Form.Row className="form-group">
                <label htmlFor="email">Email<span className="red-asterisk">*</span></label>
                <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" required />
            </Form.Row>
            <div className="form-group">
                <label htmlFor="password">Password <em>(min 5 chars)</em><span className="red-asterisk">*</span></label>
                <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" required />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password<span className="red-asterisk">*</span></label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control" required/>
            </div>
            <div>
                <em><span className="red-asterisk">*</span> indicates required field.</em>
            </div>
            <button type="submit" className="link-button btn btn-primary float-right">Submit</button>
        </Form>
    </div>     
    );
}

export default Signup;
