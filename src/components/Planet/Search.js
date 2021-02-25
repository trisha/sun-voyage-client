import React from 'react';
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