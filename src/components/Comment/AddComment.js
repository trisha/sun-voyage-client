import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const axios = require('axios')

const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateNewComment = (content) => {
        setNewComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />
    if(props.tokenExpiration() && !props.user){
        return (
            <div className='app-main'>
                <p>Write your comment here</p>
                <input type='comment' onChange={(e) => {updateNewComment(e.target.value)}} />
                <input type='submit' onClick={() => {
                    if (newComment) {props.addComment(newComment, props.planetId)}
                    setRedirect(true)
                }} />
            </div>
        );
    }
    else{
        return(
            <Link to={"/login"}/>
        )
    }
}

export default Comment;