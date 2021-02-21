import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    if (redirect) return <Redirect to={`/planets/display/${props.planet.id}`} />

    return (
        <div>
            <p>Write your comment here</p>
            <input type='text' onChange={(e) => {setNewComment(e.target.value)}} />
            <input type='submit' onClick={() => {
                if (newComment) {props.addComment(newComment, props.planet.id)}
                setRedirect(true)
            }} />
        </div>
    );
}

export default Comment;