import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios')

const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateNewComment = (content) => {
        setNewComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />

    return (
        <div className='app-main add-comment-page'>
            <p className='bold title add-comment-title'>Write your comment here</p>
            <textarea className='textbox-big box-shadow' onChange={(e) => {updateNewComment(e.target.value)}} />
            <input type='submit' className='text-submit bold box-shadow' onClick={() => {
                if (newComment) {props.addComment(newComment, props.planetId)}
                setRedirect(true)
            }} />
        </div>
    );
}

export default Comment;