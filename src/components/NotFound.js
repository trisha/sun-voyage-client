import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'

const NotFound = (props) => {
    
    return (
        <div className='app-main not-found'>
            <h1 className='title bold'>Houston, we have a problem</h1>

            <Link to='/planets' className='link-button not-found-button'>Take me back!</Link>
        </div>
    );
}

export default NotFound;