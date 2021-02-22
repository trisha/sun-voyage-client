import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'

const Search = (props) => {

    return (
        <>
           <input type='text' onChange={(e) => {props.handleChange(e)}} />
           <input type='submit' onClick={(e) => {props.handleSubmit(e)}} />
        </>
    );
}

export default Search;