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

export default Comment;