import React, {useState} from 'react';
import { Form, Col } from 'react-bootstrap'
import Login from './Login.js'
import Signup from './Signup.js'
//const REACT_APP_SERVER_URL =process.env.REACT_APP_SERVER_URL;

const FormPage = (props) => {

    const [formFlag, setFormFlag] = useState(props.flag)

    let currentPage

    if (formFlag) {
        currentPage = <Login {...props} nowCurrentUser={props.nowCurrentUser} setIsAuthenticated={props.setIsAuthenticated} user={props.currentUser}/>
    } else {
        currentPage = < Signup />
    }
    
    return (
        <div className="card card-body signup-page">
            <h2 className="py-2 title bold signup-title-div">
                <span className='signup'>Signup</span>
                <span className='login'>Login</span>
            </h2>

            {currentPage}
        </div>
    ) 
}

export default FormPage;
