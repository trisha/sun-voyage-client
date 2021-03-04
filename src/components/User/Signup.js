import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
//const REACT_APP_SERVER_URL ='http://localhost:8000'
const REACT_APP_SERVER_URL =process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [weight, setWeight] = useState(null)
    let [DOB, setDOB] = useState(null)
    let [confirmPassword, setConfirmPassword] = useState('')
    let [redirect, setRedirect] = useState(false)
    let [error, setError] = useState(false)

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleWeight = (e) => {
        setWeight(e.target.value);
    }

    const handleDOB = (e) => {
        console.log(e.target.value)
        setDOB(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(password,confirmPassword)
        if (password === confirmPassword) {
            const newUser = { name, weight, DOB, email, password }
            // console.log(`${REACT_APP_SERVER_URL}/auth/signup`)
            axios.post(`${REACT_APP_SERVER_URL}/auth/signup`, newUser)
            .then(response => {
                console.log('Signup response: ' + response);


                const token = response.data
                console.log("😍 token: ", token)
                console.log("🥳 { token }: ", { token })
                // Save token to localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to auth header
                setAuthToken(token);
                // Decode token to get the user data
                const decoded = jwt_decode(token);
                console.log("JWT decoded token is: ", decoded)
                // Set current user
                props.nowCurrentUser(decoded);

                setRedirect(true)
            })        
            .catch(error => {
                console.log("Error signing up: ", error)
                setError(true)
            });

            // After creating account, log them in.
            // BELOW CODE ISN'T WORKING; gt an error signing in user: false
            /*
            const userData = { email, password }
            axios.post(`${REACT_APP_SERVER_URL}/auth/login`, userData)
            .then( response => {
                const token = response.data
                console.log("😍 token: ", token)
                console.log("🥳 { token }: ", { token })
                // Save token to localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to auth header
                setAuthToken(token);
                // Decode token to get the user data
                const decoded = jwt_decode(token);
                console.log("JWT decoded token is: ", decoded)
                // Set current user
                props.nowCurrentUser(decoded);
            })
            .catch( err => {
                console.log("Error signing in user: ", error)
                setError(true)
            })
            */
        }
    }

    if (redirect) return <Redirect to="/login" />

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
                <label htmlFor="password">Password<span className="red-asterisk">*</span></label>
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
