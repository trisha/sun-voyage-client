import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// This component is no longe used and has been replaced/built-in to Planet.js.
const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateNewComment = (content) => {
        setNewComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />

    if(props.tokenExpiration() && !props.user){
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
    } else {
        return(
            <Link to={"/login"}/>
        )
    }
}

export default Comment;